from django.db import models
from datetime import datetime
from django.template.defaultfilters import slugify


STATUS = (
    (0, "Draft"),
    (1, "Published")
)

# Create your models here.
class BlogPost(models.Model):
    title = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(blank=True, unique=True)
    thumbnail = models.ImageField(upload_to='photos/%Y/%m/%d', blank=True, null=True)
    excerpt = models.CharField(max_length=150, blank=True)
    content = models.TextField()
    date_created = models.DateTimeField(default=datetime.now, blank=True)

    status = models.IntegerField(choices=STATUS, default=0)

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):

        self.slug = slugify(self.title)

        excerpt = self.content

        if len(excerpt) > 150:
            excerpt = excerpt[:150]

        self.excerpt = excerpt

        super(BlogPost, self).save(*args, **kwargs)
