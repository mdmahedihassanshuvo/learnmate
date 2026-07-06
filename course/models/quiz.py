# DJANGO IMPORTS
from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _

# LOCAL IMPORTS
from core.models import BaseModel


class Quiz(BaseModel):
    course = models.ForeignKey(
        "Course",
        on_delete=models.CASCADE,
        related_name="quizzes"
    )
    module = models.ForeignKey(
        "CourseModule",
        on_delete=models.CASCADE,
        related_name="quizzes",
        blank=True,
        null=True
    )
    lesson = models.ForeignKey(
        "Lesson",
        on_delete=models.CASCADE,
        related_name="quizzes",
        blank=True,
        null=True
    )
    title = models.CharField(
        _("Quiz Title"),
        max_length=255
    )
    description = models.TextField(
        _("Description"),
        blank=True,
        null=True
    )
    total_marks = models.PositiveIntegerField(
        _("Total Marks"),
        default=0
    )
    pass_marks = models.PositiveIntegerField(
        _("Pass Marks"),
        default=0
    )
    time_limit = models.PositiveIntegerField(
        _("Time Limit in Minutes"),
        default=0,
        help_text=_("Use 0 for no time limit")
    )
    is_ai_generated = models.BooleanField(
        _("Is AI Generated"),
        default=False
    )
    is_published = models.BooleanField(
        _("Is Published"),
        default=False
    )

    class Meta:
        verbose_name = _("Quiz")
        verbose_name_plural = _("Quizzes")
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class QuizQuestion(BaseModel):
    QUESTION_TYPE_CHOICES = (
        ("mcq", "MCQ"),
        ("true_false", "True/False"),
        ("short_answer", "Short Answer"),
    )

    quiz = models.ForeignKey(
        Quiz,
        on_delete=models.CASCADE,
        related_name="questions"
    )
    question_text = models.TextField(
        _("Question Text")
    )
    question_type = models.CharField(
        _("Question Type"),
        max_length=30,
        choices=QUESTION_TYPE_CHOICES,
        default="mcq"
    )
    marks = models.PositiveIntegerField(
        _("Marks"),
        default=1
    )
    explanation = models.TextField(
        _("Explanation"),
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = _("Quiz Question")
        verbose_name_plural = _("Quiz Questions")
        ordering = ["quiz", "order", "id"]

    def __str__(self):
        return self.question_text[:80]


class QuizOption(BaseModel):
    question = models.ForeignKey(
        QuizQuestion,
        on_delete=models.CASCADE,
        related_name="options"
    )
    option_text = models.CharField(
        _("Option Text"),
        max_length=500
    )
    is_correct = models.BooleanField(
        _("Is Correct"),
        default=False
    )

    class Meta:
        verbose_name = _("Quiz Option")
        verbose_name_plural = _("Quiz Options")
        ordering = ["question", "order", "id"]

    def __str__(self):
        return self.option_text


class QuizAttempt(BaseModel):
    STATUS_CHOICES = (
        ("started", "Started"),
        ("submitted", "Submitted"),
        ("passed", "Passed"),
        ("failed", "Failed"),
    )

    quiz = models.ForeignKey(
        Quiz,
        on_delete=models.CASCADE,
        related_name="attempts"
    )
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="quiz_attempts"
    )
    score = models.PositiveIntegerField(
        _("Score"),
        default=0
    )
    status = models.CharField(
        _("Status"),
        max_length=20,
        choices=STATUS_CHOICES,
        default="started"
    )
    started_at = models.DateTimeField(
        _("Started At"),
        auto_now_add=True
    )
    submitted_at = models.DateTimeField(
        _("Submitted At"),
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = _("Quiz Attempt")
        verbose_name_plural = _("Quiz Attempts")
        ordering = ["-started_at"]

    def __str__(self):
        return f"{self.student} - {self.quiz.title}"


class QuizAnswer(BaseModel):
    attempt = models.ForeignKey(
        QuizAttempt,
        on_delete=models.CASCADE,
        related_name="answers"
    )
    question = models.ForeignKey(
        QuizQuestion,
        on_delete=models.CASCADE,
        related_name="student_answers"
    )
    selected_option = models.ForeignKey(
        QuizOption,
        on_delete=models.SET_NULL,
        related_name="selected_answers",
        blank=True,
        null=True
    )
    written_answer = models.TextField(
        _("Written Answer"),
        blank=True,
        null=True
    )
    is_correct = models.BooleanField(
        _("Is Correct"),
        default=False
    )
    obtained_marks = models.PositiveIntegerField(
        _("Obtained Marks"),
        default=0
    )

    class Meta:
        verbose_name = _("Quiz Answer")
        verbose_name_plural = _("Quiz Answers")

    def __str__(self):
        return f"{self.attempt.student} - {self.question.question_text[:50]}"
