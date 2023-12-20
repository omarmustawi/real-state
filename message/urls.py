from django.urls import path
from .views import MessagesList

urlpatterns = [
    path('messages/', MessagesList.as_view(), name="message"),
]
