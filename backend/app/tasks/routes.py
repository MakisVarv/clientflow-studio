# type: ignore
from flask import Blueprint
from flask import jsonify
from flask import request

from flask_jwt_extended import jwt_required

from app.common.permissions import require_permission
from app.database.session import get_db

from app.tasks.repository import TaskRepository
from app.tasks.service import TaskService

from app.tasks.schema import (
    task_schema,
    tasks_schema,
    create_task_schema,
    update_task_schema,
)

task_bp = Blueprint(
    "tasks",
    __name__,
    url_prefix="/tasks",
)


@task_bp.get("")
@jwt_required()
@require_permission("task.read")
def get_tasks():

    page = request.args.get(
        "page",
        default=1,
        type=int,
    )

    size = request.args.get(
        "size",
        default=10,
        type=int,
    )

    search = request.args.get(
        "search",
        default=None,
        type=str,
    )

    db = next(get_db())

    service = TaskService(TaskRepository(db))

    if search:
        tasks = service.search(search)
    else:
        tasks = service.get_all()

    return jsonify(tasks_schema.dump(tasks))


@task_bp.get("/<uuid:task_id>")
@jwt_required()
@require_permission("task.read")
def get_task(task_id):

    db = next(get_db())

    service = TaskService(TaskRepository(db))

    task = service.get_by_id(task_id)

    return jsonify(task_schema.dump(task))


@task_bp.post("")
@jwt_required()
@require_permission("task.create")
def create_task():

    data = create_task_schema.load(request.get_json())

    db = next(get_db())

    service = TaskService(TaskRepository(db))

    task = service.create_task(data)

    return (
        jsonify(task_schema.dump(task)),
        201,
    )


@task_bp.put("/<uuid:task_id>")
@jwt_required()
@require_permission("task.update")
def update_task(task_id):

    data = update_task_schema.load(request.get_json())

    db = next(get_db())

    service = TaskService(TaskRepository(db))

    task = service.update_task(
        task_id,
        data,
    )

    return jsonify(task_schema.dump(task))


@task_bp.delete("/<uuid:task_id>")
@jwt_required()
@require_permission("task.delete")
def delete_task(task_id):

    db = next(get_db())

    service = TaskService(TaskRepository(db))

    service.delete_task(task_id)

    return (
        jsonify({"message": "Task deleted successfully."}),
        200,
    )


@task_bp.get("/company/<uuid:company_id>")
@jwt_required()
@require_permission("task.read")
def get_company_tasks(company_id):

    db = next(get_db())

    service = TaskService(TaskRepository(db))

    tasks = service.get_company_tasks(company_id)

    return jsonify(tasks_schema.dump(tasks))


@task_bp.get("/contact/<uuid:contact_id>")
@jwt_required()
@require_permission("task.read")
def get_contact_tasks(contact_id):

    db = next(get_db())

    service = TaskService(TaskRepository(db))

    tasks = service.get_contact_tasks(contact_id)

    return jsonify(tasks_schema.dump(tasks))


@task_bp.get("/lead/<uuid:lead_id>")
@jwt_required()
@require_permission("task.read")
def get_lead_tasks(lead_id):

    db = next(get_db())

    service = TaskService(TaskRepository(db))

    tasks = service.get_lead_tasks(lead_id)

    return jsonify(tasks_schema.dump(tasks))


@task_bp.get("/owner/<uuid:owner_id>")
@jwt_required()
@require_permission("task.read")
def get_owner_tasks(owner_id):

    db = next(get_db())

    service = TaskService(TaskRepository(db))

    tasks = service.get_owner_tasks(owner_id)

    return jsonify(tasks_schema.dump(tasks))


@task_bp.get("/assigned/<uuid:user_id>")
@jwt_required()
@require_permission("task.read")
def get_assigned_tasks(user_id):

    db = next(get_db())

    service = TaskService(TaskRepository(db))

    tasks = service.get_assigned_tasks(user_id)

    return jsonify(tasks_schema.dump(tasks))


@task_bp.get("/completed")
@jwt_required()
@require_permission("task.read")
def get_completed_tasks():

    db = next(get_db())

    service = TaskService(TaskRepository(db))

    tasks = service.get_completed()

    return jsonify(tasks_schema.dump(tasks))


@task_bp.get("/pending")
@jwt_required()
@require_permission("task.read")
def get_pending_tasks():

    db = next(get_db())

    service = TaskService(TaskRepository(db))

    tasks = service.get_pending()

    return jsonify(tasks_schema.dump(tasks))
