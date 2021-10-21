from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from base.serializers import (
    ProductSerializer,
    subCategorySerializer,
)
from base.models import Product, Review, Brand, Category, subCategory

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
import re
# Create your views here.


# List of all the products
@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('q')
    if query == None:
        query = ''
    products = Product.objects.order_by(
        '-createdAt').filter(name__icontains=query)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# List of all the products
@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# Create a product
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    data = request.data
    print(data['name'] in data)
    if data['name'] == '':
        message = {'detail': "Product name should not be empty."}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    elif data['price'] == '':
        message = {'detail': "Product price should not be empty."}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    elif data['countInStock'] == '':
        message = {'detail': "Number of stocks should not be empty."}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    elif data['image'] == '':
        message = {'detail': "Product Image should not be empty."}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    elif data['brand'] == '':
        message = {'detail': "Product brand should not be empty."}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    elif data['category'] == '':
        message = {'detail': "Product category should not be empty."}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    elif data['description'] == '':
        message = {'detail': "Product description should not be empty."}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    else:
        product = Product.objects.create(
            user=user,
            name=data['name'],
            price=data['price'],
            brand=data['brand'],
            countInStock=data['countInStock'],
            image=data['image'],
            category=data['category'],
            description=data['description'],
        )

        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)


# Product details
@api_view(['GET'])
def getProductDetails(request, slug):
    product = Product.objects.get(slug=slug)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getProductBySubCategory(request, subcategory):
    subCat = subCategory.objects.filter(slug=subcategory)
    # product = Product.objects.filter(sub_category=subCat)
    serializer = subCategorySerializer(subCat, many=True)
    return Response(serializer.data)


# Create a product


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = Brand.objects.get(_id=data['brand'])
    product.category = Category.objects.get(_id=data['category'])
    product.countInStock = data['countInStock']
    product.description = data['description']

    product.save()

    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)


# Image uploader
@api_view(['POST'])
def uploadImage(request):
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)
    product.image = request.FILES.get('image')
    product.save()
    return Response("Image Uploaded Successfully.")


# Delete Product
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    productName = product.name
    product.delete()
    message = {'detail': productName+" Was Deleted Successfully."}
    return Response(message, status=status.HTTP_201_CREATED)


# Product review
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # 1 - If Review already exist for this user
    alreadyExist = product.review_set.filter(user=user).exists()

    if alreadyExist:
        message = {'detail': " Product already reviewed."}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    # 2 - No rating or 0
    elif data['rating'] == 0:
        message = {'detail': "Please select a rating."}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    # 3 -  Crate Review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment']
        )
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        message = {'detail': "Review added successfylly."}
        return Response(message, status=status.HTTP_201_CREATED)
