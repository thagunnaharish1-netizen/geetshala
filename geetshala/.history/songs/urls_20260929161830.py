# App-level URLconf: routes to specific views within the songs app
from django.urls import path
from . import views
urlpatterns = [
    path('', views.song_list, name='song_list'),  # e.g., /songs/
    path('<int:song_id>/', views.song_detail, name='song_detail'),  # e.g., /songs/1/
]