from app.common.base_repository import BaseRepository

from app.companies.model import Company
from sqlalchemy import select


class CompanyRepository(BaseRepository[Company]):

    def __init__(self, db):
        super().__init__(
            db=db,
            model=Company,
        )

    def exists_by_vat(
        self,
        vat_number: str,
    ) -> bool:

        stmt = select(Company).where(Company.vat_number == vat_number)

        return self.db.execute(stmt).scalar_one_or_none() is not None

    def exists_by_name(
        self,
        name: str,
    ) -> bool:

        stmt = select(Company).where(Company.name == name)

        return self.db.execute(stmt).scalar_one_or_none() is not None
