#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "..", "..", "..");
const outDir = path.resolve(repoRoot, "docs", "opportunities");

const includeExtensions = new Set([
  ".md",
  ".txt",
  ".csv",
  ".tsv",
  ".yaml",
  ".yml",
  ".json",
  ".geojson",
  ".README",
]);

const excludedParts = new Set([".git", ".obsidian", "node_modules", "outputs"]);

function rel(filePath) {
  return path.relative(repoRoot, filePath).split(path.sep).join("/");
}

function classify(relativePath) {
  if (relativePath.startsWith("docs/opportunities/")) return "opportunity-output";
  if (relativePath.startsWith("docs/research/metrics/pm-competitor-metrics/")) return "metric-definition";
  if (relativePath.endsWith(".csv") || relativePath.endsWith(".tsv") || relativePath.endsWith(".json") || relativePath.endsWith(".geojson") || relativePath.endsWith(".yaml")) return "data-table";
  if (relativePath.includes("/passoffs/") || relativePath.includes("/backlog/") || relativePath.startsWith("docs/meta/")) return "process-or-backlog";
  if (
    relativePath === "README.md" ||
    relativePath.includes("effort-6/final-report.md") ||
    relativePath.includes("Total Addressable Market") ||
    relativePath.includes("Non-Institutional Small Landlord PM Market") ||
    relativePath.includes("Launch Prioritization") ||
    relativePath.includes("Pitch Deck Prep")
  ) {
    return "primary-synthesis";
  }
  return "supporting-analysis";
}

function parseFrontmatter(text) {
  if (!text.startsWith("---\n")) return {};
  const end = text.indexOf("\n---", 4);
  if (end === -1) return {};
  const block = text.slice(4, end).split("\n");
  const result = {};
  for (const line of block) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (match) result[match[1]] = match[2].trim();
  }
  return result;
}

function extractHeadings(text) {
  return text
    .split("\n")
    .map((line, index) => ({ line, index: index + 1 }))
    .filter(({ line }) => /^#{1,4}\s+/.test(line))
    .map(({ line, index }) => {
      const match = line.match(/^(#{1,4})\s+(.*)$/);
      return { level: match[1].length, text: match[2].trim(), line: index };
    })
    .slice(0, 40);
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (excludedParts.has(entry.name)) continue;
    const absolute = path.join(dir, entry.name);
    const relative = rel(absolute);
    if (relative.startsWith("docs/opportunities/")) continue;
    if (entry.isDirectory()) {
      files.push(...await walk(absolute));
      continue;
    }
    if (!entry.isFile()) continue;
    const ext = entry.name.endsWith(".geojson.README") ? ".README" : path.extname(entry.name);
    if (!includeExtensions.has(ext)) continue;
    files.push(absolute);
  }
  return files;
}

function tsvEscape(value) {
  return String(value ?? "").replace(/\t/g, " ").replace(/\r?\n/g, " ");
}

async function main() {
  const files = (await walk(repoRoot)).sort((a, b) => rel(a).localeCompare(rel(b)));
  const entries = [];
  for (const file of files) {
    const text = await fs.readFile(file, "utf8");
    const relativePath = rel(file);
    const hash = crypto.createHash("sha256").update(text).digest("hex").slice(0, 16);
    const headings = extractHeadings(text);
    const frontmatter = parseFrontmatter(text);
    entries.push({
      repoRelativePath: relativePath,
      class: classify(relativePath),
      bytes: Buffer.byteLength(text),
      lineCount: text.split("\n").length,
      sha256_16: hash,
      frontmatter,
      title: headings.find((h) => h.level === 1)?.text || path.basename(file),
      headings,
    });
  }

  const generatedAt = new Date().toISOString();
  const model = { repoRoot, generatedAt, entryCount: entries.length, entries };
  await fs.writeFile(path.join(outDir, "corpus-index.json"), `${JSON.stringify(model, null, 2)}\n`, "utf8");

  const tsv = [
    "class\trepoRelativePath\tlineCount\tbytes\tsha256_16\ttitle",
    ...entries.map((entry) => [
      entry.class,
      entry.repoRelativePath,
      entry.lineCount,
      entry.bytes,
      entry.sha256_16,
      tsvEscape(entry.title),
    ].join("\t")),
  ].join("\n");
  await fs.writeFile(path.join(outDir, "corpus-manifest.tsv"), `${tsv}\n`, "utf8");

  const byClass = entries.reduce((acc, entry) => {
    acc[entry.class] = (acc[entry.class] || 0) + 1;
    return acc;
  }, {});
  const generatedDate = generatedAt.slice(0, 10);
  const md = [
    "---",
    "domain: green-lappe-properties",
    "category: opportunity-materials",
    "sub-category: corpus-index",
    "date-created: 2026-05-19",
    `date-revised: ${generatedDate}`,
    "doc-type: pointer-index",
    "version: 0.1",
    "doc-status: generated",
    "aliases: []",
    "tags: [corpus, index, generated]",
    "---",
    "",
    "# Corpus Pointer Index",
    "",
    `Generated: ${generatedAt}`,
    "",
    `Indexed files: ${entries.length}`,
    "",
    "## Counts by Class",
    "",
    "| Class | Files |",
    "|---|---:|",
    ...Object.keys(byClass).sort().map((key) => `| \`${key}\` | ${byClass[key]} |`),
    "",
    "## Primary Reading Path",
    "",
    "1. `README.md`",
    "2. `docs/research/reports/effort-6/final-report.md`",
    "3. `docs/research/unit-economics/Total Addressable Market (TAM).md`",
    "4. `docs/research/competitors/Non-Institutional Small Landlord PM Market, King and Snohomish Counties.md`",
    "5. `docs/gtm/Launch Prioritization.md`",
    "6. `docs/fund/Pitch Deck Prep v.1.md`",
    "7. `docs/design/PNW Property Management Pain Points - Three Personas, One Broken Middle.md`",
    "8. `docs/strategies/Family Child Care (FCC).md`",
    "",
    "## Full Manifest",
    "",
    "| Class | Path | Lines | Title |",
    "|---|---|---:|---|",
    ...entries.map((entry) => `| \`${entry.class}\` | \`${entry.repoRelativePath}\` | ${entry.lineCount} | ${tsvEscape(entry.title)} |`),
    "",
  ].join("\n");
  await fs.writeFile(path.join(outDir, "corpus-pointer-index.md"), md, "utf8");

  console.log(JSON.stringify({ generatedAt, files: entries.length, byClass }, null, 2));
}

main().catch((error) => {
  console.error(error.stack || error.message || String(error));
  process.exit(1);
});
