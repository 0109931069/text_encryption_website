from django.shortcuts import render
from .models import Code

# Create your views here.
def encryptions(request):
    code = Code.objects.all()
    print(code)
    return render(request, 'encryptions.html', {'code': code})