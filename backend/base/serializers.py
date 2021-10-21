from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Order, Product, OrderItem, ShippingAddress, Review, Brand, subCategory
from rest_framework_simplejwt.tokens import RefreshToken


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    sub_categories = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Category
        fields = "__all__"

    def get_sub_categories(self, obj):
        sub_categories = obj.subcategory_set.all()
        serializer = subCatSerializer(sub_categories, many=True)
        return serializer.data


class subCatSerializer(serializers.ModelSerializer):
    available_products = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Brand
        fields = ["_id", "name", "slug", "available_products"]

    def get_available_products(self, obj):
        available_products = obj.product_set.all()
        return len(available_products)


class subCategorySerializer(serializers.ModelSerializer):
    brands = serializers.SerializerMethodField(read_only=True)
    products = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = subCategory
        fields = "__all__"

    def get_brands(self, obj):
        brands = obj.brand_set.all()
        serializer = BrandSerializer(brands, many=True)
        return serializer.data

    def get_products(self, obj):
        products = obj.product_set.all()
        serializer = ProductSerializer(products, many=True)
        return serializer.data


class BrandSerializer(serializers.ModelSerializer):
    available_products = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Brand
        fields = ["_id", "name", "slug", "available_products"]

    def get_available_products(self, obj):
        available_products = obj.product_set.all()
        return len(available_products)


class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    category_name = serializers.ReadOnlyField()
    sub_category_name = serializers.ReadOnlyField()
    brand_name = serializers.ReadOnlyField()
    category_slug = serializers.ReadOnlyField()
    sub_category_slug = serializers.ReadOnlyField()
    brand_slug = serializers.ReadOnlyField()

    class Meta:
        model = Product
        fields = "__all__"

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = "__all__"

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(
                obj.shippingaddress, many=False).data
        except:
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data
