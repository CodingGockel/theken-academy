from fastapi import FastAPI
from app.database import Base, engine
from app.models import user, course
from app.routers import auth

# Tabellen in der Datenbank erstellen
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Theken Academy API")

# Router einbinden
app.include_router(auth.router)

@app.get("/api/health")
def health_check():
    return {"status": "ok"}
