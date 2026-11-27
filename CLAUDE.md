# cmu-microseguros

PULSE (Pulso): on-demand accident insurance for outdoor sport. Group repo for the CMU course.

| Folder | What it is |
|---|---|
| `app/` | The PULSE prototype: Next.js + shadcn, Ink & Coral design system, all Figma screens at `/s/<id>`. See `app/CLAUDE.md`. |
| `Proto-personas/` | User research site: personas, journeys, pain points. Deployed to GitHub Pages by `.github/workflows/deploy.yml`. |
| `Vault/` | Obsidian vault for the design process (specs, skills, handoff). See `Vault/CLAUDE.md`. |
| `my-labs/` | Class build labs, one folder per collaborator. See `my-labs/CLAUDE.md`. |

## Guardrails (in `.claude/settings.json`, shared with everyone)
- Reading `.env` files and `rm -rf` are blocked.
- After every edit to a TS/JS file in `app/`, ESLint runs on that file and its errors come back to Claude to fix.
- Before saying done on anything in `app/`, run `npm run check` in `app/` and show the output.
