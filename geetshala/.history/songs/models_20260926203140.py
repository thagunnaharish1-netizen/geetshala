from django.db import models

class Song(models.Model):
    title = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    album = models.CharField(max_length=255, blank=True, null=True)
    lyrics = models.TextField(blank=True, null=True)
    audio_file = models.FileField(upload_to="songs/audio/", blank=True, null=True, help_text="Upload MP3 format track file")
    cover_art = models.ImageField(upload_to="songs/covers/", blank=True, null=True, help_text="Upload 1:1 ratio square artwork file")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.artist}"