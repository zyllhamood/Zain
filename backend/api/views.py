from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
import requests
from .models import Photo, Video
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response({
                'error': 'Username and password are required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Authenticate user by email and password
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            # Generate JWT token
            token_serializer = TokenObtainPairSerializer()
            token_data = token_serializer.get_token(user)
            access_token = str(token_data.access_token)
            refresh_token = str(token_data)
            
            return Response({
                'message': 'Login successful',
                'access_token': access_token,
                'refresh_token': refresh_token,
                
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'error': 'Invalid username or password'
            }, status=status.HTTP_401_UNAUTHORIZED)


class ImageUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        if 'image' not in request.FILES:
            return Response({"error": "No image provided"}, status=status.HTTP_400_BAD_REQUEST)

        image_file = request.FILES['image']
        media_type = request.data.get('media_type', '')

        # Upload the image to Imgur
        try:
            image_url = self.upload_image_to_imgur(image_file)
            
            # Check media_type and create Media object if needed
            if media_type == 'photo':
                media = Photo.objects.create(
                    image_url=image_url,
                )
                return Response({
                    "url": image_url,
                    "media_id": media.id,
                    "media_type": media_type
                }, status=status.HTTP_201_CREATED)
            
            else:
                # Default behavior: just return the URL
                return Response({"url": image_url}, status=status.HTTP_201_CREATED)
                
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def upload_image_to_imgur(self, image_file):
        headers = {"Authorization": "Client-ID aa22e62ec19c124"}
        url = "https://api.imgur.com/3/image"

        files = {'image': image_file}

        response = requests.post(url, headers=headers, files=files)

        if response.status_code == 200:
            json_response = response.json()
            return json_response['data']['link']
        else:
            raise Exception(f"Failed to upload image. Status code: {response.status_code}, Response: {response.text}")


class VideoCreateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]
    def post(self, request, *args, **kwargs):
        text = request.data.get('text', '')
        image_url = request.data.get('image_url', '')
        video_url = request.data.get('video_url', '')

        # Validate that at least text is provided
        if not text:
            return Response({"error": "Text is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Create Film object
            video = Video.objects.create(
                text=text,
                image_url=image_url,
                video_url=video_url
            )
            
            return Response({
                "id": video.id,
                "text": video.text,
                "image_url": video.image_url,
                "video_url": video.video_url,
                "created_at": video.created_at
            }, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetAllPhotos(APIView):
    def get(self, request, *args, **kwargs):
        try:
            # Collect all photos
            photos = Photo.objects.all()
            data = [{
                "id": photo.id,
                "image_url": photo.image_url,
                "created_at": photo.created_at
            } for photo in photos]

            return Response(data, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetAllVideos(APIView):
    def get(self, request, *args, **kwargs):
        try:
            # Collect all videos
            videos = Video.objects.all()
            data = [{
                "id": video.id,
                "text": video.text,
                "image_url": video.image_url,
                "video_url": video.video_url,
                "created_at": video.created_at
            } for video in videos]

            return Response(data, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class EditVideoView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]
    
    def get(self, request, video_id):
        try:
            video = Video.objects.get(id=video_id)
            return Response({
                "id": video.id,
                "text": video.text,
                "image_url": video.image_url,
                "video_url": video.video_url,
                "created_at": video.created_at
            }, status=status.HTTP_200_OK)
        except Video.DoesNotExist:
            return Response({"error": f"Video with id {video_id} not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def put(self, request, video_id):
        text = request.data.get('text', '')
        image_url = request.data.get('image_url', '')
        video_url = request.data.get('video_url', '')

        # Validate that at least text is provided
        if not text:
            return Response({"error": "Text is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            video = Video.objects.get(id=video_id)
            video.text = text
            if image_url:
                video.image_url = image_url
            if video_url:
                video.video_url = video_url
            video.save()
            
            return Response({
                "id": video.id,
                "text": video.text,
                "image_url": video.image_url,
                "video_url": video.video_url,
                "created_at": video.created_at
            }, status=status.HTTP_200_OK)
            
        except Video.DoesNotExist:
            return Response({"error": f"Video with id {video_id} not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeleteMedia(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]
    def delete(self, request, *args, **kwargs):
        media_id = request.data.get('id')
        media_type = request.data.get('media_type', '')
        
        # Validate that id is provided
        if not media_id:
            return Response({"error": "ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            if media_type == 'photo':
                # Delete from Photo model
                try:
                    photo = Photo.objects.get(id=media_id)
                    photo.delete()
                    return Response({
                        "message": f"Photo with id {media_id} deleted successfully",
                        "deleted_type": media_type
                    }, status=status.HTTP_200_OK)
                except Photo.DoesNotExist:
                    return Response({"error": f"Media with id {media_id} not found"}, status=status.HTTP_404_NOT_FOUND)
            
            else:
                # Delete from Video model
                try:
                    video = Video.objects.get(id=media_id)
                    video.delete()
                    return Response({
                        "message": f"Video with id {media_id} deleted successfully",
                        "deleted_type": "video"
                    }, status=status.HTTP_200_OK)
                except Video.DoesNotExist:
                    return Response({"error": f"Video with id {media_id} not found"}, status=status.HTTP_404_NOT_FOUND)
                    
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
