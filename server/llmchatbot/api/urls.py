from django.urls import path
from . import views

urlpatterns = [
    path('',views.endpointview.as_view(),name='endpoints')
]