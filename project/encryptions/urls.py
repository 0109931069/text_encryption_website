
from django.urls import path
from. import views

urlpatterns = [
    path('', views.encryptions, name = 'encryptions'),
]