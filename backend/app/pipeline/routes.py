from flask import Blueprint
from flask import jsonify
from flask import request

from flask_jwt_extended import jwt_required

from app.common.permissions import require_permission
from app.database.session import get_db

from app.pipeline.repository import PipelineRepository
from app.pipeline.service import PipelineService
from app.pipeline.schema import move_lead_schema

from app.leads.schema import leads_schema
from app.leads.schema import lead_schema

pipeline_bp = Blueprint(
    "pipeline",
    __name__,
    url_prefix="/pipeline",
)


@pipeline_bp.get("")
@jwt_required()
@require_permission("pipeline.read")
def get_pipeline():

    db = next(get_db())

    repository = PipelineRepository(db)

    service = PipelineService(repository)

    pipeline = service.get_pipeline()

    result = {}

    for status, leads in pipeline.items():

        result[status] = leads_schema.dump(leads)

    return jsonify(result)


@pipeline_bp.patch("/<uuid:lead_id>")
@jwt_required()
@require_permission("pipeline.update")
def move_lead(lead_id):

    data = move_lead_schema.load(request.get_json())

    db = next(get_db())

    repository = PipelineRepository(db)

    service = PipelineService(repository)

    lead = service.move_lead(
        lead_id,
        data["status"],
    )

    return jsonify(lead_schema.dump(lead))
