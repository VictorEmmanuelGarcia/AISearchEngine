# Import necessary libraries
import os
from txtai.embeddings import Embeddings
import transformers
from django.db.models import Q
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer, util
import pickle
from search.models import researchpaper

# Initialize the embeddings model
embeddings = Embeddings({
    "path": "sentence-transformers/all-MiniLM-L6-v2"
})    

def index_data():
    embeddings = Embeddings({"path": "sentence-transformers/all-MiniLM-L6-v2"})

    researches = researchpaper.objects.all()
    data = [(research.id, research.abstract, None) for research in researches]

    embeddings.index(data)
    embeddings.save('indexed_embeddings')


# Define a function to perform semantic search TXTAI using the load embeddings
def perform_semantic_search(query, top_k=5):
    # Load the embeddings
    embeddings.load('indexed_embeddings')

    # Perform the semantic search
    res = embeddings.search(query, top_k)

    # Get the IDs of the results
    result_ids = [result[0] for result in res]

    # Return the results in the order of the results
    return researchpaper.objects.filter(id__in=result_ids)