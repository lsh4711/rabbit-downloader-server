load_env() {
  set -a && source .env && set +a
}

is_running() {
  local service=${1}
  docker-compose ps -q "${service}" > /dev/null 2>&1
  return ${?}
}

deploy() {
  local on=${1}
  local off=${2}
  docker compose up -d --wait "${on}"
  reload_nginx "${on}"
  sleep 3s
  docker compose down "${off}"
}

reload_nginx() {
  local host=${1}
  docker compose up nginx --detach --wait --no-recreate
  SERVER_HOST=${host} \
  docker compose exec nginx ./docker-entrypoint.d/20-envsubst-on-templates.sh && nginx -s reload
}

run() {
  load_env
  docker compose pull nginx server

  if is_running server1; then
    deploy server2 server1
  else
    deploy server1 server2
  fi
}

run
