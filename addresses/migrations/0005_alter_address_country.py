# Generated by Django 5.0.4 on 2024-10-03 10:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('addresses', '0004_alter_address_country'),
    ]

    operations = [
        migrations.AlterField(
            model_name='address',
            name='country',
            field=models.CharField(default='Nigeria', max_length=225),
        ),
    ]
