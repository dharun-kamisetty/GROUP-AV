# How to Run Arovia Health Desk

This guide explains how to set up and run the Arovia Health Desk project locally. The project consists of two parts:

1. **Backend** — Python FastAPI server (port 8000)
2. **Frontend** — React.js + Vite dev server (port 5173)

---

## Prerequisites

Make sure you have the following installed on your system:

| Tool       | Version   | Download                                      |
|------------|-----------|-----------------------------------------------|
| Python     | 3.11+     | https://www.python.org/downloads/             |
| Node.js    | 18+       | https://nodejs.org/                           |
| npm        | 9+        | Comes with Node.js                            |
| Git        | Latest    | https://git-scm.com/                          |

---

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd GROUP-AV
```

---

## Step 2: Set Up Environment Variables

1. Copy the example environment file:

```bash
cp env.example .env
```

2. Open `.env` and add your **Groq API key**:

```
GROQ_API_KEY=gsk_your_actual_groq_api_key_here
```

> You can get a free Groq API key at https://console.groq.com/

---

## Step 3: Set Up the Backend (Python)

### 3a. Create a virtual environment

```bash
python -m venv .venv
```

### 3b. Activate the virtual environment

**Windows (PowerShell):**
```powershell
.\.venv\Scripts\Activate.ps1
```

**Windows (CMD):**
```cmd
.\.venv\Scripts\activate.bat
```

**macOS / Linux:**
```bash
source .venv/bin/activate
```

### 3c. Install backend dependencies

```bash
pip install -r api/requirements.txt
```

> **Note:** This project uses PyTorch and OpenAI Whisper, which are large packages. The initial install may take several minutes.

---

## Step 4: Start the Backend Server

From the project root directory (with the virtual environment activated):

```bash
python run_api.py
```

You should see output like:

```
🏥 Starting Arovia Health Desk API...
📡 API will be available at: http://localhost:8000
📚 API Documentation: http://localhost:8000/docs
🔧 Alternative docs: http://localhost:8000/redoc
--------------------------------------------------
INFO:     Uvicorn running on http://0.0.0.0:8000
```

> **Keep this terminal running.** The backend must be active for the frontend to work.

### Verify the backend

Open your browser and visit:
- **Swagger Docs:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc
- **Health Check:** http://localhost:8000/health

---

## Step 5: Set Up the Frontend (React.js)

Open a **new terminal** and navigate to the frontend directory:

```bash
cd frontend
```

### 5a. Install frontend dependencies

```bash
npm install --legacy-peer-deps
```

> The `--legacy-peer-deps` flag is required to resolve a peer dependency conflict with `react-leaflet`.

---

## Step 6: Start the Frontend Dev Server

```bash
npm run dev
```

You should see output like:

```
  VITE v6.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://x.x.x.x:5173/
```

Open your browser and visit: **http://localhost:5173**

---

## Quick Start Summary

| Terminal   | Command                              | URL                      |
|------------|--------------------------------------|--------------------------|
| Terminal 1 | `python run_api.py`                  | http://localhost:8000     |
| Terminal 2 | `cd frontend && npm run dev`         | http://localhost:5173     |

---

## Project Structure

```
GROUP-AV/
├── api/                  # FastAPI backend
│   └── main.py           # API entry point & endpoints
├── agents/               # AI agent implementations
│   ├── groq_client.py    # Groq LLM client
│   └── triage_agent.py   # Main triage orchestrator
├── models/               # Pydantic data models
│   └── schemas.py        # Request/response schemas
├── utils/                # Utility modules
│   ├── whisper_client.py # Speech-to-text (Whisper)
│   ├── facility_matcher.py # Healthcare facility matching
│   └── report_generator.py # Report generation
├── frontend/             # React.js frontend (Vite)
│   ├── src/              # Source code
│   │   ├── app/          # Main app components
│   │   ├── components/   # Reusable components
│   │   └── utils/        # Frontend utilities
│   └── package.json      # Node.js dependencies
├── tests/                # Test suite
├── run_api.py            # Backend startup script
├── run_frontend.py       # Frontend startup script
├── requirements.txt      # Python dependencies
└── env.example           # Environment variable template
```

---

## Troubleshooting

### Backend won't start — `ModuleNotFoundError`
Make sure your virtual environment is activated and dependencies are installed:
```bash
.\.venv\Scripts\Activate.ps1    # Windows
pip install -r api/requirements.txt
```

### Frontend `npm install` fails with peer dependency errors
Use the `--legacy-peer-deps` flag:
```bash
npm install --legacy-peer-deps
```

### Whisper model loading is slow
The first run downloads the Whisper model (~500MB). Subsequent runs use the cached model and will be faster.

### CORS errors in the browser
Make sure the backend is running on port 8000 before starting the frontend.

### Port already in use
If port 8000 or 5173 is already in use, kill the existing process:
```powershell
# Windows — find and kill process on port 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

---

## API Endpoints

| Method | Endpoint            | Description                        |
|--------|---------------------|------------------------------------|
| GET    | `/health`           | Health check                       |
| POST   | `/triage`           | Submit symptoms for triage         |
| POST   | `/voice-triage`     | Voice-based triage (audio upload)  |
| POST   | `/facilities`       | Find nearby healthcare facilities  |
| GET    | `/docs`             | Swagger API documentation          |
| GET    | `/redoc`            | ReDoc API documentation            |
