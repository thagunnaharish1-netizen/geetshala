from django.db import models

class Feedback(models.Model):
    user_email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    is_reviewed = models.BooleanField(default=False)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback from {self.user_email}: {self.subject}"