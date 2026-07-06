from django.contrib import admin

# LOCAL IMPORTS
from .models import (
    Course,
    Assignment,
    AssignmentSubmission,
    Quiz, QuizQuestion,
    QuizOption,
    QuizAttempt,
    QuizAnswer
)


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'teacher', 'is_published', 'created_at')
    search_fields = ('title', 'teacher__username')
    list_filter = ('is_published', 'created_at')


@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'course',
        'is_published',
        'due_date',
        'created_at'
    )
    search_fields = ('title', 'course__title')
    list_filter = ('is_published', 'due_date', 'created_at')


@admin.register(AssignmentSubmission)
class AssignmentSubmissionAdmin(admin.ModelAdmin):
    list_display = (
        'assignment',
        'student',
        'status',
        'submitted_at',
        'reviewed_at'
    )
    search_fields = ('assignment__title', 'student__username')
    list_filter = ('status', 'submitted_at', 'reviewed_at')


@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'is_published', 'created_at')
    search_fields = ('title', 'course__title')
    list_filter = ('is_published', 'created_at')


@admin.register(QuizQuestion)
class QuizQuestionAdmin(admin.ModelAdmin):
    list_display = (
        'question_text',
        'quiz',
        'question_type',
        'created_at'
    )
    search_fields = ('question_text', 'quiz__title')
    list_filter = ('question_type', 'created_at')


@admin.register(QuizOption)
class QuizOptionAdmin(admin.ModelAdmin):
    list_display = (
        'option_text',
        'question',
        'is_correct',
        'created_at'
    )
    search_fields = ('option_text', 'question__question_text')
    list_filter = ('is_correct', 'created_at')


@admin.register(QuizAttempt)
class QuizAttemptAdmin(admin.ModelAdmin):
    list_display = (
        'quiz',
        'student',
        'status',
        'started_at',
        'submitted_at'
    )
    search_fields = ('quiz__title', 'student__username')
    list_filter = ('status', 'started_at', 'submitted_at')


@admin.register(QuizAnswer)
class QuizAnswerAdmin(admin.ModelAdmin):
    list_display = (
        'attempt',
        'question',
        'selected_option',
        'is_correct',
        'obtained_marks'
    )
    search_fields = ('attempt__quiz__title', 'question__question_text')
    list_filter = ('is_correct', 'obtained_marks')
