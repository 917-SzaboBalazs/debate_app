# Generated by Django 3.2.15 on 2022-12-03 09:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('motion', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='motion',
            name='selected_times',
        ),
    ]
