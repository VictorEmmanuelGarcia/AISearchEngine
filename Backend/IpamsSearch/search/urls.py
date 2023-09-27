# urls.py in your app
from django.urls import path
from .views import SemanticSearchView
from .views import ResearchPaperListView
from . import views

urlpatterns = [
    # path('semantic-search/', SemanticSearchView.as_view(), name='semantic-search'),
    # path('research-papers/', ResearchPaperListView.as_view(), name='research-papers'),
    path('search/', views.search_view, name='search_view'),
]
