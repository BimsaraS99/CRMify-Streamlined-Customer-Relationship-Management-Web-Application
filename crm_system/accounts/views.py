from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from .models import Customer, Product, Tag, Order
from .form import CustomerForm, OrderForm, ProductForm

# Create your views here.
def home(request):
    orders = Order.objects.all()
    customers = Customer.objects.all()
    total_customers = customers.count()

    form = CustomerForm()
    input_tags = []
    for field in form:
        input_tags.append(field.as_widget())

    form_order = OrderForm()
    
    total_orders = orders.count()
    delivered = orders.filter(status='Delivered').count()
    pending = orders.filter(status='Pending').count()
    #print(form_order)
    contex = {
        'orders':orders,
        'customers':customers,
        'total_customers':total_customers,
        'total_orders':total_orders,
        'delivered':delivered,
        'pending':pending,
        'form':input_tags,
        'form_order':form_order,
        'form_order_for_updates':form_order,
    }

    if request.method == 'POST':
        form = CustomerForm(request.POST)
        form_2 = OrderForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/')
        elif form_2.is_valid():
            form_2.save()
            return redirect('/')

    return render(request, 'accounts/dashboard.html', contex)


def products(request):
    products = Product.objects.all()
    prouct_form = ProductForm()

    input_tags = []
    for field in prouct_form:
        input_tags.append(field.as_widget())

    contex = {
        'products':products,
        'input_tags':input_tags,
    }
    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()

    return render(request, 'accounts/products.html', contex)


def customer(request, pk):
    customer = Customer.objects.get(id=pk)
    form_order = CustomerForm(instance=customer)
    input_tags = []
    for field in form_order:
        input_tags.append(field.as_widget())

    contex = {
        'pk':customer.id,
        'name':customer,
        'phone':customer.phone,
        'email':customer.email,
        'orders':customer.order_set.all(),
        'total_orders':customer.order_set.all().count(),
        'form_order':input_tags,
    }
    return render(request, 'accounts/customer.html', contex)


def order_getdata(request, pk):
    obj = Order.objects.get(id=pk)
    sending = {
        'customer': obj.customer.name if hasattr(obj.customer, 'name') else None,
        'product': obj.product.name if hasattr(obj.product, 'name') else None,
        'status': obj.status if obj.status else None
    }

    return JsonResponse(sending)


def update_order(request):
    if request.method == 'POST':
        form = request.POST
        obj = Order.objects.get(id=form['pk'])

        obj.customer = Customer.objects.get(id=form['customer'])
        obj.product = Product.objects.get(id=form['product'])
        obj.status = form['status']

        obj.save()

    return redirect('home')


def update_customer(request, pk):
    customer = Customer.objects.get(id=pk)
    if request.method == 'POST':
        form = CustomerForm(request.POST, instance=customer)
        if form.is_valid():
            form.save()

    return redirect('customer', pk=pk)


def remove_order(request, pk):
    del_obj = get_object_or_404(Order, id=pk)
    del_obj.delete()
    return redirect('home')
    

def remove_customer(request, pk):
    del_obj = get_object_or_404(Customer, id=pk)
    del_obj.delete()
    return redirect('home')