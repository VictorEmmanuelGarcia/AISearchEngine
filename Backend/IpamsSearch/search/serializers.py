# serializers.py in your app
from rest_framework import serializers
from .models import researchpaper

class SearchQuerySerializer(serializers.Serializer):
    query = serializers.CharField()

class SearchResultSerializer(serializers.Serializer):
    title = serializers.CharField()
    abstract = serializers.CharField()
    year = serializers.IntegerField()
    record_type = serializers.ChoiceField(choices=researchpaper.TITLE_CHOICES)
    classification = serializers.ChoiceField(choices=researchpaper.CLASSIFICATION_CHOICES)
    psc_ed = serializers.CharField()
    author = serializers.CharField()
    similarity = serializers.FloatField()


class ResearchPaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = researchpaper
        fields = '__all__'