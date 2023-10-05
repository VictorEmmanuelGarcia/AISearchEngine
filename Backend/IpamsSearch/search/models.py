from django.db import models
from django.contrib.auth.models import User # Django's built-in User model

class researchpaper(models.Model):
    TITLE_CHOICES = (
        (1, 'Proposal'),
        (2, 'Thesis/Research'),
        (3, 'Project'),
    )

    CLASSIFICATION_CHOICES = (
        (1, 'Basic Research'),
        (2, 'Applied Research'),
    )

    title = models.CharField(max_length=255)
    abstract = models.TextField()
    year = models.IntegerField()
    record_type = models.IntegerField(choices=TITLE_CHOICES)
    classification = models.IntegerField(choices=CLASSIFICATION_CHOICES)
    psc_ed = models.CharField(max_length=255)
    author = models.CharField(max_length=255)

    def __str__(self):
        return self.title
    
    # Bookmark Model
class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)  # Assuming you're using Django's User model
    name = models.CharField(max_length=255, unique = True)
    research_papers = models.ManyToManyField(researchpaper, through='BookmarkRP')

    def __str__(self):
        return self.name

# BookmarkRP Model (Join Table for Many-to-Many Relationship)
class BookmarkRP(models.Model):
    bookmark = models.ForeignKey(Bookmark, on_delete=models.CASCADE)
    research_paper = models.ForeignKey(researchpaper, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.bookmark.name} - {self.research_paper.title}"
