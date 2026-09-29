  # geetshala/views.py
  from django.http import HttpResponse

  def custom_404_view(request, exception):
    return HttpResponse("Custom 404 - Trying to render a page", status=404)