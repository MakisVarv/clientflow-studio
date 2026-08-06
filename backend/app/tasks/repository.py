from sqlalchemy import or_
from sqlalchemy import select

from app.common.base_repository import BaseRepository
from app.tasks.model import Task
from app.tasks.model import TaskPriority
from app.tasks.model import TaskStatus


class TaskRepository(BaseRepository):

    def __init__(self, db):
        super().__init__(db, Task)

    def get_company_tasks(self, company_id):

        stmt = select(Task).where(Task.company_id == company_id)

        return self.db.scalars(stmt).all()

    def get_contact_tasks(self, contact_id):

        stmt = select(Task).where(Task.contact_id == contact_id)

        return self.db.scalars(stmt).all()

    def get_lead_tasks(self, lead_id):

        stmt = select(Task).where(Task.lead_id == lead_id)

        return self.db.scalars(stmt).all()

    def get_deal_tasks(self, deal_id):

        stmt = select(Task).where(Task.deal_id == deal_id)

        return self.db.scalars(stmt).all()

    def get_owner_tasks(self, owner_id):

        stmt = select(Task).where(Task.owner_id == owner_id)

        return self.db.scalars(stmt).all()

    def get_assigned_tasks(self, assigned_to_id):

        stmt = select(Task).where(Task.assigned_to_id == assigned_to_id)

        return self.db.scalars(stmt).all()

    def get_by_status(self, status: TaskStatus):

        stmt = select(Task).where(Task.status == status)

        return self.db.scalars(stmt).all()

    def get_by_priority(self, priority: TaskPriority):

        stmt = select(Task).where(Task.priority == priority)

        return self.db.scalars(stmt).all()

    def get_completed(self):

        stmt = select(Task).where(Task.completed == True)

        return self.db.scalars(stmt).all()

    def get_pending(self):

        stmt = select(Task).where(Task.completed == False)

        return self.db.scalars(stmt).all()

    def search(self, search):

        stmt = select(Task).where(
            or_(
                Task.title.ilike(f"%{search}%"),
                Task.description.ilike(f"%{search}%"),
            )
        )

        return self.db.scalars(stmt).all()
