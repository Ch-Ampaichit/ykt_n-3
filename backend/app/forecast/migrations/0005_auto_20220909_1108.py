# Generated by Django 3.2.1 on 2022-09-09 04:08

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('forecast', '0004_auto_20220909_1053'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='key',
            field=models.UUIDField(default=uuid.UUID('48dbd278-b9b4-47bf-91bc-32679186b94b')),
        ),
        migrations.AlterField(
            model_name='mrpjournalline',
            name='item_no',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='forecast.item'),
        ),
        migrations.AlterField(
            model_name='mrpjournalline',
            name='journal_batch',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='forecast.journalbatch'),
        ),
        migrations.AlterField(
            model_name='mrpjournalline',
            name='key',
            field=models.UUIDField(default=uuid.UUID('a0a8d5fa-a86d-4161-b0bc-c5fcbfdad33d')),
        ),
    ]