from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from base.serializers import (
    CategorySerializer,
)
from base.models import Category


from rest_framework import status
# Create your views here.


# List of all the categories
@api_view(['GET'])
def getCategories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


# Product details
@api_view(['GET'])
def getCategoryDetails(request, slug):
    category = Category.objects.get(slug=slug)
    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)


# Create a product
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createCategory(request):
    data = request.data

    if data['name'] == '':
        message = {'detail': "Category name should not be empty."}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    else:
        category = Category.objects.create(
            name=data['name'],
        )
        serializer = CategorySerializer(category, many=False)
        return Response(serializer.data)


# Create a product
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateCategory(request, pk):
    data = request.data
    category = Category.objects.get(_id=pk)

    category.name = data['name']
    category.save()

    serializer = CategorySerializer(category, many=False)

    return Response(serializer.data)


# Delete Category
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteCategory(request, pk):
    category = Category.objects.get(_id=pk)
    cat_name = category.name
    category.delete()
    message = {'detail': cat_name+" Was Deleted Successfully."}
    return Response(message, status=status.HTTP_201_CREATED)
