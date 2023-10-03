from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response

def create_bookmark(request, serializer_class, user):
    # Deserialize the request data and create the bookmark
    serializer = serializer_class(data=request.data)
    if serializer.is_valid():
        # Associate the bookmark with the authenticated user
        serializer.save(user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
