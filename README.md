# Inspiration Box

Small SPA for capturing inspiration memos with tags.

## Structure
- `backend/`: FastAPI API + SQLite
- `frontend/`: React SPA + Tailwind
- `specs/`: planning artifacts (spec, plan, tasks)

## Dev (planned)

Backend:
```bash
cd backend
python -m venv .venv
. .venv/bin/activate  # Windows PowerShell: .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn src.api.main:app --reload
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```

后端
选择解释器Inspiration-->进入backend
D:\miniAnaconda\Scripts\activate inspiration      uvicorn是环境里面的环境
uvicorn src.api.main:app --reload

前端
进入frontend
npm run dev