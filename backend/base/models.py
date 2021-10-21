from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE
from django.utils.text import slugify
# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=150, null=True, blank=True)
    slug = models.SlugField(blank=True, editable=False)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Category, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "categories"


class subCategory(models.Model):
    category = models.ForeignKey(Category, on_delete=CASCADE, null=True)
    name = models.CharField(max_length=150, null=True, blank=True)
    slug = models.SlugField(blank=True, editable=False, unique=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(subCategory, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "sub categories"


class Brand(models.Model):
    subCategory = models.ForeignKey(subCategory, on_delete=CASCADE, null=True)
    name = models.CharField(max_length=150, null=True, blank=True)
    slug = models.SlugField(blank=True, editable=False)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Brand, self).save(*args, **kwargs)

    @property
    def subCategory_name(self):
        return self.subCategory.name


# Product model


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=254, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True)
    sub_category = models.ForeignKey(
        subCategory, on_delete=models.SET_NULL, null=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(blank=True, unique=True, editable=False)
    _id = models.AutoField(primary_key=True, editable=False)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Product, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

    @property
    def category_name(self):
        return self.sub_category.category.name

    @property
    def category_slug(self):
        return self.sub_category.category.slug

    @property
    def sub_category_name(self):
        return self.sub_category.name

    @property
    def sub_category_slug(self):
        return self.sub_category.slug

    @property
    def brand_name(self):
        return self.brand.name

    @property
    def brand_slug(self):
        return self.brand.slug


# Review Model
class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=254, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return f"{self.name} Rated on -> {self.product.name}"

# Order Model


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    paymentMethod = models.CharField(max_length=100, null=True, blank=True)
    taxPrice = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)

# Order Items model


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=250, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)

# Shipping Address Model


class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    address = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)
    phoneNum = models.CharField(max_length=15, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.address

    class Meta:
        verbose_name_plural = "shipping addresses"
