# Generated by Django 5.1.2 on 2024-11-05 10:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("server", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="server",
            name="description",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
