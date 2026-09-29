# songs/views.py

from django.shortcuts import render
from django.http import HttpResponse

def song_list(request):
    return HttpResponse("Welcome to the Song List! Here you can find all the songs.")
                        
def song_detail(request, song_id):
    # The arguments (song_id) are passed directly from the URLconf
    response_text = f"You are viewing Song ID: {song_id}"
    return HttpResponse(response_text)
