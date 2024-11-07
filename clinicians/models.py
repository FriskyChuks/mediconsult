from django.db import models
from accounts.models import CustomUser as User


APPLICATION_STATUS = (
    ('pending', 'Pending'),
    ('approved', 'Approved'),
    ('declined', 'Declined'),
)


class Category(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title


class ApplicationRequest(models.Model):
    applicant = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    body = models.TextField()
    status = models.CharField(
        max_length=15, choices=APPLICATION_STATUS, default='pending')
    licence_number = models.CharField(max_length=50)
    licence_expiry_date = models.DateField()
    licence_image = models.ImageField(
        upload_to='images/licence/', blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.applicant.email
