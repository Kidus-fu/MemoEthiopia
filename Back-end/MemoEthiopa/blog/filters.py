import django_filters
from .models import BlogPost

class BlogPostFilter(django_filters.FilterSet):
    category_title = django_filters.CharFilter(field_name='categories__title', lookup_expr='icontains')

    class Meta:
        model = BlogPost
        fields = ['category_title']
