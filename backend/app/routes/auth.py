from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register")
def register(user: dict):
    return {
        "success": True,
        "message": "Registration Successful",
        "user": user
    }


@router.post("/login")
def login(user: dict):
    return {
        "success": True,
        "message": "Login Successful",
        "user": {
            "name": "Farmer",
            "role": "Farmer"
        }
    }