from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.models import user, course
from app.routers import auth, users

# Tabellen in der Datenbank erstellen
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Theken Academy API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://172.25.44.6:5173", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router einbinden
app.include_router(auth.router)
app.include_router(users.router)

@app.get("/api/health")
def health_check():
    return {"status": "ok"}
