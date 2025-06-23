from email.message import EmailMessage
from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from project import settings
from django.core.validators import EmailValidator
from django.core.exceptions import ValidationError
from django.templatetags.static import static
js_file_url = static('js/valid.js')


email_validator = EmailValidator()
# Create your views here.
def index(request):
    return render(request, 'index.html')

def signup(request):
    users = User.objects.values_list('username', flat=True)
    usernames =[]
    for user in users:
        usernames.append(user)

    if request.method == 'POST':
        username = request.POST.get('username')
        fname = request.POST.get('firstname')
        lname = request.POST.get('lastname')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confpass = request.POST.get('confirmpassword')
        myuser = User.objects.create_user(username, email, password)
        myuser.first_name = fname
        myuser.last_name = lname
        myuser.is_active = True
        myuser.save()
        return redirect('signin')
    return render(request, 'signup.html', {'users': usernames})

def signin(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        users = User.objects.values_list('username', 'password')
      
        return redirect('encryptions')
    # messages.error("password or username is wrong")
    return render(request, 'signin.html')
    