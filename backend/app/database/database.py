from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from app.paths import seed_if_missing, user_data_dir

DATABASE_PATH = seed_if_missing(user_data_dir() / "mandimitra.db", "mandimitra.db")
DATABASE_URL = f"sqlite:///{DATABASE_PATH.as_posix()}"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()