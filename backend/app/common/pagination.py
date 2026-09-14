from math import ceil

from sqlalchemy.orm import Query


class Pagination:

    @staticmethod
    def paginate(
        *,
        query,
        count_query,
        db,
        page=1,
        size=20,
    ):

        page = max(page, 1)
        size = max(min(size, 100), 1)

        total = db.scalar(count_query)

        items = db.scalars(query.offset((page - 1) * size).limit(size)).all()

        total_pages = ceil(total / size) if total else 1

        return {
            "items": items,
            "pagination": {
                "page": page,
                "size": size,
                "total": total,
                "pages": total_pages,
                "has_next": page < total_pages,
                "has_previous": page > 1,
            },
        }
