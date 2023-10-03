# serializers.py in your app
from rest_framework import serializers
from .models import Bookmark, BookmarkRP, researchpaper

class ResearchPaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = researchpaper
        fields = '__all__'

class BookmarkRPSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookmarkRP
        fields = ['id', 'bookmark', 'research_paper']

class BookmarkSerializer(serializers.ModelSerializer):
    research_papers = serializers.PrimaryKeyRelatedField(many=True, queryset=researchpaper.objects.all(), required=False)

    class Meta:
        model = Bookmark
        fields = ['id', 'user', 'name', 'research_papers']