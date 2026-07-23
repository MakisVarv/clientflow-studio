from app.common.base_service import BaseService
from app.common.exceptions.bad_request import BadRequestException

from app.companies.model import Company
from app.companies.repository import CompanyRepository


class CompanyService(BaseService[Company]):

    def __init__(
        self,
        repository: CompanyRepository,
    ):

        super().__init__(
            repository=repository,
            resource_name="Company",
        )

    def create_company(
        self,
        name: str,
        vat_number: str | None,
        email: str | None,
        phone: str | None,
        website: str | None,
        industry: str | None,
        employees_count: int | None,
        country: str | None,
        city: str | None,
        address: str | None,
        postal_code: str | None,
        description: str | None,
    ) -> Company:

        if self.repository.exists_by_name(name):
            raise BadRequestException("Company already exists.")

        if vat_number and self.repository.exists_by_vat(vat_number):
            raise BadRequestException("VAT number already exists.")

        company = Company(
            name=name,
            vat_number=vat_number,
            email=email,
            phone=phone,
            website=website,
            industry=industry,
            employees_count=employees_count,
            country=country,
            city=city,
            address=address,
            postal_code=postal_code,
            description=description,
        )

        return self.repository.add(company)

    def update_company(
        self,
        company_id: int,
        name: str,
        vat_number: str | None,
        email: str | None,
        phone: str | None,
        website: str | None,
        industry: str | None,
        employees_count: int | None,
        country: str | None,
        city: str | None,
        address: str | None,
        postal_code: str | None,
        description: str | None,
        is_active: bool,
    ) -> Company:

        company = self.get_by_id(company_id)

        company.name = name
        company.vat_number = vat_number
        company.email = email
        company.phone = phone
        company.website = website
        company.industry = industry
        company.employees_count = employees_count
        company.country = country
        company.city = city
        company.address = address
        company.postal_code = postal_code
        company.description = description
        company.is_active = is_active
        return self.repository.update(company)

    def get_companies(self):
        return self.repository.get_all()
