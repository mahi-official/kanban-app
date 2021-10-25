from django.db import models

from utils import randomID

# Create your models here.
class Board(models.Model):
    id = models.CharField(primary_key=True, unique=True, null=False, max_length=50, editable=False)
    title = models.CharField(max_length=500, null=False, blank=False)   

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.id:
            self.id = randomID(length=5)
        super().save(*args, **kwargs)

    class Meta:
        ordering = ["-id"]