from django.db import models
from accounts.models import CustomUser as User


class Order(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    discount = models.DecimalField(
        decimal_places=2, max_digits=12, default=00.00, null=True, blank=True)
    VAT = models.DecimalField(
        decimal_places=2, max_digits=12, default=00.00, null=True, blank=True)
    order_date = models.DateTimeField(auto_now_add=True)
    billed = models.BooleanField(default=False)
    processing = models.BooleanField(default=False)
    dispatch_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.customer} | {self.order_date.date()}"


class OrderDetail(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    item = models.CharField(max_length=225)
    price = models.DecimalField(
        decimal_places=2, max_digits=12, default=00.00, null=True, blank=True)
    quantity = models.IntegerField(default=1)
    available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.item} ({self.quantity}) | {self.price}"


# class Cart(models.Model):
#     # item = models.ForeignKey(Item, on_delete=models.CASCADE)
#     qty = models.IntegerField(default=1)
#     color = models.CharField(max_length=50, null=True, blank=True)
#     size = models.CharField(max_length=50, null=True, blank=True)
#     created_by = models.ForeignKey(User, on_delete=models.CASCADE)


class DeliveryMode(models.Model):
    title = models.CharField(max_length=20)

    def __str__(self):
        return self.title


class Delivery(models.Model):
    mode = models.ForeignKey(DeliveryMode, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    delivery_status = models.BooleanField(default=False)
    confirmed_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        if self.delivery_status:
            return f"{self.order} ('Delivered')"
        return f"{self.order} ('Pending')"
