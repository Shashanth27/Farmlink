from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.database import engine
from app.database.models import Base
from app.routes.market import router as market_router

# Import Routes
from app.routes.auth import router as auth_router
from app.routes.advisory import router as advisory_router
from app.routes.admin import router as admin_router

app = FastAPI(
    title="FarmLink API",
    description="Backend API for FarmLink",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)

# CORS Configuration
# "null" covers Electron's file:// renderer origin (which browsers send as
# the literal string "null"), alongside the Vite dev-server ports.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5175",
        "null",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Home Route
@app.get("/")
def home():
    return {
        "message": "Welcome to MandiMitra Backend"
    }

# Health Check
@app.get("/health")
def health():
    return {
        "status": "Running"
    }

app.include_router(auth_router)
app.include_router(advisory_router)
app.include_router(market_router)
app.include_router(admin_router)