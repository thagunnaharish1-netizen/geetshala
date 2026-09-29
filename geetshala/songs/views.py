# songs/views.py

from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

def song_list(request):
    return HttpResponse("Welcome to the Song List! Here you can find all the songs.")

# def song_list(request):
#     songs = Song.objects.all()  # Retrieve all songs from the database
#     template = loader.get_template('songs/song_list.html')  # Load the template
#     context = {'songs': songs}  # Context dictionary to pass to the template
#     rendered_template = template.render(context, request)  # Render the template with context
#     return HttpResponse(rendered_template)  # Return an HttpResponse with the rendered content
                        
def song_detail(request, song_id):
    # The arguments (song_id) are passed directly from the URLconf
    response_text = f"You are viewing Song ID: {song_id}"
    return HttpResponse(response_text)
