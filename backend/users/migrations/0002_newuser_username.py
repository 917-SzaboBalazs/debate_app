# Generated by Django 3.2.15 on 2022-08-04 18:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='newuser',
            name='username',
            field=models.CharField(default='undefined', max_length=150, unique=True),
            preserve_default=False,
        ),
    ]