from django.db import models

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
