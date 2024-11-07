from django.db import models

from accounts.models import CustomUser as User


class Prescription(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer.phone}"


class PrescriptionDetail(models.Model):
    prescription = models.ForeignKey(Prescription, on_delete=models.CASCADE)
    item = models.CharField(max_length=255)
    dose = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.item} {self.dose} {self.prescription.customer.phone}"
