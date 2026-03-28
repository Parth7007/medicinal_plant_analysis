from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import predict, chat, health, remedy
import os


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_TITLE,
        version=settings.APP_VERSION,
    )

    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Ensure upload dir exists
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)

    # Register routers
    app.include_router(health.router, tags=["Health"])
    app.include_router(predict.router, prefix="/api", tags=["Prediction"])
    app.include_router(chat.router, prefix="/api", tags=["Chat"])
    app.include_router(remedy.router, prefix="/api", tags=["Remedy"])

    return app
