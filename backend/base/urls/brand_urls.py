from django.urls import path
from base.views import brand_views as views

# Urlpatterns for the prodct items
urlpatterns = [
    path('',
         views.getBrands,
         name="brands"
         ),
    path('create/',
         views.createBrand,
         name="create-brand"
         ),
    path('update/<str:pk>/',
         views.updateBrand,
         name="update-brand"
         ),
    path('delete/<str:pk>',
         views.deleteBrand,
         name="delete-brand"
         ),
    path('<str:brandname>', views.getBrandsByBrandName,
         name="brand-name-related-to-subcategory"),
]
