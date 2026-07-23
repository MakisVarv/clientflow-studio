# type: ignore
from typing import Generic, TypeVar

from app.common.exceptions.not_found import NotFoundException
from app.common.base_repository import BaseRepository

ModelType = TypeVar("ModelType")


class BaseService(Generic[ModelType]):

    def __init__(
        self,
        repository: BaseRepository[ModelType],
        resource_name: str,
    ):
        self.repository = repository
        self.resource_name = resource_name

    def get_all(self):

        return self.repository.get_all()

    def get_by_id(self, entity_id):

        entity = self.repository.get_by_id(entity_id)

        if entity is None:
            raise NotFoundException(self.resource_name)

        return entity

    def delete(self, entity_id):

        entity = self.get_by_id(entity_id)

        self.repository.delete(entity)
