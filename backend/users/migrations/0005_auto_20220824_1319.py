# Generated by Django 3.2.15 on 2022-08-24 10:19

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_alter_newuser_birthday'),
    ]

    operations = [
        migrations.AlterField(
            model_name='newuser',
            name='birthday',
            field=models.DateTimeField(default=datetime.datetime(1800, 1, 1, 0, 0)),
        ),
        migrations.AlterField(
            model_name='newuser',
            name='username',
            field=models.CharField(blank=True, max_length=150, unique=True),
        ),
    ]