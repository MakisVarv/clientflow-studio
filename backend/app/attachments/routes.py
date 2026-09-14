from flask import Blueprint
from flask import jsonify
from flask import request
from flask import send_file

from flask_jwt_extended import jwt_required

from app.common.permissions import require_permission
from app.database.session import get_db

from app.attachments.repository import AttachmentRepository
from app.attachments.service import AttachmentService


from app.attachments.schema import (
    attachment_schema,
    attachments_schema,
    create_attachment_schema,
    update_attachment_schema,
)

attachments_bp = Blueprint(
    "attachments",
    __name__,
    url_prefix="/attachments",
)


@attachments_bp.get("")
@jwt_required()
@require_permission("attachments.read")
def get_attachments():

    db = next(get_db())

    service = AttachmentService(AttachmentRepository(db))

    attachments = service.get_all()

    return jsonify(attachments_schema.dump(attachments))


@attachments_bp.get("/<uuid:attachment_id>")
@jwt_required()
@require_permission("attachments.read")
def get_attachment(attachment_id):

    db = next(get_db())

    service = AttachmentService(AttachmentRepository(db))

    attachment = service.get_by_id(attachment_id)

    return jsonify(attachment_schema.dump(attachment))


@attachments_bp.post("/upload")
@jwt_required()
@require_permission("attachments.create")
def upload_attachment():

    if "file" not in request.files:

        return jsonify({"message": "No file uploaded."}), 400

    file = request.files["file"]

    data = create_attachment_schema.load(request.form)

    db = next(get_db())

    service = AttachmentService(AttachmentRepository(db))

    attachment = service.upload(
        file,
        data,
    )

    return (
        jsonify(attachment_schema.dump(attachment)),
        201,
    )


@attachments_bp.get("/<uuid:attachment_id>/download")
@jwt_required()
@require_permission("attachments.read")
def download_attachment(attachment_id):

    db = next(get_db())

    service = AttachmentService(AttachmentRepository(db))

    attachment = service.get_by_id(attachment_id)

    return send_file(
        attachment.file_path,
        as_attachment=True,
        download_name=attachment.original_name,
        mimetype=attachment.mime_type,
    )


@attachments_bp.delete("/<uuid:attachment_id>")
@jwt_required()
@require_permission("attachments.delete")
def delete_attachment(attachment_id):

    db = next(get_db())

    service = AttachmentService(AttachmentRepository(db))

    service.delete_attachment(attachment_id)

    return jsonify({"message": "Attachment deleted successfully."})


@attachments_bp.get("/company/<uuid:company_id>")
@jwt_required()
@require_permission("attachments.read")
def company_attachments(company_id):

    db = next(get_db())

    service = AttachmentService(AttachmentRepository(db))

    attachments = service.get_company_attachments(company_id)

    return jsonify(attachments_schema.dump(attachments))


@attachments_bp.get("/contact/<uuid:contact_id>")
@jwt_required()
@require_permission("attachments.read")
def contact_attachments(contact_id):

    db = next(get_db())

    service = AttachmentService(AttachmentRepository(db))

    attachments = service.get_contact_attachments(contact_id)

    return jsonify(attachments_schema.dump(attachments))


@attachments_bp.get("/lead/<uuid:lead_id>")
@jwt_required()
@require_permission("attachments.read")
def lead_attachments(lead_id):

    db = next(get_db())

    service = AttachmentService(AttachmentRepository(db))

    attachments = service.get_lead_attachments(lead_id)

    return jsonify(attachments_schema.dump(attachments))


@attachments_bp.get("/search")
@jwt_required()
@require_permission("attachments.read")
def search_attachments():

    search = request.args.get(
        "q",
        "",
    )

    db = next(get_db())

    service = AttachmentService(AttachmentRepository(db))

    attachments = service.search(search)

    return jsonify(attachments_schema.dump(attachments))


@attachments_bp.get("/preview/<uuid:attachment_id>")
@jwt_required()
@require_permission("attachments.read")
def preview_attachment(attachment_id):

    db = next(get_db())

    service = AttachmentService(AttachmentRepository(db))

    attachment = service.preview_attachment(attachment_id)

    return send_file(
        attachment.file_path,
        mimetype=attachment.mime_type,
        as_attachment=False,
    )
