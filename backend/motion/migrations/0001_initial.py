# Generated by Django 3.2.15 on 2023-08-05 12:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Motion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text_in_hungarian', models.CharField(blank=True, help_text='Motion text in hungarian', max_length=256, null=True)),
                ('text_in_english', models.CharField(blank=True, help_text='Motion text in english', max_length=256, null=True)),
            ],
        ),
    ]
