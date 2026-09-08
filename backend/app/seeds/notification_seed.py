from random import choice
from random import randint

from sqlalchemy import select

from app.common.faker import fake

from app.notifications.model import (
    Notification,
    NotificationType,
)

from app.users.model import User


def seed_notifications(db):

    if db.scalar(select(Notification)):

        print("Notifications already seeded.")

        return

    users = db.scalars(select(User)).all()

    if not users:

        print("No users found.")

        return

    titles = [
        "New Lead Assigned",
        "Task Due Tomorrow",
        "Deal Won",
        "New Contact Created",
        "Meeting Reminder",
        "Company Updated",
        "Lead Converted",
        "Task Completed",
        "Welcome",
        "Profile Updated",
    ]

    messages = [
        "A new lead has been assigned to you.",
        "One of your tasks expires tomorrow.",
        "Congratulations! You closed a new deal.",
        "A new contact has been added.",
        "You have a meeting scheduled.",
        "Company information has been updated.",
        "A lead has been converted into a deal.",
        "A task has been marked as completed.",
        "Welcome to ClientFlow CRM.",
        "Your profile has been updated successfully.",
    ]

    notifications = []

    for _ in range(200):

        notification = Notification(
            user_id=choice(users).id,
            title=choice(titles),
            message=choice(messages),
            type=choice(list(NotificationType)),
            is_read=choice([True, False]),
        )

        notifications.append(notification)

    db.add_all(notifications)

    db.commit()

    print(f"{len(notifications)} Notifications created.")
