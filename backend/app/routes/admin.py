from fastapi import APIRouter
from app.services.market_service import sync_daily_prices, get_sync_status

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)


@router.post("/sync-prices")
def sync_prices():
    """
    Triggers a sync of today's mandi prices into the local database.
    Called from the Admin Dashboard's "Sync Today's Price" button.
    """
    return sync_daily_prices()


@router.get("/sync-status")
def sync_status():
    """
    Returns the timestamp of the last successful sync, how many
    records it added, and the total record count -- shown on the
    Admin Dashboard so the admin knows whether today's prices are
    already up to date.
    """
    return get_sync_status()