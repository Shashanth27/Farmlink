from fastapi import APIRouter, Query
from app.services.market_service import get_market_data, get_market_history

router = APIRouter(
    prefix="/market",
    tags=["Market"]
)


@router.get("/")
def market(
    state: str,
    district: str,
    market: str,
    crop: str
):
    return get_market_data(
        state,
        district,
        market,
        crop
    )
        


@router.get("/history")
def market_history(
    state: str,
    district: str,
    market: str,
    crop: str,
    limit: int = Query(default=30, le=90),
):
    """
    Max/modal/min price history for the farmer's selected state,
    district and crop -- powers the "Market Maximum Price vs Date"
    graph on the farmer dashboard.
    """
    return get_market_history(state, district, market, crop, limit)