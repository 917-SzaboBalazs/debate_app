# Generated by Django 3.2.15 on 2022-08-23 22:39

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_newuser_start_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='newuser',
            name='birthday',
            field=models.DateTimeField(default=datetime.datetime(1, 1, 1, 0, 0)),
        ),
    ]