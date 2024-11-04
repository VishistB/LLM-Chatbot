from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'chats', views.ChatViewSet, basename='chat')

urlpatterns = [
    path('',include(router.urls),name='endpoints'),
    # path('prompts/',views.PromptResponseView.as_view(),name='prompts'),
    path("chats/<uuid:chat_id>/prompt_response/", views.PromptResponseView.as_view(), name="prompt_response"),
    path('auth/register/', views.RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("chats/<uuid:chat_id>/messages/", views.ChatMessagesView.as_view(), name="chat_messages"),
]