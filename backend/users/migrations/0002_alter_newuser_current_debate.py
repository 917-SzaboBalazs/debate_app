# Generated by Django 3.2.15 on 2022-08-22 17:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('debate', '0001_initial'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='newuser',
            name='current_debate',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='debate.debate'),
        ),
    ]
