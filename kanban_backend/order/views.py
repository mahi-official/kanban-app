from order.models import Order
from order.serializers import OrderSerializer
from rest_framework import viewsets

from rest_framework.permissions import AllowAny

# Create your views here.
class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    
    