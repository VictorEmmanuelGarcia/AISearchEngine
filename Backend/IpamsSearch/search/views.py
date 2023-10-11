from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from txtai.embeddings import Embeddings
from bookmark_function import create_bookmark
from .models import Bookmark, BookmarkRP, researchpaper
from rest_framework import generics, viewsets, status, permissions
from .serializers import BookmarkRPSerializer, BookmarkSerializer, ResearchPaperSerializer
from semantic_search import perform_semantic_search
from django.http import JsonResponse
from rest_framework.decorators import action
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404

# Semantic Search Views
embeddings = Embeddings({
    "path": "sentence-transformers/all-MiniLM-L6-v2"
})

class SearchView(APIView):
    def get(self, request):
        # Get the query from the request
        query = request.GET.get("query", "")

        search_results = perform_semantic_search(query)

        serializer = ResearchPaperSerializer(search_results, many=True)
        return Response(serializer.data)

# Research Paper Views
# Get All Research Papers
class ResearchPaperListView(generics.ListAPIView):
    queryset = researchpaper.objects.all()
    serializer_class = ResearchPaperSerializer

# Get Research Paper by ID
class GetResearchPaperById(APIView):
    def get(self, request, pk):
        research_paper = get_object_or_404(researchpaper, pk=pk)
        serializer = ResearchPaperSerializer(research_paper)
        return Response(serializer.data)

# Bookmark Views
# Create Bookmark View
class CreateBookmarkView(generics.CreateAPIView):
    queryset = Bookmark.objects.prefetch_related('research_papers')
    serializer_class = BookmarkSerializer

    def perform_create(self, serializer):
        # Get the user from the request if available
        user = self.request.user

        # Check if a bookmark with the same name already exists for the current user or if user is not specified
        bookmark_name = serializer.validate_data.get('name')
        
        existing_bookmark = Bookmark.objects.filter(name=bookmark_name, user=user).first()

        if existing_bookmark:
            # If a bookmark with the same name exists for the current user, return an error response
            response_data = {'detail': 'Bookmark with this name already exists for this user.'}
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

        # If the bookmark name is unique for the current user or user is not specified, create the bookmark
        serializer.save(user=user)

# Get Bookmarks by ID View
class ListBookmarksView(generics.ListAPIView):
    serializer_class = BookmarkSerializer

    def get_queryset(self):
        # Retrieve the user ID from the URL parameter (e.g., /list-bookmarks/<user_id>/)
        user_id = self.kwargs['user_id']

        # Query the database to get all bookmarks for the specific user
        queryset = Bookmark.objects.filter(user_id=user_id)
        return queryset
    
# Update Bookmark View
class BookmarkViewSet(viewsets.ModelViewSet):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer

    def updateBookmarkName(self, request, *args, **kwargs):
        bookmark = self.get_object()
        new_name = request.data.get('new_name')

        if new_name:
            bookmark.name = new_name
            bookmark.save()
            return Response({'message': 'Bookmark name updated successfully'})
        else:
            return Response({'message': 'New name not provided'}, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=False, methods=['get'])
    def getListOfBookmarks(self, request):
        # Retrieve the bookmarks for the current user
        user = self.request.user
        bookmarks = Bookmark.objects.filter(user=user)
        serializer = BookmarkSerializer(bookmarks, many=True)
        return Response(serializer.data)
    
    