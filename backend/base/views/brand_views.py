from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from base.serializers import (
    BrandSerializer,
)
from base.models import Brand
from rest_framework import status
# Create your views here.


# List of all the categories
@api_view(['GET'])
def getBrands(request):
    brands = Brand.objects.all()
    serializer = BrandSerializer(brands, many=True)
    return Response(serializer.data)


# list all the brands related with brand name
@api_view(['GET'])
def getBrandsByBrandName(request, brandname):
    brands = Brand.objects.filter(slug=brandname)
    serializer = BrandSerializer(brands, many=True)
    return Response(serializer.data)


# Create a product
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createBrand(request):
    data = request.data

    if data['name'] == '':
        message = {'detail': "Brand name should not be empty."}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    else:
        brand = Brand.objects.create(
            name=data['name'],
        )
        serializer = BrandSerializer(brand, many=False)
        return Response(serializer.data)


# Create a product
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateBrand(request, pk):
    data = request.data
    brand = Brand.objects.get(_id=pk)

    brand.name = data['name']
    brand.save()

    serializer = BrandSerializer(brand, many=False)
    return Response(serializer.data)


# Delete Brand
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteBrand(request, pk):
    brand = Brand.objects.get(_id=pk)
    brand_name = brand.name
    brand.delete()
    message = {'detail': brand_name+" Was Deleted Successfully."}
    return Response(message, status=status.HTTP_201_CREATED)
