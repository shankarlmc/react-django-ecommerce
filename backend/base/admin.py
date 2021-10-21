from django.contrib import admin
from .models import (
    Brand,
    Category,
    subCategory,
    Product,
    Review,
    Order,
    OrderItem,
    ShippingAddress,
)


class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'sub_category', 'brand', 'countInStock']


# Register your models here.
admin.site.register(Product, ProductAdmin)
admin.site.register(Category)
admin.site.register(subCategory)
admin.site.register(Brand)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
