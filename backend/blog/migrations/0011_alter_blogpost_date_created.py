# Generated by Django 3.2.15 on 2023-08-15 12:47

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0010_alter_blogpost_date_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpost',
            name='date_created',
            field=models.DateField(blank=True, default=datetime.datetime.today),
        ),
    ]