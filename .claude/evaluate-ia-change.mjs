#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);

function usage() {
  console.error(`Usage:
  node .claude/evaluate-ia-change.mjs --staged
  node .claude/evaluate-ia-change.mjs --range base..head
  node .claude/evaluate-ia-change.mjs --base base --head head`);
}

function git(args, options = {}) {
  return execFileSync("git", args, {
    cwd: repoRoot,
    encoding: options.encoding || "utf8",
    stdio: options.stdio || ["ignore", "pipe", "pipe"],
  });
}

const repoRoot = execFileSync("git", ["rev-parse", "--show-toplevel"], {
  encoding: "utf8",
}).trim();

let mode = "staged";
let diffArgs = ["diff", "--cached", "--name-status", "-z"];

if (args.includes("--help") || args.includes("-h")) {
  usage();
  process.exit(0);
}

const rangeIndex = args.indexOf("--range");
const baseIndex = args.indexOf("--base");
const headIndex = args.indexOf("--head");

if (rangeIndex !== -1) {
  const range = args[rangeIndex + 1];
  if (!range) {
    usage();
    process.exit(2);
  }
  mode = "range";
  diffArgs = ["diff", "--name-status", "-z", range];
} else if (baseIndex !== -1 || headIndex !== -1) {
  const base = args[baseIndex + 1];
  const head = args[headIndex + 1];
  if (!base || !head) {
    usage();
    process.exit(2);
  }
  mode = "range";
  diffArgs = ["diff", "--name-status", "-z", base, head];
} else if (args.length > 0 && !args.includes("--staged")) {
  usage();
  process.exit(2);
}

const allowedRootEntries = new Set([
  "README.md",
  "AGENTS.md",
  "CLAUDE.md",
  "WARP.md",
  "GEMINI.md",
  ".claude",
  ".githooks",
  ".gitignore",
  "docs",
]);
const allowedDocsZones = new Set([
  "_archive",
  "backlog",
  "branding",
  "financial",
  "gtm",
  "launch",
  "marketing",
  "passoffs",
  "roadmap",
  "status",
  "strategies",
  "uxd",
  "uxr",
]);

const requiredFrontmatterKeys = [
  "domain",
  "category",
  "sub-category",
  "date-created",
  "date-revised",
  "aliases",
  "tags",
];

const markdownExtensions = new Set([".md", ".markdown"]);
const sensitivePathPattern =
  /(credential|credentials|secret|secrets|recovery-code|recovery-codes|payment|payments|receipt|receipts|registrant-data|counsel-memo|counsel-memos|license-document|license-documents|sensitive-screenshot|sensitive-screenshots)/i;

function parseNameStatus(raw) {
  const parts = raw.split("\0").filter(Boolean);
  const entries = [];

  for (let index = 0; index < parts.length; index += 1) {
    const status = parts[index];
    const code = status[0];

    if (code === "R" || code === "C") {
      const oldPath = parts[index + 1];
      const newPath = parts[index + 2];
      entries.push({ status, code, oldPath, path: newPath });
      index += 2;
    } else {
      const changedPath = parts[index + 1];
      entries.push({ status, code, path: changedPath });
      index += 1;
    }
  }

  return entries;
}

function isMarkdown(filePath) {
  return markdownExtensions.has(path.extname(filePath).toLowerCase());
}

function isAddedLike(entry) {
  return entry.code === "A" || entry.code === "C" || entry.code === "R";
}

function isLegacyRelocatedCorpus(normalized) {
  return normalized.startsWith("docs/uxr/") || normalized.startsWith("docs/strategies/market/");
}

function isNonLivePath(normalized) {
  const segments = normalized.split("/");
  return segments.slice(0, -1).some((segment) => segment.startsWith("_"));
}

function hasNonLiveReference(content) {
  return /(?:\]\(|`)(?:\.\/)?docs\/_[^`)]+/.test(content);
}

function readChangedFile(filePath) {
  if (mode === "staged") {
    try {
      return git(["show", `:${filePath}`]);
    } catch {
      return "";
    }
  }

  const absolutePath = path.join(repoRoot, filePath);
  if (!existsSync(absolutePath)) {
    return "";
  }
  return readFileSync(absolutePath, "utf8");
}

