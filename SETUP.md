# Running FarmSafe locally

This runs three things on your own machine: the backend API, the
frontend, and (optionally) Ollama for AI advisories. Nothing needs to
be hosted — this is enough to demo the app in a screen-share.

You need **Python 3.10+** and **Node.js 18+** installed first.

## 1. Get the code

```bash
git clone https://github.com/Shashanth27/farmsafe.git
cd farmsafe
```

## 2. Start the backend (Terminal 1)

```bash
cd backend
python3 -m venv venv

# macOS / Linux
source venv/bin/activate
# Windows (PowerShell)
venv\Scripts\Activate.ps1

pip install -r requirements.txt
uvicorn app.main:app --port 8000
```

Leave this terminal running. Check it worked by opening
http://localhost:8000/health in a browser — it should show
`{"status":"Running"}`.

## 3. Start the frontend (Terminal 2, new tab/window)

```bash
cd frontend
npm install
npm run dev
```

Open the URL it prints — normally **http://localhost:5173**. That's
the app. Login/Register accept any email + password (there's no real
auth yet — it's a demo stub).

## 4. AI advisories (optional but recommended for the demo)

The "Get AI Advisory" button calls a local AI model (Gemma) through
[Ollama](https://ollama.com). Without it, everything else in the app
still works (prices, weather, crop info) — only the advisory text will
show a message saying Ollama isn't running.

To enable it:

1. Install Ollama from **https://ollama.com** (Windows/macOS/Linux
   installers available).
2. Pull the model:
   ```bash
   ollama pull gemma3
   ```
3. Make sure Ollama is running (it starts automatically after install,
   or run `ollama serve`). It listens on `localhost:11434` — the
   backend talks to it automatically, no config needed.
4. Restart the backend (Terminal 1: Ctrl+C, then re-run the `uvicorn`
   command).

## Everyday use after the first setup

You don't need to repeat `pip install` / `npm install` every time.
Just:

```bash
# Terminal 1
cd backend && source venv/bin/activate && uvicorn app.main:app --port 8000

# Terminal 2
cd frontend && npm run dev
```

## Troubleshooting

- **"address already in use" on port 8000 or 5173** — something else
  is already running there. Close it, or change the port (backend:
  `--port 8001`; frontend: edit `frontend/vite.config.js` or pass
  `npm run dev -- --port 5174`, and update
  `frontend/src/services/api.js`'s `baseURL` to match if you change
  the backend port).
- **Advisory says "Ollama is not running"** — see step 4 above. Run
  `ollama list` to confirm `gemma3` was pulled successfully.
- **Blank page / network errors in the browser console** — make sure
  the backend (Terminal 1) is still running; the frontend needs it.
