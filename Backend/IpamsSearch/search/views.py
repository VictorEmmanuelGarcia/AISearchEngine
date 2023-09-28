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

# def search_view(request):
#     # Get the query from the request
#     query = request.GET.get("query", "")

#     # Query the database to retrieve all "Abstract" values from the 'researchpaper' model
#     research_papers = researchpaper.objects.all()

#     # Count the number of elements in the research paper list
#     num_res = len(research_papers)

#     # Print the result
#     print("Number of abstracts:", num_res)

#     # Extract the "Abstract" values and convert them to a list of dictionaries
#     abstract_values = [{"Abstract": paper.abstract} for paper in research_papers]

#     # Perform semantic search using the "abstract_values" list
#     search_results = perform_semantic_search(abstract_values, query)

#     # Return the search results as JSON response
#     return JsonResponse([
#         {
#             "title": paper.title,
#             "year": paper.year,
#             "record_type": paper.record_type,
#             "classification": paper.classification,
#             "psc_ed": paper.psc_ed,
#             "author": paper.author,
#             "semantic_score": result  # Include the semantic search score
#         }
#         for result, paper in zip(search_results, research_papers)
#     ], safe=False)

class SearchView(APIView):
    def get(self, request):
        # Get the query from the request
        query = request.GET.get("query", "")

        # Query the database to retrieve all "Abstract" values from the 'researchpaper' model
        research_papers = researchpaper.objects.all()

        # # Count the number of elements in the research paper list
        # num_res = len(research_papers)

        # # Print the result
        # print("Number of abstracts:", num_res)

        # # Extract the "Abstract" values and convert them to a list of dictionaries
        # abstract_values = [{"Abstract": paper.abstract} for paper in research_papers]

        # # Perform semantic search using the "abstract_values" list
        search_results = perform_semantic_search(query)

        serializer = ResearchPaperSerializer(search_results, many=True)
        return Response(serializer.data)
        # # Return the search results as JSON response
        # return JsonResponse([
        #     {
        #         "id": paper.id,  # Include the ID of the paper
        #         "title": paper.title,
        #         "year": paper.year,
        #         "record_type": paper.record_type,
        #         "classification": paper.classification,
        #         "psc_ed": paper.psc_ed,
        #         "author": paper.author,
        #         "semantic_score": result,  # Include the semantic search score
        #     }
        #     for result, paper in zip(search_results)
        # ], safe=False)
