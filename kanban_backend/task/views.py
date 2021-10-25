from functools import partial
from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.forms.models import model_to_dict
import board
from board.models import Board

from task.serializers import TaskSerializer
from task.models import Task

# Create your views here.
# class TaskViewSet(viewsets.ModelViewSet):
#     serializer_class = TaskSerializer
#     queryset = Task.objects.all()
#     permission_classes = [AllowAny]

class TaskListView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return JsonResponse({
            'count': len(serializer.data),
            'results' : serializer.data
            }, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            task = serializer.save()
            task = model_to_dict(task)
            return JsonResponse(task, status=status.HTTP_200_OK)
        else:
            return JsonResponse({
                "error":" Send Valid Data in request"
            }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        count = Task.objects.all().delete()
        return JsonResponse({
            'results': '{} Tasks were deleted successfully!'.format(count[0])}, 
        status=status.HTTP_200_OK)


class TaskDetailView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, pk):
        try:
            task = Task.objects.get(pk=pk)
            serializer = TaskSerializer(task)
            return JsonResponse({
                'results' : serializer.data
                }, status=status.HTTP_200_OK)
        
        except task.DoesNotExist: 
            return JsonResponse({
                'results': 'The task does not exist'},
                 status=status.HTTP_404_NOT_FOUND)
    
    def put(self, request, pk):
        try:
            task = get_object_or_404(Task.objects.all(), pk=pk)
            data = request.data
            serializer = TaskSerializer(task, data=data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return JsonResponse({
                    'results' : serializer.data
                    }, status=status.HTTP_200_OK)
            else:
                return JsonResponse({
                    'results' : 'Invalid Data'
                    }, status=status.HTTP_400_BAD_REQUEST)
        
        except task.DoesNotExist: 
            return JsonResponse({
                'results': 'The task does not exist'},
                 status=status.HTTP_404_NOT_FOUND)
        except:
            return JsonResponse({
                'results': 'Handled Exception Occoured'},
                 status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            task = Task.objects.filter(pk=pk).delete()
            return JsonResponse({
                'results' : "Task is deleted successfully"
                }, status=status.HTTP_200_OK)
        
        except task.DoesNotExist: 
            return JsonResponse({
                'results': 'The task does not exist'},
                 status=status.HTTP_404_NOT_FOUND)
        except:
            return JsonResponse({
                'results': 'Handled Exception Occoured'},
                 status=status.HTTP_400_BAD_REQUEST)