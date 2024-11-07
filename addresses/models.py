from django.db import models
from accounts.models import CustomUser as User


class Country(models.Model):
    title = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.title


class State(models.Model):
    title = models.CharField(max_length=50, unique=True)
    # country = models.ForeignKey(Country, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class LGA(models.Model):
    title = models.CharField(max_length=50, unique=True)
    state = models.ForeignKey(State, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Address(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=225)
    country = models.CharField(max_length=225, default='Nigeria')
    state = models.ForeignKey(State, on_delete=models.CASCADE)
    lga = models.ForeignKey(LGA, on_delete=models.CASCADE)
    # state = models.CharField(max_length=225)
    # lga = models.CharField(max_length=225)

    def __str__(self):
        return self.address
