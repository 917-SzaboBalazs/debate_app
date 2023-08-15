from django.db import models
from datetime import datetime
from django.template.defaultfilters import slugify
from users.models import NewUser
import re

CLEANR = re.compile('<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});')

STATUS = (
    (0, "Draft"),
    (1, "Published")
)

# Create your models here.
class BlogPost(models.Model):
    title = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(blank=True, unique=True)
    thumbnail = models.ImageField(upload_to='photos/%Y/%m/%d', blank=True, null=True)
    excerpt = models.CharField(max_length=300, blank=True)
    content = models.TextField()
    date_created = models.DateField(default=datetime.today, blank=True)

    added_by = models.ForeignKey(to=NewUser, on_delete=models.CASCADE, related_name='added_by')

    status = models.IntegerField(choices=STATUS, default=0)

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):

        self.slug = slugify(self.title)

        excerpt = self.__remove_tags(self.content)

        if len(excerpt) > 300:
            excerpt = excerpt[:300]

        self.excerpt = excerpt

        super(BlogPost, self).save(*args, **kwargs)

    def __remove_tags(self, raw_text):
        raw_text = re.sub('</div>', ' ', raw_text)
        
        cleantext = re.sub(CLEANR, '', raw_text)
        return cleantext