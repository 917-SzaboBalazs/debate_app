# Generated by Django 3.2.15 on 2022-12-02 10:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_alter_newuser_birthday'),
    ]

    operations = [
        migrations.AddField(
            model_name='newuser',
            name='is_guest',
            field=models.BooleanField(default=False),
        ),
    ]
