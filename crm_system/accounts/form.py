from django.forms import ModelForm
from .models import Customer, Order, Product

class CustomerForm(ModelForm):
    class Meta:
        model=Customer
        fields='__all__'


class OrderForm(ModelForm):
    class Meta:
        model=Order
        fields='__all__'


class ProductForm(ModelForm):
    class Meta:
        model=Product
        fields='__all__'