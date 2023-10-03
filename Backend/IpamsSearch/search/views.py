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

class ResearchPaperListView(generics.ListAPIView):
    queryset = researchpaper.objects.all()
    serializer_class = ResearchPaperSerializer

class SearchView(APIView):
    def get(self, request):
        # Get the query from the request
        query = request.GET.get("query", "")

        search_results = perform_semantic_search(query)

        serializer = ResearchPaperSerializer(search_results, many=True)
        return Response(serializer.data)

# Bookmark Views
# Create Bookmark View
class CreateBookmarkView(generics.CreateAPIView):
    queryset = Bookmark.objects.prefetch_related('research_papers')
    serializer_class = BookmarkSerializer

# Get Bookmarks View
class ListBookmarksView(generics.ListAPIView):
    serializer_class = BookmarkSerializer

    def get_queryset(self):
        # Retrieve the user ID from the URL parameter (e.g., /list-bookmarks/<user_id>/)
        user_id = self.kwargs['user_id']

        # Query the database to get all bookmarks for the specific user
        queryset = Bookmark.objects.filter(user_id=user_id)
        return queryset