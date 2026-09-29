
# C:\Users\Harish\geetshala\geetshala\views.py
from django.http import HttpResponseNotFound

def custom_404_view(request, exception):
    return HttpResponseNotFound("<h1>404 - Oops! This page doesn't exist on Geetshala.</h1>")
