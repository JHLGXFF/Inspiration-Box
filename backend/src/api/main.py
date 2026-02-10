from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes import memos, auth
from src.services.db import init_db

app = FastAPI(title="Inspiration Box API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(memos.router, prefix="/memos", tags=["memos"])
app.include_router(auth.router, prefix="/auth", tags=["auth"])


@app.on_event("startup")
def on_startup() -> None:
    init_db()

# Trigger reload
