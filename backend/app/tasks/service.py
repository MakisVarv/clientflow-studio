# type: ignore
from app.tasks.model import Task
from app.tasks.repository import TaskRepository


class TaskService:

    def __init__(self, repository: TaskRepository):

        self.repository = repository

    def get_all(self):

        return self.repository.get_all()

    def get_by_id(self, task_id):

        task = self.repository.get_by_id(task_id)

        if task is None:
            raise ValueError("Task not found.")

        return task

    def create_task(self, data):

        task = Task(**data)

        return self.repository.create(task)

    def update_task(
        self,
        task_id,
        data,
    ):

        task = self.get_by_id(task_id)

        for key, value in data.items():

            setattr(task, key, value)

        return self.repository.update(task)

    def delete_task(self, task_id):

        task = self.get_by_id(task_id)

        self.repository.delete(task)

    def get_company_tasks(
        self,
        company_id,
    ):

        return self.repository.get_company_tasks(company_id)

    def get_contact_tasks(
        self,
        contact_id,
    ):

        return self.repository.get_contact_tasks(contact_id)

    def get_lead_tasks(
        self,
        lead_id,
    ):

        return self.repository.get_lead_tasks(lead_id)

    def get_deal_tasks(
        self,
        deal_id,
    ):

        return self.repository.get_deal_tasks(deal_id)

    def get_owner_tasks(
        self,
        owner_id,
    ):

        return self.repository.get_owner_tasks(owner_id)

    def get_assigned_tasks(
        self,
        assigned_to_id,
    ):

        return self.repository.get_assigned_tasks(assigned_to_id)

    def get_by_status(
        self,
        status,
    ):

        return self.repository.get_by_status(status)

    def get_by_priority(
        self,
        priority,
    ):

        return self.repository.get_by_priority(priority)

    def get_completed(self):

        return self.repository.get_completed()

    def get_pending(self):

        return self.repository.get_pending()

    def search(
        self,
        search,
    ):

        return self.repository.search(search)
