from django.db import models

# Create your models here.
class Code(models.Model):
    name = models.CharField(max_length = 50)
    value = models.CharField(max_length = 10, default = 'ceaser')