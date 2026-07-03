from typing import Generic, TypeVar

from sqlalchemy.orm import Session

ModelType = TypeVar("ModelType")


class BaseRepository(Generic[ModelType]):
    """Generic CRUD repository."""

    def __init__(self, db: Session, model: type[ModelType]):
        self.db = db
        self.model = model

    def add(self, entity: ModelType) -> ModelType:
        self.db.add(entity)
        self.db.commit()
        self.db.refresh(entity)
        return entity

    def get_by_id(self, entity_id):
        return self.db.get(self.model, entity_id)

    def delete(self, entity: ModelType) -> None:
        self.db.delete(entity)
        self.db.commit()
