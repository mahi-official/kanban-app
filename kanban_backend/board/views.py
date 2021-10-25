from board.models import Board
from board.serializers import BoardSerializer
from rest_framework import viewsets

from rest_framework.permissions import AllowAny

# Create your views here.
class BoardViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = BoardSerializer
    queryset = Board.objects.all()
    
    