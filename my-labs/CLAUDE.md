# my-labs: conventions for Claude

`my-labs/` holds the class build-lab work of every collaborator. Each person has their own folder, named after them, and only works inside it.

## Layout

```
my-labs/
├── CLAUDE.md          ← this file (shared, don't put personal notes here)
├── README.md          ← index of collaborators
├── .venv/             ← shared Python env (not committed)
├── .python-version    ← shared (3.13)
├── ellen/             ← one folder per collaborator
│   ├── README.md      ← their index of labs
│   └── 01-lab-exercise-1-ideate-on-a-rule/
│       └── micro-seguros/
└── <your-name>/
    ├── README.md
    └── NN-lab-<short-slug>/
        └── <project>/
```

## Rules

1. **Folder name** = the collaborator's first name, lowercase, no accents or spaces (`ellen`, `nelson`). If two people share a first name, add a surname initial (`nelson-d`).
2. **Lab folders** inside it: `NN-lab-<short-slug>` with a two-digit number in class order (`01-lab-exercise-1-ideate-on-a-rule`, `02-lab-...`). Keep the same lab name across collaborators so the same exercise lines up.
3. **Project folder** inside a lab: the project's slug (`micro-seguros`).
4. **Stay in your own folder.** When working for a collaborator, Claude reads and edits only `my-labs/<their-name>/`. Never change another person's folder unless they ask.
5. **Who am I working for?** Use the name the user gives. If they don't say, infer it from `git config user.name` (first name, lowercased) and confirm before creating a new folder.
6. **Personal notes for Claude** go in `my-labs/<your-name>/CLAUDE.md`, not this file.
7. **New lab**: create `my-labs/<your-name>/NN-lab-<slug>/<project>/` with a `README.md`, then add a line to `my-labs/<your-name>/README.md`.
8. **Running things**: use the shared env, `my-labs/.venv/bin/python`. Dev servers in `.claude/launch.json` need a unique `name` per person and project (e.g. `ellen-micro-seguros-ui`) and a distinct port.
9. **Commits**: prefix the message with `my-labs/<your-name>:`.

## Adding yourself

Ask Claude: *"Set me up in my-labs as <name>"*. It should create `my-labs/<name>/README.md` and add you to the list in `my-labs/README.md`.
