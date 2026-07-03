from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from app.config.config import get_config
import os

config = get_config(os.getenv("FLASK_ENV", "development"))

DATABASE_URL = config.SQLALCHEMY_DATABASE_URI

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not configured.")

engine = create_engine(
    DATABASE_URL,
    echo=config.DEBUG,
)

SessionFactory = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
    expire_on_commit=False,
)


def get_db() -> Generator[Session, None, None]:
    db = SessionFactory()

    try:
        yield db
    finally:
        db.close()
