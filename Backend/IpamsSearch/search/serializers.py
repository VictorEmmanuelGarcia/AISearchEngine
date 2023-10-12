# serializers.py in your app
from rest_framework import serializers
from .models import Bookmark, BookmarkRP, researchpaper

# ResearchPaper Serializer
class ResearchPaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = researchpaper
        fields = '__all__'

# BookmarkRP Serializer
class BookmarkRPSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookmarkRP
        fields = ['id', 'bookmark', 'research_paper']

# Bookmark Serializer
class BookmarkSerializer(serializers.ModelSerializer):
    research_papers = serializers.PrimaryKeyRelatedField(many=True, queryset=researchpaper.objects.all(), required=False)

    class Meta:
        model = Bookmark
        fields = ['id', 'name', 'research_papers']