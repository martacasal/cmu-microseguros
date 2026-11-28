# Next.js template

This is a Next.js template with shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```

## Local AI (Ollama)

The assistant (screens 11.2 and 13.2) and "Why this price" (06.3) can run on a **local** model through [Ollama](https://ollama.com). Nothing goes to the cloud: the server only talks to Ollama on this machine and refuses any non-loopback `OLLAMA_URL`.

1. Start Ollama and pull the default model:

   ```bash
   ollama serve
   ollama pull gemma4:e4b
   ```

2. Run the app (`npm run dev`) and open a screen under `/s/`. The **Local AI** picker in the top bar lists the models installed locally; pick one to use it.

Optional settings in `app/.env.local`:

| Variable | Default | What it does |
|---|---|---|
| `OLLAMA_MODEL` | `gemma4:e4b` | Model used when none is picked |
| `OLLAMA_URL` | `http://127.0.0.1:11434` | Must be `127.0.0.1`, `localhost` or `::1` |

If Ollama is off (or on the Vercel deploy), the picker shows "Ollama offline", 06.3 keeps the static design and the assistant offers "Talk to a person".

Code: `lib/ai/` (client, prompts, mock session terms), `app/api/ai/` (routes), `components/ai/` (chat hook, model picker).
