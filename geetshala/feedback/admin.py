from django.contrib import admin
from .models import Feedback

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    fields = ('user_email', 'subject', 'message', 'is_reviewed')
    list_display = ('user_email', 'subject', 'submitted_at', 'is_reviewed')
    search_fields = ('user_email', 'subject')
    list_filter = ('is_reviewed', 'submitted_at')