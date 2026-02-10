from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class MemoCreate(BaseModel):
    content: str = Field(min_length=1)
    tags: List[str] = []


class MemoUpdate(BaseModel):
    content: Optional[str] = None
    tags: Optional[List[str]] = None


class MemoRead(BaseModel):
    id: int
    content: str
    tags: List[str]
    created_at: datetime


class MemoListResponse(BaseModel):
    items: List[MemoRead]
    total: int
