# Research

## Decisions

### Backend stack
- Decision: FastAPI + SQLite
- Rationale: Matches the constitution, minimal setup, fast iteration for a small CRUD API.
- Alternatives considered: Flask + SQLite, Django + SQLite

### Frontend stack
- Decision: React SPA with Tailwind CSS
- Rationale: Matches the constitution and keeps UI implementation quick and consistent.
- Alternatives considered: Vue + Tailwind, server-rendered templates

### Data modeling for tags
- Decision: Separate Tag table with a memo_tags join table
- Rationale: Enables tag filtering and avoids parsing comma-delimited strings.
- Alternatives considered: Store tags as a single comma-delimited string

### API style
- Decision: REST endpoints returning JSON
- Rationale: Simple to consume from the SPA and aligns with FastAPI defaults.
- Alternatives considered: GraphQL
