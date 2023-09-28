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


# Define a function to perform semantic search TXTAI
def perform_semantic_search(query, top_k=5):
    # Load the embeddings
    embeddings.load('indexed_embeddings')

    # Query the database to retrieve all "Abstract" values from the 'researchpaper' model
    
    # # Create an empty list to store the Abstract values
    # abstract_values = []

    # # Iterate through a dataset of text records
    # for record in data:
    #     # Extract the "Abstract" field from each record and append it to the abstract_values list
    #     abstract_value = record.get("Abstract")
    #     abstract_values.append(abstract_value)

    # Perform semantic search
    res = embeddings.search(query, top_k)

    result_ids = [result[0] for result in res]
    # # Create a list of search results
    # search_results = []
    # for r in res:
    #     # Get the record corresponding to the search result
    #     record = data[r[0]]

    #     # Create a new result dictionary containing all fields of the record
    #     result = {key: value for key, value in record.items()}

    #     # Add the similarity score to the result dictionary
    #     result["Similarity"] = r[1]

    #     # Append the result to the search_results list
    #     search_results.append(result)

    return researchpaper.objects.filter(id__in=result_ids)