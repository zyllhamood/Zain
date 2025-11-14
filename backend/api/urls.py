from django.urls import path
from .views import *

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('upload-image/', ImageUploadView.as_view(), name='upload-image'),
    path('create-video/', VideoCreateView.as_view(), name='create-video'),
    path('edit-video/<int:video_id>/', EditVideoView.as_view(), name='edit-video'),
    path('get-all-photos/', GetAllPhotos.as_view(), name='get-all-photos'),
    path('get-all-videos/', GetAllVideos.as_view(), name='get-all-videos'),
    path('delete-media/', DeleteMedia.as_view(), name='delete-media'),
]