from django.db import models
from notes.models import userInfo
from django.utils.text import slugify


class Category(models.Model):
    title = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True,blank=True, null=True)

    def save(self, *args, **kwargs):
        # Check if updating an existing instance
        if self.pk:
            old = BlogPost.objects.get(pk=self.pk)
            if old.title != self.title:
                self.slug = slugify(self.title)
        else:
            # On create
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    photo = models.ImageField(upload_to='blog_photos/', blank=True, null=True)
    description = models.TextField()
    categories = models.ManyToManyField('Category', related_name='posts', blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Check if updating an existing instance
        if self.pk:
            old = BlogPost.objects.get(pk=self.pk)
            if old.title != self.title:
                self.slug = slugify(self.title)
        else:
            # On create
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class Comment(models.Model):
    post = models.ForeignKey(BlogPost, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(userInfo, on_delete=models.CASCADE)
    is_edited = models.BooleanField(blank=True,null=True,default=False)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by user {self.user.id} on {self.post.title}'