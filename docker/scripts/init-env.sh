#!/bin/sh
set -euo pipefail

APP_ROOT=${APP_ROOT:-/workspace}
ENV_FILE="$APP_ROOT/.env"
ENV_EXAMPLE="$APP_ROOT/.env.example"

log() {
    printf '[env-setup] %s\n' "$1"
}

errexit() {
    log "$1"
    exit 1
}

[ -f "$ENV_EXAMPLE" ] || errexit ".env.example missing at $ENV_EXAMPLE"

if [ ! -f "$ENV_FILE" ]; then
    cp "$ENV_EXAMPLE" "$ENV_FILE"
    log "Copied .env.example to .env"
else
    log ".env already present; will ensure required values"
fi

escape_value() {
    printf '%s' "$1" | sed -e 's/[\\&|]/\\&/g'
}

set_env_var() {
    key="$1"
    value="$2"
    escaped_value=$(escape_value "$value")
    if grep -q "^${key}=" "$ENV_FILE"; then
        sed -i "s|^${key}=.*|${key}=${escaped_value}|" "$ENV_FILE"
    else
        printf '%s=%s\n' "$key" "$value" >> "$ENV_FILE"
    fi
}

set_env_var "DB_CONNECTION" "${DB_CONNECTION:-mysql}"
set_env_var "DB_HOST" "${DB_HOST:-mysql}"
set_env_var "DB_PORT" "${DB_PORT:-3306}"
set_env_var "DB_DATABASE" "${DB_DATABASE:-maharajiapp}"
set_env_var "DB_USERNAME" "${DB_USERNAME:-maharaji}"
set_env_var "DB_PASSWORD" "${DB_PASSWORD:-secret}"
set_env_var "REDIS_HOST" "${REDIS_HOST:-redis}"
set_env_var "REDIS_PORT" "${REDIS_PORT:-6379}"
set_env_var "CACHE_STORE" "${CACHE_STORE:-database}"
set_env_var "QUEUE_CONNECTION" "${QUEUE_CONNECTION:-database}"

current_key=""
if grep -q "^APP_KEY=" "$ENV_FILE"; then
    current_key=$(grep "^APP_KEY=" "$ENV_FILE" | tail -n 1 | cut -d '=' -f2-)
fi

if [ -n "${current_key}" ] && [ "${current_key}" != "null" ]; then
    log "APP_KEY already configured; skipping generation"
else
    if [ -n "${APP_KEY:-}" ] && [ "${APP_KEY}" != "null" ]; then
        new_key="$APP_KEY"
        log "Using APP_KEY provided via environment"
    else
        new_key="base64:$(php -r 'echo base64_encode(random_bytes(32));')"
        log "Generated new APP_KEY"
    fi
    set_env_var "APP_KEY" "$new_key"
fi

log "Environment file ready"
