# django-react-docker/backend/backend/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse

@api_view(['GET'])
def send_some_data(request):
    return Response({
        "data": "Hello from django backend"
    })




def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")