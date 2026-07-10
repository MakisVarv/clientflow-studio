from typing import Generic, TypeVar

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database.baseModel import BaseModel

ModelType = TypeVar("ModelType", bound=BaseModel)


class BaseRepository(Generic[ModelType]):
    """Generic CRUD repository."""

    def __init__(self, db: Session, model: type[ModelType]):
        self.db = db
        self.model = model

    def get_all(self):
        stmt = select(self.model)
        return self.db.execute(stmt).scalars().all()

    def add(self, entity: ModelType) -> ModelType:
        self.db.add(entity)
        self.db.commit()
        self.db.refresh(entity)
        return entity

    def get_by_id(self, entity_id):
        stmt = select(self.model).where(self.model.id == entity_id)
        return self.db.execute(stmt).scalar_one_or_none()

    def delete(self, entity: ModelType) -> None:
        self.db.delete(entity)
        self.db.commit()

    def update(self, entity: ModelType) -> ModelType:

        self.db.commit()

        self.db.refresh(entity)

        return entity
