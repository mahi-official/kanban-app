from django.db import models
from board.models import Board

from utils import randomID

# Create your models here.
class Task(models.Model):
    id = models.CharField(primary_key=True, unique=True, null=False, max_length=50, editable=False)
    content = models.TextField(max_length=500, null=False, blank=False)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)

    def __str__(self):
        return self.content

    def save(self, *args, **kwargs):
        if not self.id:
            self.id = randomID(length=8)
        super().save(*args, **kwargs)

    class Meta:
        ordering = ["-id"]
