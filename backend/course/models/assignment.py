# DJANGO IMPORTS
from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _

# LOCAL IMPORTS
from core.models import BaseModel


class Assignment(BaseModel):
    course = models.ForeignKey(
        "Course",
        on_delete=models.CASCADE,
        related_name="assignments"
    )
    module = models.ForeignKey(
        "CourseModule",
        on_delete=models.CASCADE,
        related_name="assignments",
        blank=True,
        null=True
    )
    lesson = models.ForeignKey(
        "Lesson",
        on_delete=models.CASCADE,
        related_name="assignments",
        blank=True,
        null=True
    )
    title = models.CharField(
        _("Assignment Title"),
        max_length=255
    )
    description = models.TextField(
        _("Description")
    )
    instruction_file = models.FileField(
        _("Instruction File"),
        upload_to="assignments/instructions/",
        blank=True,
        null=True
    )
    total_marks = models.PositiveIntegerField(
        _("Total Marks"),
        default=100
    )
    pass_marks = models.PositiveIntegerField(
        _("Pass Marks"),
        default=40
    )
    due_date = models.DateTimeField(
        _("Due Date"),
        blank=True,
        null=True
    )
    is_published = models.BooleanField(
        _("Is Published"),
        default=False
    )

    class Meta:
        verbose_name = _("Assignment")
        verbose_name_plural = _("Assignments")
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class AssignmentSubmission(BaseModel):
    STATUS_CHOICES = (
        ("submitted", "Submitted"),
        ("reviewed", "Reviewed"),
        ("passed", "Passed"),
        ("failed", "Failed"),
        ("late", "Late"),
    )

    assignment = models.ForeignKey(
        Assignment,
        on_delete=models.CASCADE,
        related_name="submissions"
    )
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="assignment_submissions"
    )
    answer_text = models.TextField(
        _("Answer Text"),
        blank=True,
        null=True
    )
    submission_file = models.FileField(
        _("Submission File"),
        upload_to="assignments/submissions/",
        blank=True,
        null=True
    )
    marks_obtained = models.PositiveIntegerField(
        _("Marks Obtained"),
        default=0
    )
    feedback = models.TextField(
        _("Teacher Feedback"),
        blank=True,
        null=True
    )
    status = models.CharField(
        _("Status"),
        max_length=20,
        choices=STATUS_CHOICES,
        default="submitted"
    )
    submitted_at = models.DateTimeField(
        _("Submitted At"),
        auto_now_add=True
    )
    reviewed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="reviewed_assignment_submissions",
        blank=True,
        null=True
    )
    reviewed_at = models.DateTimeField(
        _("Reviewed At"),
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = _("Assignment Submission")
        verbose_name_plural = _("Assignment Submissions")
        ordering = ["-submitted_at"]
        unique_together = ("assignment", "student")

    def __str__(self):
        return f"{self.student} - {self.assignment.title}"
