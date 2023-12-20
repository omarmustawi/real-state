from .views import PropertyList, PropertyDetail, MyProperties
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('property-list/', PropertyList.as_view(), name='property-list'),
    path('property-detail/<int:pk>/',
         PropertyDetail.as_view(), name='property-by-id'),
    path('my-properties/', MyProperties.as_view(), name='my-properties'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
