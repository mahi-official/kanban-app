from django.db import models

# Create your models here.
class Order(models.Model):
    id = models.CharField(max_length=50, primary_key=True, unique=True, null=False, blank=False, editable=True)
    order = models.CharField(max_length=500, null=False, blank=False, default="[]")
