# Generated by Django 3.2.15 on 2023-08-05 12:16

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Debate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('entry_code', models.CharField(help_text='Random 4 digits number, uniquely identifies every debate.', max_length=8, unique=True)),
                ('type', models.CharField(default='british', help_text='Default value is <b>british</b>. Other possible values: <b>british</b>.', max_length=50)),
                ('result', models.CharField(blank=True, help_text='Stores the result of the debate.Default value is <b>NULL</b>.', max_length=50, null=True)),
                ('status', models.CharField(default='lobby', help_text='Signals current status of the debate.Default value is <b>lobby</b>. Other possible values: <b>lobby</b> | <b>running</b> | <b>finished</b>.', max_length=50)),
                ('date_time', models.DateTimeField(default=django.utils.timezone.now, help_text='Stores the creation time of the debate.')),
                ('motion', models.CharField(blank=True, help_text='Motion can be generated random fromour database or type manually bythe host. Default value is <b>NULL</b>.', max_length=100, null=True)),
                ('current_number', models.IntegerField(default=1, help_text='Indicates the number of the current speaker.You should increase this when a new debater startsto speak. Default value is <b>1</b>.')),
                ('speaker_time', models.IntegerField(default=6, help_text='Expresses speakers time in minutes. Default value is<b>6</b>.')),
            ],
        ),
    ]
