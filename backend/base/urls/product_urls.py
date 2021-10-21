from django.urls import path
from base.views import product_views as views

# Urlpatterns for the prodct items
urlpatterns = [
    path('',
         views.getProducts,
         name="products"
         ),
    path('<str:slug>',
         views.getProductDetails,
         name="product-details"
         ),
    path('category/<str:subcategory>', views.getProductBySubCategory,
         name="products-by-subcategory"),
    path('create/',
         views.createProduct,
         name="product-create"
         ),
    path('upload/',
         views.uploadImage,
         name="product-image-upload"
         ),
    path('update/<str:pk>/',
         views.updateProduct,
         name="update-product"
         ),
    path('<str:pk>/reviews/',
         views.createProductReview,
         name="create-product-review"
         ),
    path('top/',
         views.getTopProducts,
         name="top-products"
         ),
    path('delete/<str:pk>',
         views.deleteProduct,
         name="delete-product"
         ),
]
