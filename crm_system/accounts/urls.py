from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('products/', views.products, name='product'),
    path('customer/<str:pk>/', views.customer, name='customer'),

    path('order/update/', views.update_order, name='update'),
    path('order/remove/<str:pk>/', views.remove_order, name='remove'),

    path('customer/update/<str:pk>/', views.update_customer, name='update_cus'),
    path('customer/remove/<str:pk>/', views.remove_customer, name='remove_cus'),

    path('order/getdata/<str:pk>/', views.order_getdata, name='order_getdata'),
]
