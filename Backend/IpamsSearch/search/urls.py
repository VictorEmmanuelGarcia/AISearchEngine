from django.urls import path, include
from .views import SearchView, ResearchPaperListView, CreateBookmarkView, ListBookmarksView


urlpatterns = [
    # Semantic Search URLs
    path('research-papers/', ResearchPaperListView.as_view(), name='research-papers'),
    path('search/', SearchView.as_view(), name='search'),

    # Bookmark URLs
    path('create-bookmark/', CreateBookmarkView.as_view(), name='create-bookmark'),
    path('list-bookmarks/<int:user_id>/', ListBookmarksView.as_view(), name='list-bookmarks'),
]
