#!/bin/bash
# PostToolUse hook: lint the file Claude just edited, if it's TS/JS inside app/.
# Exit 2 sends the lint errors back to Claude so it fixes them itself.
set -u
root="${CLAUDE_PROJECT_DIR:-$(pwd)}"
file=$(node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{try{const j=JSON.parse(d);process.stdout.write((j.tool_input&&(j.tool_input.file_path||j.tool_input.path))||"")}catch{}})')
case "$file" in
  "$root"/app/*.ts|"$root"/app/*.tsx|"$root"/app/*.js|"$root"/app/*.jsx|"$root"/app/*.mjs) ;;
  *) exit 0 ;;
esac
case "$file" in */node_modules/*|*/.next/*) exit 0 ;; esac
[ -f "$file" ] || exit 0
out=$(cd "$root/app" && npx --no-install eslint --no-warn-ignored "$file" 2>&1)
if [ $? -ne 0 ]; then
  echo "ESLint found problems in ${file#$root/} — fix them:" >&2
  echo "$out" >&2
  exit 2
fi
exit 0
