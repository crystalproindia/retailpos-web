.PHONY: bootstrap dev verify build lint format

bootstrap:
	npm install

dev:
	npm run dev

lint:
	npm run lint

build:
	npm run build

verify: lint build
	@echo "✔ lint and production build passed"

format:
	npm run format
