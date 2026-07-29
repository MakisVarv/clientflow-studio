from flask_bcrypt import Bcrypt
from sqlalchemy import select

from app.users.model import User
from app.roles.model import Role

bcrypt = Bcrypt()


def seed_users(db):

    users = [
        {
            "first_name": "System",
            "last_name": "Administrator",
            "email": "admin@test.com",
            "password": "123456",
            "role": "Admin",
        },
        {
            "first_name": "John",
            "last_name": "Manager",
            "email": "manager@test.com",
            "password": "123456",
            "role": "Manager",
        },
        {
            "first_name": "Maria",
            "last_name": "Sales",
            "email": "sales@test.com",
            "password": "123456",
            "role": "Sales",
        },
        {
            "first_name": "Helen",
            "last_name": "Support",
            "email": "support@test.com",
            "password": "123456",
            "role": "Support",
        },
    ]

    for item in users:

        existing = db.scalar(select(User).where(User.email == item["email"]))

        if existing:
            continue

        role = db.scalar(select(Role).where(Role.name == item["role"]))

        if not role:
            print(f"Role {item['role']} not found.")
            continue

        user = User(
            first_name=item["first_name"],
            last_name=item["last_name"],
            email=item["email"],
            password_hash=bcrypt.generate_password_hash(item["password"]).decode(
                "utf-8"
            ),
            role_id=role.id,
            is_active=True,
            is_verified=True,
        )

        db.add(user)

    db.commit()

    print("Users seeded.")
