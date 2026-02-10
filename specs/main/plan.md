# Implementation Plan: Inspiration Box

**Branch**: `main` | **Date**: 2026-01-06 | **Spec**: `specs/main/spec.md`
**Input**: Feature specification from `/specs/main/spec.md`

## Summary

Build a small SPA that lets users add inspiration memos (text or URL) with tags,
stores them with created_at timestamps, and renders cards in reverse
chronological order on the home page.

## Technical Context

**Language/Version**: Python 3.11 (backend), JavaScript (frontend)  
**Primary Dependencies**: FastAPI, React 18, Tailwind CSS  
**Storage**: SQLite  
**Testing**: pytest (backend), Vitest + React Testing Library (frontend)  
**Target Platform**: Local dev and single-node server  
**Project Type**: web (SPA + API)  
**Performance Goals**: <200ms API responses for typical list/create requests  
**Constraints**: keep MVP simple, no auth, no offline requirements  
**Scale/Scope**: single user, <10k memos

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Language: backend uses Python with FastAPI. PASS
- Frontend: React SPA. PASS
- Styling: Tailwind CSS. PASS
- Database: SQLite. PASS
- Architecture: keep simple. PASS

## Project Structure

### Documentation (this feature)

```text
specs/main/
|-- plan.md          # This file (/speckit.plan command output)
|-- research.md      # Phase 0 output (/speckit.plan command)
|-- data-model.md    # Phase 1 output (/speckit.plan command)
|-- quickstart.md    # Phase 1 output (/speckit.plan command)
|-- contracts/       # Phase 1 output (/speckit.plan command)
`-- tasks.md         # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
backend/
|-- src/
|   |-- api/
|   |-- models/
|   `-- services/
`-- tests/

frontend/
|-- src/
|   |-- components/
|   |-- pages/
|   `-- services/
`-- tests/
```

**Structure Decision**: Web application with a FastAPI backend and a React SPA
frontend to match the constitution and the create/list memo workflow.

## Complexity Tracking

None.
