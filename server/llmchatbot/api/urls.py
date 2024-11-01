from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'chats', views.ChatViewSet, basename='chat')

urlpatterns = [
    path('',views.endpointview.as_view(),name='endpoints'),
    path('prompts/',views.PromptResponseView.as_view(),name='prompts'),
    path('auth/register/', views.RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]