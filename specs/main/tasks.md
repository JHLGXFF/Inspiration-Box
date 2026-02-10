# Tasks: Inspiration Box

**Input**: Design documents from `/specs/main/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Create project structure per plan in `backend/` and `frontend/`
- [ ] T002 Initialize backend dependencies in `backend/requirements.txt` (FastAPI, Uvicorn, SQLAlchemy/SQLModel, Alembic)
- [ ] T003 [P] Initialize frontend dependencies in `frontend/package.json` (React, Vite, Tailwind)
- [ ] T004 [P] Add base README or run instructions in `README.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T005 Create FastAPI app entrypoint in `backend/src/api/main.py`
- [ ] T006 Configure database connection and session setup in `backend/src/services/db.py`
- [ ] T007 Define SQL models for Memo, Tag, MemoTag in `backend/src/models/`
- [ ] T008 Create migration setup (Alembic) and initial schema
- [ ] T009 Configure frontend Tailwind setup in `frontend/tailwind.config.js` and `frontend/src/index.css`
- [ ] T010 Create API client helper in `frontend/src/services/api.ts`

**Checkpoint**: Foundation ready - user story implementation can begin

---

## Phase 3: User Story 1 - Create memo with tags (Priority: P1)

**Goal**: User can enter content and optional tags, submit, and persist a new memo.

- [ ] T011 [US1] Create memo create schema in `backend/src/api/schemas.py`
- [ ] T012 [US1] Implement create memo service in `backend/src/services/memos.py`
- [ ] T013 [US1] Implement POST /memos endpoint in `backend/src/api/routes/memos.py`
- [ ] T014 [US1] Build memo input form in `frontend/src/components/MemoForm.tsx`
- [ ] T015 [US1] Wire form submit to POST /memos via `frontend/src/services/api.ts`

**Checkpoint**: Memo creation works end-to-end

---

## Phase 4: User Story 2 - List memos in reverse chronological order (Priority: P1)

**Goal**: User sees all memos on the home page as cards, newest first.

- [ ] T016 [US2] Implement list memos service in `backend/src/services/memos.py`
- [ ] T017 [US2] Implement GET /memos endpoint in `backend/src/api/routes/memos.py`
- [ ] T018 [US2] Create memo card component in `frontend/src/components/MemoCard.tsx`
- [ ] T019 [US2] Create memo list view in `frontend/src/pages/Home.tsx`
- [ ] T020 [US2] Fetch memos on load and render in `frontend/src/pages/Home.tsx`

**Checkpoint**: Home page lists memos correctly

---

## Phase 5: User Story 3 - Tag display and filtering (Priority: P2)

**Goal**: Tags are visible and user can filter memos by tag.

- [ ] T021 [US3] Include tags in memo list response in `backend/src/api/routes/memos.py`
- [ ] T022 [US3] Add tag filter query handling in `backend/src/services/memos.py`
- [ ] T023 [US3] Add tag chips to `frontend/src/components/MemoCard.tsx`
- [ ] T024 [US3] Add tag filter UI in `frontend/src/components/TagFilter.tsx`
- [ ] T025 [US3] Wire tag filter to GET /memos?tag= in `frontend/src/pages/Home.tsx`

**Checkpoint**: Tag filter works end-to-end

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T026 Add basic error handling and empty states in `frontend/src/pages/Home.tsx`
- [ ] T027 Add API error responses and validation details in `backend/src/api/routes/memos.py`
- [ ] T028 Validate quickstart steps in `specs/main/quickstart.md`

---

## Dependencies & Execution Order

- Phase 1 must complete before Phase 2.
- Phase 2 blocks all user stories.
- US1 and US2 can proceed in parallel after Phase 2 if staffed.
- US3 depends on US2.
