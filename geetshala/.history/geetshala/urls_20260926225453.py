"""
URL configuration for geetshala project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Main Admin Panel Route Mapping
    path('admin/', admin.site.urls),
    
    # Domain Specific Application Includes
    path('songs/', include('songs.urls')),
    path('feedback/', include('feedback.urls')),
    
    # Fallback to redirect root domain route visits onto songs deck automatically
    path('', RedirectView.as_view(url='songs/', permanent=True)),
]

# Append media file router support for local development asset streaming
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    # ─── OVERRIDE DEFAULT ERROR HANDLERS ───


handler404 = TemplateView.as_view(template_name='errors/404.html', status=404)
handler500 = TemplateView.as_view(template_name='errors/500.html', status=500)