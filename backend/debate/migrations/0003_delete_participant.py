# Generated by Django 3.2.15 on 2022-08-23 14:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('debate', '0002_alter_participant_role'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Participant',
        ),
    ]
