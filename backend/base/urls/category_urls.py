from django.urls import path
from base.views import category_views as views

# urls for category and subcategory

# Urlpatterns for the prodct items
urlpatterns = [
    path('',
         views.getCategories,
         name="categories"
         ),
    path('create/',
         views.createCategory,
         name="category-create"
         ),
    path('update/<str:pk>/',
         views.updateCategory,
         name="update-category"
         ),
    path('delete/<str:pk>',
         views.deleteCategory,
         name="delete-category"
         ),
]
