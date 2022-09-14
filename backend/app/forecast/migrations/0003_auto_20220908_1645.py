# Generated by Django 3.2.1 on 2022-09-08 09:45

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('forecast', '0002_auto_20220908_1630'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='key',
            field=models.UUIDField(default=uuid.UUID('d3d2a187-928d-41f5-9072-2d2b929fd69b')),
        ),
        migrations.AlterField(
            model_name='mrpjournalline',
            name='key',
            field=models.UUIDField(default=uuid.UUID('0c798d00-f08d-4bf9-a56b-2cc64a8fd1da')),
        ),
    ]
