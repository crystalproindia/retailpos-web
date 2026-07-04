.PHONY: bootstrap dev verify build lint typecheck format

bootstrap:
	npm install

dev:
	npm run dev

lint:
	npm run lint

typecheck:
	npm run typecheck

build:
	npm run build

verify: lint typecheck build
	@echo "✔ lint and production build passed"

format:
	npm run format
