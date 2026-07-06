from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _


class Course(models.Model):
    LEVEL_CHOICES = (
        ("beginner", "Beginner"),
        ("intermediate", "Intermediate"),
        ("advanced", "Advanced"),
    )

    title = models.CharField(
        _("Course Title"),
        max_length=255
    )
    slug = models.SlugField(
        _("Slug"),
        max_length=255,
        unique=True
    )
    short_description = models.CharField(
        _("Short Description"),
        max_length=300,
        blank=True,
        null=True
    )
    description = models.TextField(
        _("Description"),
        blank=True,
        null=True
    )
    thumbnail = models.ImageField(
        _("Course Thumbnail"),
        upload_to="courses/thumbnails/",
        blank=True,
        null=True
    )
    teacher = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="courses"
    )
    level = models.CharField(
        _("Course Level"),
        max_length=20,
        choices=LEVEL_CHOICES,
        default="beginner"
    )
    price = models.DecimalField(
        _("Price"),
        max_digits=10,
        decimal_places=2,
        default=0
    )
    is_free = models.BooleanField(
        _("Is Free"),
        default=False
    )
    is_published = models.BooleanField(
        _("Is Published"),
        default=False
    )
    is_active = models.BooleanField(
        _("Is Active"),
        default=True
    )
    created_at = models.DateTimeField(
        _("Created At"),
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        _("Updated At"),
        auto_now=True
    )

    class Meta:
        verbose_name = _("Course")
        verbose_name_plural = _("Courses")
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class CourseModule(models.Model):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="modules"
    )
    title = models.CharField(
        _("Module Title"),
        max_length=255
    )
    description = models.TextField(
        _("Module Description"),
        blank=True,
        null=True
    )
    order = models.PositiveIntegerField(
        _("Module Order"),
        default=0
    )
    is_active = models.BooleanField(
        _("Is Active"),
        default=True
    )
    created_at = models.DateTimeField(
        _("Created At"),
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        _("Updated At"),
        auto_now=True
    )

    class Meta:
        verbose_name = _("Course Module")
        verbose_name_plural = _("Course Modules")
        ordering = ["course", "order", "id"]
        unique_together = ("course", "order")

    def __str__(self):
        return f"{self.course.title} - {self.title}"


class Lesson(models.Model):
    LESSON_TYPE_CHOICES = (
        ("video", "Video"),
        ("text", "Text"),
        ("video_text", "Video + Text"),
    )

    module = models.ForeignKey(
        CourseModule,
        on_delete=models.CASCADE,
        related_name="lessons"
    )
    title = models.CharField(
        _("Lesson Title"),
        max_length=255
    )
    lesson_type = models.CharField(
        _("Lesson Type"),
        max_length=20,
        choices=LESSON_TYPE_CHOICES,
        default="video_text"
    )
    video_file = models.FileField(
        _("Video File"),
        upload_to="courses/lessons/videos/",
        blank=True,
        null=True
    )
    video_url = models.URLField(
        _("Video URL"),
        blank=True,
        null=True
    )
    content = models.TextField(
        _("Lesson Text Content"),
        blank=True,
        null=True
    )
    duration = models.PositiveIntegerField(
        _("Duration in Minutes"),
        default=0
    )
    order = models.PositiveIntegerField(
        _("Lesson Order"),
        default=0
    )
    is_preview = models.BooleanField(
        _("Is Preview Lesson"),
        default=False
    )
    is_active = models.BooleanField(
        _("Is Active"),
        default=True
    )
    created_at = models.DateTimeField(
        _("Created At"),
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        _("Updated At"),
        auto_now=True
    )

    class Meta:
        verbose_name = _("Lesson")
        verbose_name_plural = _("Lessons")
        ordering = ["module", "order", "id"]
        unique_together = ("module", "order")

    def __str__(self):
        return f"{self.module.title} - {self.title}"
