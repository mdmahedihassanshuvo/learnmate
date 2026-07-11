"""site_settings > models > widget.py"""

# DJANGO IMPORTS
from django.db import models
from django.contrib.auth.models import Group
from django.utils.translation import gettext_lazy as _

# MODEL IMPORTS
from .base_model import BaseModel
from .site_information import SiteConfig


class WidgetType(models.TextChoices):
    URL = "url", _("URL")
    TEMPLATE = "template", _("Template")
    HTML = "html", _("HTML")


class StatisticalDashboard (BaseModel):
    """This model represents Dashboard Widget"""
    site = models.ForeignKey(
        SiteConfig,
        on_delete=models.SET_NULL,
        related_name='statistical_dashboards',
        null=True,
        blank=True
    )
    title_en = models.CharField(
        _("Title English"),
        max_length=255,
        null=True,
        blank=True
    )
    title_bn = models.CharField(
        _("Title Bangla"),
        max_length=500,
        null=True,
        blank=True
    )
    div_id = models.CharField(
        max_length=55,
        null=True,
        blank=True,
        unique=True
    )
    div_class = models.CharField(
        max_length=255,
        null=True,
        blank=True
    )

    widget_type = models.CharField(
        max_length=20,
        choices=WidgetType.choices,
        default=WidgetType.URL,
    )

    system_url = models.CharField(
        max_length=255,
        null=True,
        blank=True,
    )
    template = models.CharField(
        max_length=255,
        null=True,
        blank=True,
        help_text="dashboard/widgets/project_summary.html"
    )
    html_code = models.TextField(
        _("HTML Code"),
        null=True,
        blank=True,
        help_text="Use only for controlled custom widgets."
    )
    additional_configuration = models.JSONField(
        _("Additional Configuration"),
        default=dict,
        blank=True,
        help_text="Store extra widget settings in JSON format."
    )
    groups = models.ManyToManyField(Group, blank=True)

    class Meta:
        verbose_name = _("Widget")
        verbose_name_plural = _("Widgets")

    def __str__(self):
        return self.title_en or self.title_bn or f"Widget #{self.pk}"

    def save(self, *args, **kwargs):
        if self.widget_type == WidgetType.TEMPLATE and not self.template:
            raise ValueError(
                "Template field must be filled for Template widget type."
            )
        elif self.widget_type == WidgetType.HTML and not self.html_code:
            raise ValueError(
                "HTML Code field must be filled for HTML widget type."
            )
        elif self.widget_type == WidgetType.URL and not self.system_url:
            raise ValueError(
                "System URL field must be filled for URL widget type."
            )

        super().save(*args, **kwargs)
