from unittest.mock import Mock

from app.users.service import UserService
from app.users.model import User


def test_duplicate_email():

    repository = Mock()

    repository.email_exists.return_value = True

    service = UserService(repository)

    try:

        service.register_user(
            first_name="Antonis",
            last_name="Test",
            email="test@test.com",
            password="123456",
        )

        assert False

    except ValueError:

        assert True


def test_register_user():

    repository = Mock()

    repository.email_exists.return_value = False

    repository.add.side_effect = lambda user: user

    service = UserService(repository)

    user = service.register_user(
        first_name="Antonis",
        last_name="Test",
        email="antonis@test.com",
        password="123456",
    )

    assert isinstance(user, User)

    assert user.email == "antonis@test.com"

    assert user.password_hash != "123456"
