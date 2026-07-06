# DJANGO IMPORTS
from django.conf import settings
from django.db import models


class BaseModel(models.Model):
    """
    Abstract base model that provides common fields for all models.
    """
    is_active = models.BooleanField(
        default=True
    )
    is_draft = models.BooleanField(
        default=False
    )
    order = models.CharField(
        max_length=100, null=True, blank=True
    )
    created_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name='created_%(class)s_set'
    )
    updated_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name='updated_%(class)s_set'
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        abstract = True
