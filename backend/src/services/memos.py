from typing import List, Optional, Tuple

from sqlmodel import Session, delete, select

from src.api.schemas import MemoCreate
from src.models.memo import Memo, MemoTag, Tag


def _normalize_tags(tags: List[str]) -> List[str]:
    cleaned = []
    for tag in tags:
        name = tag.strip().lower()
        if name and name not in cleaned:
            cleaned.append(name)
    return cleaned


def _resolve_tags(session: Session, tag_names: List[str]) -> List[Tag]:
    if not tag_names:
        return []
    existing = session.exec(select(Tag).where(Tag.name.in_(tag_names))).all()
    existing_by_name = {tag.name: tag for tag in existing}
    tags = []
    for name in tag_names:
        tag = existing_by_name.get(name)
        if not tag:
            tag = Tag(name=name)
            session.add(tag)
        tags.append(tag)
    return tags


def create_memo(session: Session, payload: MemoCreate, user_id: int) -> Memo:
    memo = Memo(content=payload.content, user_id=user_id)
    tag_names = _normalize_tags(payload.tags)
    memo.tags = _resolve_tags(session, tag_names)

    session.add(memo)
    session.commit()
    session.refresh(memo)
    return memo


def get_memo(session: Session, memo_id: int, user_id: int) -> Optional[Memo]:
    statement = select(Memo).where(Memo.id == memo_id, Memo.user_id == user_id)
    return session.exec(statement).first()


def update_memo(
    session: Session,
    memo: Memo,
    content: Optional[str],
    tags: Optional[List[str]],
) -> Memo:
    if content is not None:
        memo.content = content
    if tags is not None:
        tag_names = _normalize_tags(tags)
        memo.tags = _resolve_tags(session, tag_names)

    session.add(memo)
    session.commit()
    session.refresh(memo)
    return memo


def delete_memo(session: Session, memo: Memo) -> None:
    session.exec(delete(MemoTag).where(MemoTag.memo_id == memo.id))
    session.delete(memo)
    session.commit()


def list_memos(session: Session, user_id: int, tag: Optional[str] = None) -> Tuple[List[Memo], int]:
    query = select(Memo).where(Memo.user_id == user_id)
    if tag:
        query = (
            query.join(MemoTag)
            .join(Tag)
            .where(Tag.name == tag.strip().lower())
        )
    query = query.order_by(Memo.created_at.desc())
    items = session.exec(query).all()
    return items, len(items)
