# DJANGO IMPORTS
from django.conf import settings
from django.db import models

# LOCAL IMPORTS
from .base_model import BaseModel


class Profile(BaseModel):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='profile'
    )
    name = models.CharField(
        max_length=150
    )
    date_of_birth = models.DateField(
        null=True, blank=True
    )
    fathers_name = models.CharField(
        max_length=150, null=True, blank=True
    )
    mothers_name = models.CharField(
        max_length=150, null=True, blank=True
    )
    nid_no = models.CharField(
        max_length=20, null=True, blank=True
    )
    blood_group = models.CharField(
        max_length=3, null=True, blank=True
    )
    region = models.CharField(
        max_length=100, null=True, blank=True
    )
    nationality = models.CharField(
        max_length=100, null=True, blank=True
    )

    def __str__(self):
        return self.name
