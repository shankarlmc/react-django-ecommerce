from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v0.1/users/', include('base.urls.user_urls')),
    path('api/v0.1/products/', include('base.urls.product_urls')),
    path('api/v0.1/orders/', include('base.urls.order_urls')),
    path('api/v0.1/categories/', include('base.urls.category_urls')),
    path('api/v0.1/brands/', include('base.urls.brand_urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
