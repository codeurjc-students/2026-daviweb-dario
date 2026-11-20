# Development commands. Run `make help` to list them.
.PHONY: help db db-stop backend frontend test-backend test-frontend test-integration openapi

help:
	@grep -E '^[a-z-]+:.*##' $(MAKEFILE_LIST) | sed 's/:.*## /\t/'

db: ## Start PostgreSQL in the background and wait until it is healthy
	docker compose -f docker/docker-compose-local.yml up -d --wait

db-stop: ## Stop PostgreSQL (data is kept in the volume)
	docker compose -f docker/docker-compose-local.yml down

backend: db ## Start the database, then the Spring Boot backend on :8080
	cd backend && ./mvnw spring-boot:run

frontend: ## Start the Angular dev server on :4200 (proxies /api to :8080)
	cd frontend && npx ng serve

test-backend: ## Run all backend tests (needs Docker for Testcontainers)
	cd backend && ./mvnw test

test-frontend: ## Run the frontend unit tests (no backend needed)
	cd frontend && npm run test:unit

test-integration: ## Run the frontend integration tests (backend must be running)
	cd frontend && npm run test:integration

openapi: ## Regenerate docs/api from the running backend
	curl -s localhost:8080/v3/api-docs.yaml -o docs/api/api-docs.yaml
	npx --yes @redocly/cli@2 build-docs docs/api/api-docs.yaml -o docs/api/api-docs.html
