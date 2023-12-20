from django.conf import settings
from django.conf.urls.static import static

from django.urls import path
from .views import ImageUploadView, ImageView


urlpatterns = [
    path('upload/', ImageUploadView.as_view(), name='image-upload'),
    path('images/<int:pk>/', ImageView.as_view(), name='image-detail'),

] 

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

