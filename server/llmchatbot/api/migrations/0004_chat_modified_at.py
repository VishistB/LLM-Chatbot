# Generated by Django 5.1 on 2024-11-04 21:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_message_sender'),
    ]

    operations = [
        migrations.AddField(
            model_name='chat',
            name='modified_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
