from datetime import datetime
from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel


class MemoTag(SQLModel, table=True):
    memo_id: Optional[int] = Field(default=None, foreign_key="memo.id", primary_key=True)
    tag_id: Optional[int] = Field(default=None, foreign_key="tag.id", primary_key=True)


class Memo(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    content: str
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)

    tags: List["Tag"] = Relationship(back_populates="memos", link_model=MemoTag)


class Tag(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True, unique=True)

    memos: List["Memo"] = Relationship(back_populates="tags", link_model=MemoTag)
