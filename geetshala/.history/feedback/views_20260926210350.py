from django.shortcuts import render
from .models import Feedback

def submit_feedback(request):
    context = {'success': False}
    if request.method == 'POST':
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        
        Feedback.objects.create(user_email=email, subject=subject, message=message)
        context['success'] = True
        
    return render(request, 'form.html', context)