from django.shortcuts import render
from .models import Song

def explore(request):
    songs = Song.objects.all()
    return render(request, 'explore.html', {'songs': songs})