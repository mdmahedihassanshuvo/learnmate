"""Core > models > site_information.py"""
# PYTHON IMPORTS
import logging

from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import (
    MinValueValidator,
    MaxValueValidator
)

logger = logging.getLogger(__name__)

TAKA_UNITS = (
    ('unit-crore', 'Crore'),
    ('unit-lac', 'Lac'),
    ('unit-thousand', 'Thousand'),
    ('unit-hundred', 'Hundred'),
    ('unit-one', 'One')
)


class SiteConfig(models.Model):
    domain = models.CharField(
        _("domain"), max_length=255, null=True
    )
    project_urc = models.CharField(
        _('Project Urc'), max_length=255,
        blank=False, default="TPL-100"
    )
    name = models.CharField(
        _("Site Name"), max_length=255
    )
    short_name = models.CharField(
        _("Site Short Name"), max_length=255,
        null=True
    )
    title = models.CharField(
        _("Title"), max_length=255,
        null=True
    )
    footer = models.CharField(
        _("Footer"), max_length=255
    )
    customer = models.URLField(
        _("Customer site Url"), max_length=255
    )
    image = models.ImageField(
        upload_to='Running/logo/', null=True
    )
    favicon_icon = models.ImageField(
        upload_to='Running/icon/', null=True
    )
    main_color = models.CharField(
        _("Site Color"), max_length=25, blank=True,
        default="#fff"
    )
    is_active = models.BooleanField(default=False)
    title_size = models.CharField(
        _("Title Size"), max_length=25, null=True
    )
    logo_size = models.CharField(
        _("Logo Size"), max_length=25, null=True
    )
    send_notification = models.BooleanField(default=False)
    # exn_time_extension_limit percentage
    exn_time_extension_limit = models.PositiveIntegerField(default=20)
    token = models.CharField(max_length=6987, null=True, blank=True)
    show_carousel = models.BooleanField(default=False)
    is_central_software = models.BooleanField(default=False)
    is_statistics_display = models.BooleanField(default=False)
    is_use_nothi = models.BooleanField(default=False)
    is_card_menu = models.BooleanField(
        _("Card Type Menu"), default=False
    )
    is_breadcrum = models.BooleanField(
        _("Breadcrum Option"), default=False
    )
    is_navbar_menu = models.BooleanField(
        _("Navbar Option Menu"), default=False
    )
    banner_1 = models.ImageField(
        upload_to='Running/banner_1/', null=True, blank=True
    )
    banner_2 = models.ImageField(
        upload_to='Running/banner_2/', null=True, blank=True
    )
    hue_color = models.PositiveIntegerField(
        default=122,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(360),
        ],
        help_text="""Enter the hue color value in the range of 0-360.
            <span style='background: hsl(122, 39%, 49%); color: #fff; padding: 2px; border-radius: 2px;'>Green: 250</span>,
            <span style='background: hsl(250, 39%, 49%); color: #fff; padding: 2px; border-radius: 2px;'>Purple: 250</span>,
            <span style='background: hsl(230, 39%, 49%); color: #fff; padding: 2px; border-radius: 2px;'>Blue: 230</span>,
            <span style='background: hsl(340, 39%, 49%); color: #fff; padding: 2px; border-radius: 2px;'>Pink: 340</span>,
            <span style='background: hsl(30, 39%, 49%); color: #fff; padding: 2px; border-radius: 2px;'>Orange: 30</span>,
            <span style='background: hsl(60, 39%, 49%); color: #fff; padding: 2px; border-radius: 2px;'>Yellow: 60</span>,
            <span style='background: hsl(180, 39%, 49%); color: #fff; padding: 2px; border-radius: 2px;'>Cyan: 180</span> ]"""  # noqa:E501
    )
    background_color = models.CharField(
        _("Background Color of whole Software"),
        max_length=25, blank=True,
        default="#f0f0f0",
        help_text="""Enter the color Code.
            [<span style='background: hsl(0, 39%, 94%); color: #000; padding: 2px; border-radius: 2px;'>Gray: #f0f0f0</span>,
            <span style='background: hsl(250, 39%, 49%); color: #fff; padding: 2px; border-radius: 2px;'>Purple: #5c4cae</span>,
            <span style='background: hsl(230, 39%, 49%); color: #fff; padding: 2px; border-radius: 2px;'>Blue: #4c5cae</span>,
            <span style='background: hsl(340, 39%, 49%); color: #fff; padding: 2px; border-radius: 2px;'>Pink: #ae4c6d</span>,
            <span style='background: hsl(30, 39%, 49%); color: #fff; padding: 2px; border-radius: 2px;'>Orange: #ae7d4c</span>,
            <span style='background: hsl(60, 39%, 49%); color: #fff; padding: 2px; border-radius: 2px;'>Yellow: #aeae4c</span>,
            <span style='background: hsl(180, 39%, 49%); color: #fff; padding: 2px; border-radius: 2px;'>Cyan: #4caeae</span> ]"""  # noqa:E501
    )
    show_notice = models.BooleanField(
        default=True,
    )
    bangla_division_district_show = models.BooleanField(
        _("Show Bangla District,Division,Upazila"),
        default=False
    )
    show_search_bar = models.BooleanField(
        _("Show Search On Navbar"), default=False,
        help_text="Show New Searchbar Nothification and New Profile Name",
    )
    default_taka_unit = models.CharField(
        max_length=20,
        choices=TAKA_UNITS,
        default='unit-lac',
        help_text="Example: কোটি: unit-crore, লক্ষ: unit-lac, হাজার: unit-thousand, শত: unit-hundred, একক: unit-one",  # noqa:E501
        null=True,
        blank=True
    )
    # allocation office switch
    is_office_on = models.BooleanField(default=False)
    is_office_required = models.BooleanField(default=False)
    version_memo_text = models.CharField(
        _("Version Number or Memo Text"), max_length=100, null=True, blank=True
    )
    is_correction_amount_on = models.BooleanField(default=False)
    is_aquawatch = models.BooleanField(default=False)
    # ======= for enlistment software =======
    ce_email = models.EmailField(  # enlistment chief engineer
        _("CE Email"), max_length=100, null=True, blank=True,
        default="ce@dphe.gov.bd"
    )
    site_language = models.BooleanField(
        default=False,
        help_text="It will help to change the site's language(False = English / True = Bengali)"  # noqa
    )
    user_manual = models.FileField(
        upload_to='user_manuals/',
        help_text="Upload the user manual file.",
        blank=True, null=True
    )
    notice = models.FileField(
        upload_to='notice/',
        help_text="Upload DPHE notice.",
        blank=True, null=True
    )
    guidance = models.FileField(
        upload_to='guidance/',
        help_text="Upload DPHE guidance Document.",
        blank=True, null=True
    )
    visitor_count = models.PositiveIntegerField(
        default=0,
        help_text="Total visitor count will be stored here."
    )
    # ========== for enlistment software end =========

    additional_config = models.JSONField(
        default=dict,
        blank=True,
        help_text="Store any additional configuration \
            in key-value pair(JSON) format."
    )

    class Meta:
        db_table = 'Core_site'  # Keep the original table name to preserve data
        verbose_name = 'Site Configuration'
        verbose_name_plural = 'Site Configurations'

    def __str__(self):
        return f"{self.name}"

    def save(self, *args, **kwargs):
        SiteConfig.objects.filter(
            domain=self.domain,
            is_active=True
        ).exclude(pk=self.pk).update(is_active=False)
        super(SiteConfig, self).save(*args, **kwargs)
