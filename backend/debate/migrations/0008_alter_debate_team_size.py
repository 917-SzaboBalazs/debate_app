# Generated by Django 3.2.15 on 2022-08-25 10:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('debate', '0007_auto_20220825_1346'),
    ]

    operations = [
        migrations.AlterField(
            model_name='debate',
            name='team_size',
            field=models.IntegerField(default=1),
        ),
    ]
