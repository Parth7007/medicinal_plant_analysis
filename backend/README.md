# AyurHelp Backend

FastAPI backend for medicinal plant identification using a CNN model and NVIDIA NIM AI.

## Folder Structure

```
backend/
├── main.py                    # Entry point
├── requirements.txt
├── .env.example               # Copy to .env and fill in keys
├── temp_uploads/              # Temporary image storage (auto-created)
└── app/
    ├── core/
    │   ├── config.py          # App settings & environment variables
    │   └── server.py          # FastAPI app factory (CORS, routers)
    ├── api/
    │   └── routes/
    │       ├── health.py      # GET / — health check
    │       ├── predict.py     # POST /api/predict/ — CNN plant prediction
    │       └── chat.py        # POST /api/chat/ — AI chatbot
    ├── models/
    │   └── schemas.py         # Pydantic request/response models
    └── services/
        ├── cnn_service.py     # CNN model loader & predict logic
        └── ai_service.py      # NVIDIA NIM API calls
```

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Place your trained model file at:
   ```
   app/services/model_avg_25.h5
   ```

3. Copy `.env.example` to `.env` and set your NIM API key:
   ```
   NIM_API_KEY=your_key_here
   ```

4. Run the server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Health check |
| POST | `/api/predict/` | Upload plant image → get label + info |
| POST | `/api/chat/` | Ask a question about the last predicted plant |
