# Import necessary libraries
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

# Define a function to load or generate embeddings
def load_or_generate_embeddings():
    try:
        with open('embeddings.pickle', 'rb') as file:
            return pickle.load(file)
    except FileNotFoundError:
        # Query the database to retrieve all "Abstract" values from the 'researchpaper' model
        research_papers = researchpaper.objects.all()

        # Extract the "Abstract" values and convert them to a list
        abstracts = [paper.abstract for paper in research_papers]

        # Index the abstracts
        embeddings.index(abstracts)

        # Save the embeddings to a file
        with open('embeddings.pickle', 'wb') as file:
            pickle.dump(embeddings, file)
        
        return embeddings

# Load or generate embeddings
embeddings = load_or_generate_embeddings()

# Define a function to perform semantic search TXTAI
def perform_semantic_search(data, query, top_k=5):
    # Create an empty list to store the Abstract values
    abstract_values = []

    # Iterate through a dataset of text records
    for record in data:
        # Extract the "Abstract" field from each record and append it to the abstract_values list
        abstract_value = record.get("Abstract")
        abstract_values.append(abstract_value)

    # Index the abstract_values
    embeddings.index(abstract_values)

    # Perform semantic search
    res = embeddings.search(query, top_k)

    # Create a list of search results
    search_results = []
    for r in res:
        # Get the record corresponding to the search result
        record = data[r[0]]

        # Create a new result dictionary containing all fields of the record
        result = {key: value for key, value in record.items()}

        # Add the similarity score to the result dictionary
        result["Similarity"] = r[1]

        # Append the result to the search_results list
        search_results.append(result)

    return search_results