function parseFrontmatter(content) {
  if (!content.startsWith("---\n")) {
    return null;
  }

  const end = content.indexOf("\n---", 4);
  if (end === -1) {
    return null;
  }

  const body = content.slice(4, end);
  const data = new Map();

  for (const line of body.split("\n")) {
    const match = line.match(/^([A-Za-z0-9_-]+):(?:\s*(.*))?$/);
    if (match) {
      data.set(match[1], match[2] ?? "");
    }
  }

  return data;
}

function headingOrder(content, headings) {
  let cursor = -1;
  for (const heading of headings) {
    const index = content.indexOf(`\n# ${heading}`, cursor + 1);
    const startIndex = content.startsWith(`# ${heading}`) ? 0 : index;
    if (startIndex === -1 || startIndex < cursor) {
      return false;
    }
    cursor = startIndex;
  }
  return true;
}

function changedPathsSet(entries) {
  return new Set(entries.filter((entry) => entry.code !== "D").map((entry) => entry.path));
}

const rawDiff = git(diffArgs);
const entries = parseNameStatus(rawDiff);
const changedPaths = changedPathsSet(entries);
const failures = [];
const ignoredNonLivePaths = [];

function fail(filePath, message) {
  failures.push(`${filePath}: ${message}`);
}

for (const entry of entries) {
  const filePath = entry.path;
  const normalized = filePath.split(path.sep).join("/");

  if (entry.code === "D") {
    continue;
  }

  if (normalized.includes(".DS_Store")) {
    fail(normalized, "OS metadata files must not be committed.");
  }

  if (sensitivePathPattern.test(normalized)) {
    fail(normalized, "sensitive launch/legal/payment evidence belongs outside the repository.");
  }

  const segments = normalized.split("/");
  const rootEntry = segments[0];

  if (!allowedRootEntries.has(rootEntry) && !allowedRootEntries.has(normalized)) {
    fail(normalized, `top-level path '${rootEntry}' is not an allowed IA zone.`);
    continue;
  }

  if (rootEntry === "docs") {
    const zone = segments[1];
    if (!zone) {
      fail(normalized, "files must not be added directly to docs/.");
      continue;
    }

    if (!allowedDocsZones.has(zone)) {
      fail(normalized, `docs zone '${zone}' is not canonical; update IA and README.md first.`);
    }

    if (segments.length === 2 && normalized !== "docs/README.md") {
      fail(normalized, "durable docs files must live inside a canonical docs subfolder.");
    }
  }

  if (isNonLivePath(normalized)) {
    ignoredNonLivePaths.push(normalized);
    continue;
  }

  if (!isMarkdown(normalized)) {
    continue;
  }

  const basename = path.basename(normalized);
  const content = readChangedFile(normalized);
  const fm = parseFrontmatter(content);

  if (
    !normalized.startsWith(".claude/") &&
    !normalized.startsWith("docs/passoffs/") &&
    hasNonLiveReference(content)
  ) {
    fail(normalized, "live documents must not depend on files inside docs/_* non-live folders.");
  }

  if (normalized.startsWith("docs/passoffs/")) {
    if (!/^\d{4}-\d{2}-\d{2}-\d{4}-passoff-file\.md$/.test(basename)) {
      fail(normalized, "passoff filename must be yyyy-MM-dd-HHmm-passoff-file.md.");
    }

    const requiredSections = [
      "Summary",
      "Files changed",
      "Key decisions",
      "Risks and open questions",
      "Lessons learned",
      "State",
      "Next actions",
      "Do not do",
    ];
    if (!headingOrder(content, requiredSections)) {
      fail(normalized, "passoff sections are missing or out of required order.");
    }
    continue;
  }

  if (normalized.startsWith("docs/_archive/")) {
    continue;
  }

  if (normalized.startsWith("docs/uxd/design-system/docs/")) {
    if (basename !== "README.md" && !/^\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(basename)) {
      fail(normalized, "design-system spec filenames must be NN-kebab-slug.md.");
    }

    if (basename !== "README.md") {
      const expectedH1 = `# ${basename.replace(/\.md$/, "")}`;
      if (!content.includes(`${expectedH1}\n`)) {
        fail(normalized, `design-system spec H1 must match '${expectedH1}'.`);
      }

      if (!fm) {
        fail(normalized, "design-system specs require YAML frontmatter.");
      } else {
        if (fm.get("domain") !== "brand") {
          fail(normalized, "design-system specs must declare 'domain: brand'.");
        }
        if (fm.get("category") !== "design-system") {
          fail(normalized, "design-system specs must declare 'category: design-system'.");
        }
        if (fm.get("version") !== "3.0.0") {
          fail(normalized, "design-system specs must declare 'version: 3.0.0'.");
        }
      }
    }

    if (isAddedLike(entry) && basename !== "00-index.md") {
      if (!changedPaths.has("docs/uxd/design-system/docs/00-index.md")) {
        fail(normalized, "adding a design-system spec requires updating docs/uxd/design-system/docs/00-index.md.");
      }
      if (!changedPaths.has("docs/uxd/design-system/docs/96-numbering-convention.md")) {
        fail(
          normalized,
          "adding a design-system spec requires updating docs/uxd/design-system/docs/96-numbering-convention.md.",
        );
      }
    }
    continue;
  }

  if (
    isAddedLike(entry) &&
    normalized.startsWith("docs/") &&
    basename !== "README.md" &&
    !isLegacyRelocatedCorpus(normalized)
  ) {
    const allowedName =
      /^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(basename) ||
      /^\d{4}-\d{2}-\d{2}(?:-\d{4})?-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(basename);

    if (!allowedName) {
      fail(normalized, "new Markdown filenames must be lowercase kebab-case, optionally prefixed by date/time.");
    }
  }

  if (normalized.startsWith("docs/status/") && isAddedLike(entry) && basename !== "README.md") {
    if (!/^\d{4}-\d{2}-\d{2}(?:-\d{4})?-status-(?:report|update)\.md$/.test(basename)) {
      fail(normalized, "status files must be yyyy-MM-dd-status-report.md or yyyy-MM-dd-HHmm-status-update.md.");
    }
  }

  if (normalized.startsWith("docs/launch/") && isAddedLike(entry) && basename !== "README.md") {
    if (!/^\d{4}-\d{2}-\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(basename)) {
      fail(normalized, "launch Markdown files must use yyyy-MM-dd-kebab-slug.md.");
    }

    if (!changedPaths.has("docs/launch/README.md")) {
      fail(normalized, "adding a launch Markdown file requires updating docs/launch/README.md.");
    }
  }

  const frontmatterRequired =
    normalized.startsWith("docs/") &&
    !normalized.startsWith("docs/uxd/design-system/") &&
    !normalized.startsWith("docs/passoffs/") &&
    !normalized.startsWith("docs/_archive/") &&
    !isLegacyRelocatedCorpus(normalized) &&
    basename !== "README.md";

  if (frontmatterRequired) {
    if (!fm) {
      fail(normalized, "Markdown documents in docs/ require YAML frontmatter.");
    } else {
      for (const key of requiredFrontmatterKeys) {
        if (!fm.has(key)) {
          fail(normalized, `frontmatter is missing '${key}'.`);
        }
      }

      for (const key of ["date-created", "date-revised"]) {
        const value = fm.get(key);
        if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
          fail(normalized, `frontmatter '${key}' must use yyyy-MM-dd.`);
        }
      }
    }
  }
}

if (entries.length === 0) {
  console.log("IA evaluation: no changed files to evaluate.");
  process.exit(0);
}

if (failures.length > 0) {
  console.error("IA evaluation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

if (ignoredNonLivePaths.length > 0) {
  console.log("IA evaluation ignored non-live changed paths:");
  for (const filePath of ignoredNonLivePaths) {
    console.log(`- ${filePath}`);
  }
}

console.log(`IA evaluation passed for ${entries.length} changed file(s).`);
