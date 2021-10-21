from django.urls import path
from base.views import order_views as views

# Urlpatterns for the prodct items
urlpatterns = [
    path('',
         views.getOrders,
         name="orders"
         ),
    path('add/',
         views.addOrderItems,
         name="orders-add"
         ),
    path('myorders/',
         views.getMyOrders,
         name="my-orders"
         ),
    path('<str:pk>/deliver/',
         views.updateOrderToDelivered,
         name="order-deliver"
         ),
    path('<str:pk>/',
         views.getOrderById,
         name="order-view"
         ),
    path('<str:pk>/pay/',
         views.updateOrderToPaid,
         name="order-pay"
         ),
]
