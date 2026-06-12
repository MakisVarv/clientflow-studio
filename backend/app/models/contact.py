from datetime import datetime, timezone

from app.extensions import db


def utc_now():
    return datetime.now(timezone.utc)


class Contact(db.Model):
    __tablename__ = "contacts"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(120), nullable=False)
    company = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    status = db.Column(db.String(30), nullable=False, default="lead")

    created_at = db.Column(db.DateTime(timezone=True), default=utc_now)
    updated_at = db.Column(
        db.DateTime(timezone=True),
        default=utc_now,
        onupdate=utc_now,
    )


def to_dict(self):
    return {
        "id": self.id,
        "name": self.name,
        "company": self.company,
        "email": self.email,
        "status": self.status,
        "createdAt": self.created_at.isoformat() if self.created_at else None,
        "updatedAt": self.updated_at.isoformat() if self.updated_at else None,
    }
