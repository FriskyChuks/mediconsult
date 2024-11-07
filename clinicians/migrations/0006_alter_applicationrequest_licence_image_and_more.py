# Generated by Django 5.0.4 on 2024-09-10 10:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clinicians', '0005_remove_clinician_licence_expiry_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='applicationrequest',
            name='licence_image',
            field=models.ImageField(blank=True, null=True, upload_to='images/licence/'),
        ),
        migrations.DeleteModel(
            name='Clinician',
        ),
    ]
