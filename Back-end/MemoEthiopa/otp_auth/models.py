from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import random

class OTP(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    otp_code = models.CharField(max_length=6)  # 6-digit OTP
    created_at = models.DateTimeField(default=timezone.now)  # Store OTP creation time

    @staticmethod
    def generate_otp():
        """Generate a random 6-digit OTP code."""
        otp = ''.join([str(random.randint(0, 9)) for _ in range(6)])
        return otp

    def __str__(self):
        return f"{self.user.email} - {self.otp_code} - {self.created_at}"
