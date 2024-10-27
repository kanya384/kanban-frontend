include .env
export

.PHONY: help

help: ## Display this help screen
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

genapi: ## generates module from openapi spec api file is here https://git.g-n.ru/golang-amo/backend/-/raw/main/internal/delivery/swagger/docs/swagger.json
	@openapi-generator-cli generate -i ./src/repository/api/swagger.json -o ./src/repository/api/generated -g typescript-axios --additional-properties=supportsES6=true,npmVersion=6.9.0,typescriptThreePlus=true --skip-validate-spec
.PHONY: genapi

commit: ## testing infra
	@docker-compose -f deployments/docker-compose.yaml up -d && cd deployments && docker compose -f docker-compose.yaml push && cd ..
.PHONY: up

up: ## Display this help screen
	@docker-compose -f deployments/docker-compose.yaml up -d & disown
.PHONY: up