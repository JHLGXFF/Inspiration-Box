# Quickstart

This is a planning-time quickstart for the intended stack.

## Backend

```bash
cd backend
python -m venv .venv
. .venv/bin/activate  # Windows PowerShell: .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn src.api.main:app --reload
```

Notes:
- The backend creates SQLite tables on startup via SQLModel.
- Alembic config exists in `backend/alembic.ini` if you want migrations later.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Notes
- The backend serves a JSON API on http://localhost:8000.
- The frontend consumes the API and renders the memo cards.
