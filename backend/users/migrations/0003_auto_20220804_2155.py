# Generated by Django 3.2.15 on 2022-08-04 18:55

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_newuser_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='newuser',
            name='birthday',
            field=models.DateField(default=datetime.datetime(1, 1, 1, 0, 0)),
        ),
        migrations.AlterField(
            model_name='newuser',
            name='first_name',
            field=models.CharField(default='undefined', max_length=150),
        ),
        migrations.AlterField(
            model_name='newuser',
            name='last_name',
            field=models.CharField(default='undefined', max_length=150),
        ),
    ]