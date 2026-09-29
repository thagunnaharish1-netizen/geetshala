from django.contrib import admin
from .models import Song

@admin.register(Song)
class SongAdmin(admin.ModelAdmin):
    fields = ('lyrics', 'title', 'artist', 'album', 'audio_file', 'cover_art')
    list_display = ('title', 'artist', 'album', 'created_at')
    search_fields = ('title', 'artist', 'lyrics')
    list_filter = ('created_at', 'album')
    ordering = ('-created_at',)