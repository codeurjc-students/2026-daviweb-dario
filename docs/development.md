# Development guide

How to run, test and document DaviWeb on your machine. All commands run from the repository root unless a `cd` is shown. Run `make help` for the list of shortcuts.

## Prerequisites

| Tool | Version used | Needed for |
|---|---|---|
| Java (JDK) | 21 | backend |
| Node.js and npm | 22 and 10.9 | frontend |
| Docker | recent | PostgreSQL, and Testcontainers in the backend tests |
| make | any | the shortcuts in the `Makefile` (optional) |

## Architecture at a glance

Three independent programs run during development:

```
Browser ──► Angular dev server ──► Spring Boot ──► PostgreSQL
           (port 4200)            (port 8080)      (port 5432)
```

- The Angular dev server forwards every request starting with `/api` to Spring (`frontend/proxy.conf.json`), so the browser only talks to one origin and no CORS configuration is needed.
- The backend is layered: controller → service → repository (`backend/src/main/java/es/urjc/code/daviweb/`).
- On first startup, the backend loads sample services if the table is empty.

## Run the application

Start the three programs in this order:

| Step | Command | Equivalent without make |
|---|---|---|
| 1. Database | `make db` | `docker compose -f docker/docker-compose-local.yml up -d --wait` |
| 2. Backend | `make backend` (starts the database first) | `cd backend && ./mvnw spring-boot:run` |
| 3. Frontend | `make frontend` | `cd frontend && npx ng serve` |

Then open <http://localhost:4200>. The page lists the sample services. The API is also available at <http://localhost:8080/api/v1/services> and its interactive documentation at <http://localhost:8080/swagger-ui.html>.

The backend and the frontend keep running in their terminal until you press Ctrl+C. The database runs in the background; stop it with `make db-stop` (its data is kept in a Docker volume).

### Configuration

The backend reads its database settings from environment variables and falls back to local defaults, so no configuration is needed for development. To override them, copy `docker/.env.example` to `docker/.env`. Never commit the `.env` file.

## Run the tests

| Command | What it runs | Needs |
|---|---|---|
| `make test-backend` | unit tests (Mockito), integration tests and system tests (Testcontainers, Rest Assured) | Docker running |
| `make test-frontend` | unit tests (Vitest) with a fake API client | nothing else |
| `make test-integration` | frontend integration tests against the real API | database and backend running |

What each kind of test proves:

- **Unit:** one class works alone, with its dependencies replaced by fakes.
- **Integration:** several layers work together against a real PostgreSQL started by Testcontainers (backend), or the API client works against the real backend (frontend).
- **System:** the running application answers correctly over HTTP (`backend/src/test/java/es/urjc/code/daviweb/system/`).

Frontend integration specs end in `.integration.spec.ts`. They expect the sample data, so run them against a database that was loaded by the backend's startup.

## Regenerate the API documentation

The OpenAPI specification in `docs/api/` is a snapshot generated from the code. Regenerate it whenever the API changes:

1. Start the database and the backend (`make backend`).
2. In another terminal, run `make openapi`.
3. Commit both changed files in `docs/api/` together with the code change.

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| `Port 8080 already in use` | An old backend is running. Find it with `lsof -nP -iTCP:8080 -sTCP:LISTEN` and stop it. |
| Backend cannot connect to the database | PostgreSQL is not healthy yet. Check `docker ps`, or use `make db`, which waits for it. |
| The page shows "Loading services..." forever | The backend is down, or `ng serve` was started before the proxy file was changed. Check the Network tab and restart `ng serve`. |
| `npm install` fails with `Cannot read properties of null (reading 'edgesOut')` | Use `npm install --legacy-peer-deps` in `frontend/`. |
| Backend tests fail to start a container | Docker is not running. |
