# Generated by Django 3.2.1 on 2022-09-14 03:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('forecast', '0010_auto_20220911_2154'),
    ]

    operations = [
        migrations.CreateModel(
            name='PostedVendorForecastHeader',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_created=True)),
                ('key', models.UUIDField(default=uuid.UUID('76640931-f9d5-421c-891a-f81cc07d1e00'))),
                ('description', models.CharField(blank=True, max_length=150, null=True)),
                ('vendor_name', models.CharField(blank=True, max_length=100, null=True)),
                ('starting_period', models.DateField()),
                ('ending_period', models.DateField()),
                ('approved', models.BooleanField()),
                ('apporved_at', models.DateTimeField()),
                ('approved_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='approved-vendor-forecast+', to=settings.AUTH_USER_MODEL)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Vendor Forecast',
                'verbose_name_plural': 'Vendor Forecasts',
                'db_table': '',
                'ordering': ['vendor_no'],
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='PostedVendorForecastLine',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.UUIDField(default=uuid.UUID('cf3778e9-a6ca-4e2b-80b9-029fa800c526'))),
                ('description', models.CharField(blank=True, max_length=150, null=True)),
                ('kb_sd', models.CharField(blank=True, max_length=20, null=True)),
                ('unit_of_measure', models.CharField(blank=True, max_length=20, null=True)),
                ('m1_qty', models.DecimalField(decimal_places=4, default=0, max_digits=18)),
                ('m2_qty', models.DecimalField(decimal_places=4, default=0, max_digits=18)),
                ('m3_qty', models.DecimalField(decimal_places=4, default=0, max_digits=18)),
                ('m4_qty', models.DecimalField(decimal_places=4, default=0, max_digits=18)),
            ],
            options={
                'verbose_name': 'Vendor Forecast Entry',
                'verbose_name_plural': 'Vendor Forecast Entries',
                'db_table': '',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='VendorForecastHeader',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_created=True)),
                ('key', models.UUIDField(default=uuid.UUID('0918efa9-d138-4d4f-be5d-c4192b6e8355'))),
                ('description', models.CharField(blank=True, max_length=150, null=True)),
                ('vendor_name', models.CharField(blank=True, max_length=100, null=True)),
                ('starting_period', models.DateField()),
                ('ending_period', models.DateField()),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Vendor Forecast Header',
                'verbose_name_plural': 'Vendor Forecasts Header',
                'db_table': '',
                'ordering': ['vendor_no'],
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='VendorForecastLine',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.UUIDField(default=uuid.UUID('140c4ed5-417a-42fc-819e-a45eae535256'))),
                ('description', models.CharField(blank=True, max_length=150, null=True)),
                ('kb_sd', models.CharField(blank=True, max_length=20, null=True)),
                ('unit_of_measure', models.CharField(blank=True, max_length=20, null=True)),
                ('m1_qty', models.DecimalField(decimal_places=4, default=0, max_digits=18)),
                ('m2_qty', models.DecimalField(decimal_places=4, default=0, max_digits=18)),
                ('m3_qty', models.DecimalField(decimal_places=4, default=0, max_digits=18)),
                ('m4_qty', models.DecimalField(decimal_places=4, default=0, max_digits=18)),
            ],
            options={
                'verbose_name': 'Vendor Forecast Line',
                'verbose_name_plural': 'Vendor Forecast Lines',
                'db_table': '',
                'managed': True,
            },
        ),
        migrations.RemoveField(
            model_name='vendorforecastentry',
            name='created_by',
        ),
        migrations.RemoveField(
            model_name='vendorforecastentry',
            name='item_no',
        ),
        migrations.RemoveField(
            model_name='vendorforecastentry',
            name='vendor_no',
        ),
        migrations.AlterField(
            model_name='contact',
            name='key',
            field=models.UUIDField(default=uuid.UUID('427744f0-5ab1-44f5-b01b-421bb0ad74f0')),
        ),
        migrations.AlterField(
            model_name='item',
            name='key',
            field=models.UUIDField(default=uuid.UUID('ab54d1dc-c52b-4deb-afd3-e02b133a8cfb')),
        ),
        migrations.AlterField(
            model_name='itemcategory',
            name='key',
            field=models.UUIDField(default=uuid.UUID('320bf2f7-c1b8-4b5e-aead-48adf7a485fe')),
        ),
        migrations.AlterField(
            model_name='journalbatch',
            name='key',
            field=models.UUIDField(default=uuid.UUID('91ebbc12-9922-45e0-9ea6-61e42a9d8225')),
        ),
        migrations.AlterField(
            model_name='mrpjournalbatch',
            name='key',
            field=models.UUIDField(default=uuid.UUID('16ac00f6-f385-4e7b-92ac-127f5253fc3b')),
        ),
        migrations.AlterField(
            model_name='mrpjournalline',
            name='key',
            field=models.UUIDField(default=uuid.UUID('8cc468c0-a765-48de-8f91-44ab4c4a7210')),
        ),
        migrations.AlterField(
            model_name='person',
            name='key',
            field=models.UUIDField(default=uuid.UUID('feaed85f-1d39-4dff-8a95-0b61fb5719ba')),
        ),
        migrations.AlterField(
            model_name='phone',
            name='key',
            field=models.UUIDField(default=uuid.UUID('eb175ba4-da2f-4604-a8e9-c67cca0f3ea0')),
        ),
        migrations.AlterField(
            model_name='unitofmeasure',
            name='key',
            field=models.UUIDField(default=uuid.UUID('4390a553-7c4b-464c-abdf-a0a7a461d754')),
        ),
        migrations.AlterField(
            model_name='vendor',
            name='key',
            field=models.UUIDField(default=uuid.UUID('b7ca196d-acf4-415b-92ed-a08b4087e6a9')),
        ),
        migrations.AlterField(
            model_name='vendorforecastbatch',
            name='key',
            field=models.UUIDField(default=uuid.UUID('a80326ba-215b-4819-bab7-4cef13f5139c')),
        ),
        migrations.DeleteModel(
            name='VendorForecast',
        ),
        migrations.DeleteModel(
            name='VendorForecastEntry',
        ),
        migrations.AddField(
            model_name='vendorforecastline',
            name='item_no',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='forecast.item'),
        ),
        migrations.AddField(
            model_name='vendorforecastline',
            name='vendor_no',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='forecast.vendor'),
        ),
        migrations.AddField(
            model_name='vendorforecastheader',
            name='entries',
            field=models.ManyToManyField(blank=True, to='forecast.VendorForecastLine'),
        ),
        migrations.AddField(
            model_name='vendorforecastheader',
            name='vendor_no',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vendor-forecast+', to='forecast.vendor'),
        ),
        migrations.AddField(
            model_name='postedvendorforecastline',
            name='item_no',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='forecast.item'),
        ),
        migrations.AddField(
            model_name='postedvendorforecastline',
            name='vendor_no',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='forecast.vendor'),
        ),
        migrations.AddField(
            model_name='postedvendorforecastheader',
            name='entries',
            field=models.ManyToManyField(blank=True, to='forecast.PostedVendorForecastLine'),
        ),
        migrations.AddField(
            model_name='postedvendorforecastheader',
            name='vendor_no',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posted-vendor-forecast+', to='forecast.vendor'),
        ),
    ]