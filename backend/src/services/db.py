from collections.abc import Generator
import os

from sqlalchemy import text
from sqlmodel import Session, SQLModel, create_engine

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./inspiration.db")

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)


def init_db() -> None:
    SQLModel.metadata.create_all(engine)
    _ensure_user_gender_column()


def _ensure_user_gender_column() -> None:
    # Keep existing SQLite databases compatible when new optional fields are added.
    if not DATABASE_URL.startswith("sqlite"):
        return
    with engine.begin() as conn:
        columns = conn.execute(text("PRAGMA table_info(user)")).fetchall()
        has_gender = any(col[1] == "gender" for col in columns)
        if not has_gender:
            conn.execute(text("ALTER TABLE user ADD COLUMN gender VARCHAR"))


def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session
