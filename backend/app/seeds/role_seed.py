from sqlalchemy import select

from app.roles.model import Role

DEFAULT_ROLES = [
    {
        "name": "Admin",
        "description": "System Administrator",
    },
    {
        "name": "Manager",
        "description": "Manager",
    },
    {
        "name": "User",
        "description": "Standard User",
    },
]


def seed_roles(db):

    for role_data in DEFAULT_ROLES:

        existing = db.scalar(select(Role).where(Role.name == role_data["name"]))

        if existing:
            print(f'{role_data["name"]} already exists')
            continue

        print(f'Adding {role_data["name"]}')

        db.add(
            Role(
                name=role_data["name"],
                description=role_data["description"],
            )
        )

    db.commit()

    print("Roles seeded successfully.")
