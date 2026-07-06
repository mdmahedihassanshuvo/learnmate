# DJANGO IMPORTS
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = models.CharField(
        max_length=150, unique=True
    )
    email = models.EmailField(
        unique=True
    )
    phone = models.CharField(
        max_length=20, null=True, blank=True
    )
    password = models.CharField(
        max_length=128
    )
    is_staff = models.BooleanField(
        default=False
    )

    def __str__(self):
        return self.email if self.email else self.phone if self.phone else self.username
