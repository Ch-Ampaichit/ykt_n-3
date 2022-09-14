# Generated by Django 3.2.1 on 2022-09-08 08:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('forecast', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Menu',
            fields=[
                ('no', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('key', models.CharField(blank=True, max_length=50, null=True)),
                ('title', models.CharField(blank=True, max_length=100, null=True)),
                ('label', models.CharField(blank=True, max_length=100, null=True)),
                ('icon', models.CharField(blank=True, max_length=100, null=True)),
                ('disabled', models.BooleanField(default=False)),
                ('danger', models.BooleanField(default=False)),
                ('type', models.CharField(blank=True, choices=[('group', 'group'), ('divider', 'divider')], max_length=10, null=True)),
            ],
            options={
                'verbose_name': 'Menu',
                'verbose_name_plural': 'Menus',
                'db_table': '',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='MenuSuite',
            fields=[
                ('code', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('menus', models.ManyToManyField(blank=True, to='core.Menu')),
            ],
            options={
                'verbose_name': 'Menu Suite',
                'verbose_name_plural': 'Menu Suites',
                'db_table': '',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='SubMenu',
            fields=[
                ('no', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('key', models.CharField(blank=True, max_length=50, null=True)),
                ('title', models.CharField(blank=True, max_length=100, null=True)),
                ('label', models.CharField(blank=True, max_length=100, null=True)),
                ('icon', models.CharField(blank=True, max_length=100, null=True)),
                ('disabled', models.BooleanField(default=False)),
                ('danger', models.BooleanField(default=False)),
                ('type', models.CharField(blank=True, choices=[('group', 'group'), ('divider', 'divider')], max_length=10, null=True)),
                ('children', models.ManyToManyField(blank=True, to='core.Menu')),
            ],
            options={
                'verbose_name': 'Sub Menu',
                'verbose_name_plural': 'Sub Menus',
                'db_table': '',
                'managed': True,
            },
        ),
        migrations.AddField(
            model_name='menu',
            name='children',
            field=models.ManyToManyField(blank=True, to='core.SubMenu'),
        ),
        migrations.CreateModel(
            name='UserSetup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('menu_suite', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.menusuite')),
                ('mrp_jnl_batch', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='forecast.mrpjournalbatch')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='user_setup', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'User Setup',
                'verbose_name_plural': 'User Setups',
                'db_table': '',
                'managed': True,
                'unique_together': {('user',)},
            },
        ),
    ]
