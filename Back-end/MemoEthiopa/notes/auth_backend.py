from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import User



class EmailAuthBackend(ModelBackend):
    """Authenticate using email instead of username."""

    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = User.objects.get(email=username)  # Use email for login
            if user.check_password(password):  # Verify password
                return user
        except User.DoesNotExist:
            return None
