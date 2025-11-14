from django.db import models

# Create your models here.


class Photo(models.Model):
    image_url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Photo {self.id} - {self.created_at}"

    class Meta:
        ordering = ['-created_at']


class Video(models.Model):
    image_url = models.URLField()
    video_url = models.URLField()
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Video {self.id} - {self.created_at}"

    class Meta:
        ordering = ['-created_at']
