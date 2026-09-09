.PHONY: build deploy check-env

build:
	@export NVM_DIR="$$HOME/.nvm"; \
	if [ -s "$$NVM_DIR/nvm.sh" ]; then \
		. "$$NVM_DIR/nvm.sh"; \
	else \
		echo "nvm is not installed or NVM_DIR is not configured"; \
		exit 1; \
	fi; \
	nvm install; \
	nvm use; \
	npm run build

check-env:
	@if [ ! -f .env ]; then \
		echo "Missing .env file. Add SILHH_PATH to .env"; \
		exit 1; \
	fi
	@source .env && \
	if [ -z "$$SILHH_PATH" ]; then \
		echo "Missing SILHH_PATH in .env"; \
		exit 1; \
	fi

deploy: build check-env
	@source .env && \
	echo "Deploying to $$SILHH_PATH" && \
	mkdir -p "$$SILHH_PATH/public/assets" && \
	rm -f "$$SILHH_PATH"/public/assets/index-* && \
	mv dist/assets/* "$$SILHH_PATH"/public/assets/ && \
	mv dist/index.html "$$SILHH_PATH"/resources/views/candidate/form.blade.php
