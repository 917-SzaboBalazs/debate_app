# Generated by Django 3.2.15 on 2022-08-25 10:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('debate', '0006_auto_20220825_1302'),
    ]

    operations = [
        migrations.AlterField(
            model_name='debate',
            name='has_chair',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='debate',
            name='no_judges',
            field=models.IntegerField(default=1),
        ),
    ]