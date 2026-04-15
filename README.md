start backend
'uvicorn app.main:app --reload --port 8000'

start postgres server
docker compose -f docker-compose.dev.yml up -d

go into postgres server
docker exec -it theken-academy-db-1 psql -U courseuser -d theken_academy

