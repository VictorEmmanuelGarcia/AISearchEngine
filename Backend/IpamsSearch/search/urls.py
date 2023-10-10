from django.urls import path, include
from .views import SearchView, ResearchPaperListView, CreateBookmarkView, ListBookmarksView, GetResearchPaperById


urlpatterns = [
    # Semantic Search URLs
    path('search/', SearchView.as_view(), name='search'),

    # Research Paper URLs
    path('research-papers/<int:pk>/', GetResearchPaperById.as_view(), name='get_research_paper_by_id'),
    path('research-papers/', ResearchPaperListView.as_view(), name='research-papers'),

    # Bookmark URLs
    path('create-bookmark/', CreateBookmarkView.as_view(), name='create-bookmark'),
    path('list-bookmarks/<int:user_id>/', ListBookmarksView.as_view(), name='list-bookmarks'),
]
