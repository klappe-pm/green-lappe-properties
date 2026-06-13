#!/bin/sh
# reconcile-tracking.sh — guarantee every durable file under the IA zones is
# git-tracked.
#
# Why this exists: a manual folder move (e.g. dragging folders in Finder) leaves
# files UNTRACKED — git sees the old path as deleted and the new path as a brand
# new, unstaged file. The IA pre-commit validator (evaluate-ia-change.mjs) only
# inspects *staged* files, so untracked files slip past it and the information
# architecture silently drifts from what is on disk. This script closes that gap.
#
# Modes:
#   --check   List untracked durable files. Exit 1 if any exist (used by the
#             pre-commit hook). Exit 0 when the working tree is fully tracked.
#   --fix     Stage every untracked durable file, one path at a time (never a
#             blanket `git add -A`, per GIT-STRATEGY.md). Review `git status`
#             and commit afterwards.
#
# Exclusions (kept in sync with .claude/evaluate-ia-change.mjs):
#   - anything matched by .gitignore (honored via --exclude-standard)
#   - any path containing a `_`-prefixed DIRECTORY segment (non-live:
#     _archive/, _recovered/, _superseded/, _inbox/ …)
#   - .DS_Store and ._* OS metadata
set -eu

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

mode="${1:---check}"

# Untracked files honoring .gitignore, minus non-live (_-prefixed dir segment)
# and OS junk. Trailing `|| true` keeps `set -e` happy when grep matches nothing.
untracked_durable() {
  git ls-files --others --exclude-standard -z \
    | tr '\0' '\n' \
    | grep -vE '(^|/)_[^/]*/' \
    | grep -vE '(^|/)\.DS_Store$' \
    | grep -vE '(^|/)\._' \
    || true
}

case "$mode" in
  --check)
    files="$(untracked_durable)"
    if [ -n "$files" ]; then
      n=$(printf '%s\n' "$files" | grep -c .)
      echo "✗ tracking drift: $n durable file(s) are untracked (likely a manual move):" >&2
      printf '%s\n' "$files" | sed 's/^/    /' >&2
      echo "" >&2
      echo "  Fix:  .claude/reconcile-tracking.sh --fix   (stages them per-path)" >&2
      echo "  Or route scratch into a _-prefixed folder (non-live, ignored by design)." >&2
      exit 1
    fi
    echo "✓ tracking: every durable file is git-tracked."
    ;;
  --fix)
    files="$(untracked_durable)"
    if [ -z "$files" ]; then
      echo "✓ nothing to reconcile; working tree already fully tracked."
      exit 0
    fi
    printf '%s\n' "$files" | while IFS= read -r f; do
      [ -n "$f" ] || continue
      git add -- "$f"
      echo "  staged: $f"
    done
    echo ""
    echo "Staged the files above per-path. Next:"
    echo "  git status                                  # review"
    echo "  node .claude/evaluate-ia-change.mjs --staged # validate placement"
    echo "  git commit                                   # land"
    ;;
  *)
    echo "usage: reconcile-tracking.sh [--check|--fix]" >&2
    exit 2
    ;;
esac
