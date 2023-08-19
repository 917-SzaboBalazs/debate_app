# Generated by Django 3.2.15 on 2023-08-17 14:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('debate', '0002_alter_debate_speaker_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='debate',
            name='result',
            field=models.CharField(blank=True, help_text='Stores the result of the debate. Default value is <b>NULL</b>.', max_length=200, null=True),
        ),
    ]