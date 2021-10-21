from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.models import User
from base.serializers import (
    UserSerializer,
    UserSerializerWithToken,
)
# Simple JWT customization
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from django.contrib.auth.hashers import make_password
import re
from rest_framework_simplejwt.tokens import RefreshToken

regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
# Create your views here.


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # Get all the info inside access token
    # @classmethod
    # def get_token(cls, user):
    #     token = super().get_token(user)
    #     refresh = RefreshToken.for_user(user)
    #     token['username'] = user.username
    #     token['email'] = user.username
    #     token['name'] = user.first_name
    #     token['token'] = str(refresh.access_token)

    #     if user.is_staff == True:
    #         token['isAdmin'] = user.is_staff

    #     return token

    # Get all the info along with token
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for key, value in serializer.items():

            data[key] = value

            if data[key] == False:
                del data[key]
                data['user_type'] = "customer"

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Create a register user view


@api_view(['POST'])
def registerUser(request):
    data = request.data

    try:
        if data['name'] == '':
            message = {'detail': "Name field should not be empty."}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        elif data['email'] == '':
            message = {'detail': "Email field should not be empty."}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        elif data['password'] == '':
            message = {'detail': "Password field should not be empty."}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        else:
            if (re.match(regex, data['email'])):
                user = User.objects.create(
                    first_name=data['name'],
                    username=data['email'],
                    email=data['email'],
                    password=make_password(data['password'])
                )
                serializer = UserSerializerWithToken(user, many=False)
                return Response(serializer.data)
            else:
                message = {'detail': "Please enter the valid email address."}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)
    except:
        message = {'detail': "User can not be created from these credentials."}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])
    if data['name'] == '':
        message = {'detail': "Name field should not be empty."}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    elif data['email'] == '':
        message = {'detail': "Email field should not be empty."}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    else:
        if (re.match(regex, data['email'])):
            user.save()
            return Response(serializer.data)
        else:
            message = {'detail': "Please enter the valid email address."}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = User.objects.get(id=pk)

    data = request.data

    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['isAdmin']

    if data['name'] == '':
        message = {'detail': "Name field should not be empty."}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    if data['name'] == '':
        message = {'detail': "Name field should not be empty."}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    elif data['email'] == '':
        message = {'detail': "Email field should not be empty."}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    else:
        if (re.match(regex, data['email'])):
            user.save()
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data)
        else:
            message = {'detail': "Please enter the valid email address."}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response("User Was Deleted Successfully.")
