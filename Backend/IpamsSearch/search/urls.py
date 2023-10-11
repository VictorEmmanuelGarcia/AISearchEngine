from django.urls import path, include
from .views import SearchView, ResearchPaperListView, CreateBookmarkView, ListBookmarksView, GetResearchPaperById, BookmarkViewSet
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    # Semantic Search URLs
    path('search/', SearchView.as_view(), name='search'),

    # Research Paper URLs
    path('research-papers/<int:pk>/', GetResearchPaperById.as_view(), name='get_research_paper_by_id'),
    path('research-papers/', ResearchPaperListView.as_view(), name='research-papers'),

    # Bookmark URLs
    path('create-bookmark/', CreateBookmarkView.as_view(), name='create-bookmark'),
    path('list-bookmarks/<int:user_id>/', ListBookmarksView.as_view(), name='list-bookmarks'),
    path('bookmarks/', BookmarkViewSet.as_view({'get': 'list'}), name='bookmarks'),
    path('bookmarks/list/', BookmarkViewSet.as_view({'get': 'getListOfBookmarks'}), name='list-of-bookmarks'),
    path('bookmarks/<int:pk>/delete/', BookmarkViewSet.as_view({'delete': 'deleteBookmark'}), name='delete-bookmark'),
]

# User URLs with a separate namespace
user_urls = [
    path('obtain-auth-token/', obtain_auth_token, name='obtain-auth-token'),
]

urlpatterns += [
    path('user/', include(user_urls)),
]
