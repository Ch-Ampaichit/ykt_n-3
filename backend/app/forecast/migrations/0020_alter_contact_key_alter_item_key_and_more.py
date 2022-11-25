# Generated by Django 4.1.2 on 2022-11-17 07:41

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('forecast', '0019_alter_contact_key_alter_item_key_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contact',
            name='key',
            field=models.UUIDField(default=uuid.UUID('389ec81a-d736-46d9-ac0e-5e898e83e3c4')),
        ),
        migrations.AlterField(
            model_name='item',
            name='key',
            field=models.UUIDField(default=uuid.UUID('bb868dbd-bbb4-4e84-9649-a87a20adf654')),
        ),
        migrations.AlterField(
            model_name='itemcategory',
            name='key',
            field=models.UUIDField(default=uuid.UUID('fc1b9e8d-9ae1-4fa0-874a-e2cb186e5bb9')),
        ),
        migrations.AlterField(
            model_name='journalbatch',
            name='key',
            field=models.UUIDField(default=uuid.UUID('260299f8-2078-4f09-b710-68699ed2d507')),
        ),
        migrations.AlterField(
            model_name='mrpjournalbatch',
            name='key',
            field=models.UUIDField(default=uuid.UUID('498750bb-6742-4df3-83ac-fa84e64aa597')),
        ),
        migrations.AlterField(
            model_name='mrpjournalline',
            name='key',
            field=models.UUIDField(default=uuid.UUID('c57f65aa-1eaf-40ef-a20b-91eda16671e7')),
        ),
        migrations.AlterField(
            model_name='person',
            name='key',
            field=models.UUIDField(default=uuid.UUID('8649df44-bb8c-4a98-a29c-1b31b54f4ccf')),
        ),
        migrations.AlterField(
            model_name='phone',
            name='key',
            field=models.UUIDField(default=uuid.UUID('d4e044b8-957f-4ad2-a56a-a6fac172562b')),
        ),
        migrations.AlterField(
            model_name='postedvendorforecastheader',
            name='key',
            field=models.UUIDField(default=uuid.UUID('28912035-aeac-4fa5-ace9-5586de6bcffc')),
        ),
        migrations.AlterField(
            model_name='postedvendorforecastline',
            name='key',
            field=models.UUIDField(default=uuid.UUID('fbf66405-e49b-44d8-a206-162eca644661')),
        ),
        migrations.AlterField(
            model_name='unitofmeasure',
            name='key',
            field=models.UUIDField(default=uuid.UUID('b271d980-49fc-4109-aa62-653d156d18c0')),
        ),
        migrations.AlterField(
            model_name='vendor',
            name='key',
            field=models.UUIDField(default=uuid.UUID('d1801d64-434e-4266-87a4-f78f845eeabd')),
        ),
        migrations.AlterField(
            model_name='vendorforecastbatch',
            name='key',
            field=models.UUIDField(default=uuid.UUID('be45e865-48be-47c0-b918-f1ec222b1813')),
        ),
        migrations.AlterField(
            model_name='vendorforecastheader',
            name='key',
            field=models.UUIDField(default=uuid.UUID('740ae807-ebce-4703-abdb-41da461c123d')),
        ),
        migrations.AlterField(
            model_name='vendorforecastline',
            name='key',
            field=models.UUIDField(default=uuid.UUID('afa5f9ae-efca-4ee3-b66e-ad69c52b3c22')),
        ),
    ]