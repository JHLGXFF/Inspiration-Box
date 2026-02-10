import logging
from typing import Annotated, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session

from src.api.schemas import MemoCreate, MemoListResponse, MemoRead, MemoUpdate
from src.models.user import User
from src.services.auth import get_current_user
from src.services.db import get_session
from src.services.memos import (
    create_memo,
    delete_memo,
    get_memo,
    list_memos,
    update_memo,
)

logger = logging.getLogger(__name__)

router = APIRouter()


def _to_memo_read(memo) -> MemoRead:
    return MemoRead(
        id=memo.id,
        content=memo.content,
        tags=[tag.name for tag in memo.tags],
        created_at=memo.created_at,
    )


@router.get("", response_model=MemoListResponse)
def list_memos_endpoint(
    current_user: Annotated[User, Depends(get_current_user)],
    tag: Optional[str] = Query(default=None),
    session: Session = Depends(get_session),
) -> MemoListResponse:
    try:
        memos, total = list_memos(session, current_user.id, tag)
    except Exception as exc:
        logger.exception("Failed to load memos.")
        raise HTTPException(status_code=500, detail="Failed to load memos.") from exc
    items = [_to_memo_read(memo) for memo in memos]
    return MemoListResponse(items=items, total=total)


@router.post("", response_model=MemoRead, status_code=201)
def create_memo_endpoint(
    payload: MemoCreate,
    current_user: Annotated[User, Depends(get_current_user)],
    session: Session = Depends(get_session),
) -> MemoRead:
    content = payload.content.strip()
    if not content:
        raise HTTPException(status_code=400, detail="Content must not be empty.")
    for tag in payload.tags:
        tag_name = tag.strip()
        if tag_name and (len(tag_name) < 1 or len(tag_name) > 30):
            raise HTTPException(status_code=400, detail="Tag length must be 1-30.")
    try:
        memo = create_memo(session, MemoCreate(content=content, tags=payload.tags), current_user.id)
    except Exception as exc:
        logger.exception("Failed to create memo.")
        raise HTTPException(status_code=500, detail="Failed to create memo.") from exc
    return _to_memo_read(memo)


@router.put("/{memo_id}", response_model=MemoRead)
def update_memo_endpoint(
    memo_id: int,
    payload: MemoUpdate,
    current_user: Annotated[User, Depends(get_current_user)],
    session: Session = Depends(get_session),
) -> MemoRead:
    memo = get_memo(session, memo_id, current_user.id)
    if not memo:
        raise HTTPException(status_code=404, detail="Memo not found.")

    content = payload.content
    if content is not None:
        content = content.strip()
        if not content:
            raise HTTPException(status_code=400, detail="Content must not be empty.")

    if payload.tags is not None:
        for tag in payload.tags:
            tag_name = tag.strip()
            if tag_name and (len(tag_name) < 1 or len(tag_name) > 30):
                raise HTTPException(status_code=400, detail="Tag length must be 1-30.")

    try:
        memo = update_memo(session, memo, content, payload.tags)
    except Exception as exc:
        logger.exception("Failed to update memo.")
        raise HTTPException(status_code=500, detail="Failed to update memo.") from exc
    return _to_memo_read(memo)


@router.delete("/{memo_id}", status_code=204)
def delete_memo_endpoint(
    memo_id: int,
    current_user: Annotated[User, Depends(get_current_user)],
    session: Session = Depends(get_session),
) -> None:
    memo = get_memo(session, memo_id, current_user.id)
    if not memo:
        raise HTTPException(status_code=404, detail="Memo not found.")
    try:
        delete_memo(session, memo)
    except Exception as exc:
        logger.exception("Failed to delete memo.")
        raise HTTPException(status_code=500, detail="Failed to delete memo.") from exc
