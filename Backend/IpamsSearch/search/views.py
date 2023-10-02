from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import SearchQuerySerializer, SearchResultSerializer
from txtai.embeddings import Embeddings
from .models import researchpaper
from rest_framework import generics
from .serializers import ResearchPaperSerializer
from semantic_search import perform_semantic_search
from django.http import JsonResponse

embeddings = Embeddings({
    "path": "sentence-transformers/all-MiniLM-L6-v2"
})

class SemanticSearchView(APIView):
    def post(self, request):
        serializer = SearchQuerySerializer(data=request.data)
        if serializer.is_valid():
            query = serializer.validated_data['query']

            # Perform semantic search using txtai library
            results = embeddings.search(query, 5)  # Adjust the number of results as needed

            search_results = []
            for index, similarity in results:
                paper = researchpaper.objects.get(id=index + 1)  # Assuming your model has auto-incremented IDs
                serializer = SearchResultSerializer(paper, context={'similarity': similarity})
                search_results.append(serializer.data)

            return Response(search_results)
        else:
            return Response(serializer.errors, status=400)


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