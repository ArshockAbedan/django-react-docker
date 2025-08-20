# django-react-docker/backend/backend/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.http import HttpResponse
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
import json

@api_view(['GET'])
def send_some_data(request):
    return Response({
        "data": "Hello from django backend"
    })



@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    data = request.data
    email = data.get('email')
    password = data.get('password')
    user = authenticate(username=email, password=password)
    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'options': ['login', 'register']
        })
    return Response({
        'error': 'Invalid credentials',
        'options': ['login', 'register']
    }, status=status.HTTP_401_UNAUTHORIZED)


# Registration endpoint
from django.contrib.auth.models import User
@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    data = request.data
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return Response({'error': 'Email and password required'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(username=email).exists():
        return Response({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)
    user = User.objects.create_user(username=email, email=email, password=password)
    return Response({'success': 'User registered successfully'})

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def google_login_view(request):
    # This is a placeholder. You should verify the Google token here.
    # Use a package like google-auth or django-allauth for production.
    data = request.data
    token = data.get('token')
    if token:
        # Here you would verify the token and get user info
        # For now, just return success for demonstration
        return Response({'token': 'google_token_placeholder'})
    return Response({'error': 'No token provided'}, status=status.HTTP_400_BAD_REQUEST)

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")