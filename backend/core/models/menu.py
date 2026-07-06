import logging

# DJANGO IMPORTS
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.contenttypes.fields import (
    GenericForeignKey, GenericRelation
)
from django.contrib.auth.models import Group
from django.contrib.contenttypes.models import ContentType
from django.urls import reverse, NoReverseMatch
from django.core.exceptions import ValidationError

# MODELS IMPORTS
from .base_model import BaseModel
from .site_information import SiteConfig

logger = logging.getLogger(__name__)


class DashboardLine(BaseModel):
    attribute = models.CharField(
        _('Attribute'), max_length=255
    )
    value = models.TextField(
        _("Value of attribute"),
    )
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    class Meta:
        indexes = [
            models.Index(fields=["content_type", "object_id"]),
        ]

    def __str__(self):
        return self.attribute


class Menu(BaseModel):
    code = models.CharField(
        _("Code"),
        max_length=100,
        null=True,
        blank=True
    )
    name_en = models.CharField(
        _("Name (English)"),
        max_length=100,
        null=True,
        blank=True
    )
    name_bn = models.CharField(
        _("Name (Bangla)"),
        max_length=100,
        null=True,
        blank=True
    )
    site = models.ForeignKey(
        SiteConfig,
        on_delete=models.SET_NULL,
        related_name='menus',
        null=True,
        blank=True
    )

    def __str__(self):
        return self.name_en or self.name_bn or "Unnamed Menu"


class MenuSection(models.Model):
    menu = models.ForeignKey(
        Menu,
        on_delete=models.SET_NULL,
        related_name='menu_sections',
        null=True,
        blank=True
    )
    order = models.PositiveIntegerField(
        default=1
    )
    name = models.CharField(
        _("Name"),
        max_length=100,
        null=True,
        blank=True
    )
    name_bn = models.CharField(
        _("Name (Bangla)"),
        max_length=100,
        null=True,
        blank=True
    )
    group = models.ManyToManyField(
        Group,
        blank=True,
        related_name='menu_sections',
        help_text='Groups to access this section'
    )
    is_active = models.BooleanField(
        default=True
    )

    def __str__(self):
        return str(self.name)


class Dashboard(BaseModel):
    """This model is considered as menu item"""
    menu = models.ForeignKey(
        Menu,
        on_delete=models.SET_NULL,
        related_name='dashboards',
        null=True,
        blank=True
    )
    section = models.ForeignKey(
        MenuSection,
        on_delete=models.SET_NULL,
        related_name='menu_items',
        null=True,
        blank=True
    )
    parent = models.ForeignKey(
        "self",
        on_delete=models.SET_NULL,
        related_name="sub_dashboards",
        null=True, blank=True
    )
    name = models.CharField(
        _('Name'),
        max_length=255
    )
    name_bn = models.CharField(
        _('Name (Bangla)'),
        max_length=255,
        blank=True,
        null=True
    )
    icon_class = models.CharField(
        max_length=55,
        default="fas fa-circle",
        null=True,
        blank=True,
        help_text="Font Awesome Icon Class. E.g.: fas fa-circle"
    )
    color = models.CharField(
        max_length=55,
        default="#0e424e"
    )

    # DEPRECATED: This field is deprecated,
    # use url_name instead for reverse URL resolution
    system_url = models.CharField(
        _('URL'),
        max_length=255,
        null=True,
        blank=True,
    )

    url_name = models.CharField(
        _('URL Name'),
        max_length=255,
        null=True,
        blank=True,
        help_text="E.g.: dashboard-entity-count"
    )
    query_params = models.CharField(
        max_length=255,
        blank=True,
        help_text="Example: all=true&status=active"
    )

    count_api_url = models.CharField(
        _('Count API URL'),
        max_length=255,
        null=True,
        blank=True,
        help_text="E.g.: /api/v1/dashboard/entity-count/?type=Ground Water"
    )
    lines = GenericRelation(DashboardLine)
    groups = models.ManyToManyField(Group, blank=True)

    class Meta:
        verbose_name = _('Menu Item')
        verbose_name_plural = _('Menu Items')

    def __str__(self):
        return self.name

    @property
    def get_sub_menu_items(self):
        childrens = self.sub_dashboards.select_related(
            'parent'
        ).prefetch_related('groups').all()
        return childrens

    @property
    def has_sub_menu_item(self):
        return self.sub_dashboards.exists()

    def clean(self):
        super().clean()

        if self.url_name:
            try:
                reverse(self.url_name)
            except NoReverseMatch:
                raise ValidationError({
                    "url_name": "Invalid URL name"
                })

        if not self.url_name and not self.system_url:
            raise ValidationError(
                "Either url_name or system_url must be provided."
            )

    def get_absolute_url(self):
        if self.url_name:
            base_url = reverse(self.url_name)

            if self.query_params:
                return f"{base_url}?{self.query_params}"

            return base_url

        if self.system_url:
            return self.system_url

        return "#"


class InlineJSCSS(BaseModel):
    title = models.TextField(
        _('Title'), max_length=255, unique=True
    )
    internal_css = models.TextField(
        _("Internal CSS on the header"),
        blank=True, null=True,
        help_text="E.g.: <style>.example{color:blue;font-size:18px;}</style>",
    )
    internal_js = models.TextField(
        _("Internal JS under the body"),
        blank=True, null=True,
        help_text="E.g.: <script>document.getElementById('demo').innerHTML = document.title;</script>", # noqa
    )

    def __str__(self):
        return self.title
