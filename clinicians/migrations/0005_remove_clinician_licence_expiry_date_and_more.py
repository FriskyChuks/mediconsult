# Generated by Django 5.0.4 on 2024-09-09 15:55

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clinicians', '0004_alter_applicationrequest_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='clinician',
            name='licence_expiry_date',
        ),
        migrations.RemoveField(
            model_name='clinician',
            name='licence_image',
        ),
        migrations.AddField(
            model_name='applicationrequest',
            name='licence_expiry_date',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='applicationrequest',
            name='licence_image',
            field=models.ImageField(blank=True, null=True, upload_to='licence/'),
        ),
    ]
