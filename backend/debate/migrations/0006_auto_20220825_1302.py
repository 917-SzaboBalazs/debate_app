# Generated by Django 3.2.15 on 2022-08-25 10:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('debate', '0005_debate_has_chair'),
    ]

    operations = [
        migrations.AlterField(
            model_name='debate',
            name='has_chair',
            field=models.BooleanField(),
        ),
        migrations.AlterField(
            model_name='debate',
            name='no_judges',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='debate',
            name='team_size',
            field=models.IntegerField(),
        ),
    ]
