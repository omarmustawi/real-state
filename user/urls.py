from .views import registerUser, userList, loginUser, get_update_delete_user, search_users
from django.urls import path

urlpatterns = [
    path('register/', registerUser, name='register'),
    path('login/', loginUser, name='login'),
    path('users/', userList, name='user-list'),
    path('users/<int:pk>/', get_update_delete_user, name='user-by-id'),
    # path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
     path('search/', search_users, name='search_users'),
]