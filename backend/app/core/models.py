from django.db import models
from django.contrib.auth.models import User
from forecast.models import MRPJournalBatch


class Menu(models.Model):
    no = models.CharField(max_length=50, primary_key=True)
    key = models.CharField(max_length=50, blank=True, null=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    label = models.CharField(max_length=100, blank=True, null=True)
    icon = models.CharField(max_length=100, blank=True, null=True)
    disabled = models.BooleanField(default=False)
    danger = models.BooleanField(default=False)
    type = models.CharField(max_length=10, blank=True,
                            null=True, choices=[('group', 'group'), ('divider', 'divider')])
    children = models.ManyToManyField(
        'SubMenu', blank=True)

    def save(self, *args, **kwargs):
        self.no = self.no.upper()
        self.key = self.key.lower()
        self.label = self.title.capitalize()
        super().save(*args, **kwargs)

    def __str__(self):
        return '{}-{}'.format(self.no, self.key)

    class Meta:
        db_table = ''
        managed = True
        verbose_name = 'Menu'
        verbose_name_plural = 'Menus'
        # ordering = ['odering_no']


class SubMenu(models.Model):
    no = models.CharField(max_length=50, primary_key=True)
    key = models.CharField(max_length=50, blank=True, null=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    label = models.CharField(max_length=100, blank=True, null=True)
    icon = models.CharField(max_length=100, blank=True, null=True)
    disabled = models.BooleanField(default=False)
    danger = models.BooleanField(default=False)
    type = models.CharField(max_length=10, blank=True,
                            null=True, choices=[('group', 'group'), ('divider', 'divider')])
    children = models.ManyToManyField(
        Menu, blank=True)

    def save(self, *args, **kwargs):
        self.no = self.no.upper()
        self.key = self.key.lower()
        self.label = self.title.capitalize()
        super().save(*args, **kwargs)

    def __str__(self):
        return '{}-{}'.format(self.no, self.key)

    class Meta:
        db_table = ''
        managed = True
        verbose_name = 'Sub Menu'
        verbose_name_plural = 'Sub Menus'
        # ordering = ['odering_no']


class MenuSuite(models.Model):
    code = models.CharField(max_length=20, primary_key=True)
    menus = models.ManyToManyField(Menu, blank=True)

    def save(self, *args, **kwargs):
        self.code = self.code.upper()
        super().save(*args, **kwargs)

    def __str__(self):
        return '{}'.format(self.code)

    class Meta:
        db_table = ''
        managed = True
        verbose_name = 'Menu Suite'
        verbose_name_plural = 'Menu Suites'


class UserSetup(models.Model):
    user = models.OneToOneField(
        User, related_name='user_setup', on_delete=models.CASCADE)
    menu_suite = models.ForeignKey(
        MenuSuite, on_delete=models.SET_NULL, blank=True, null=True)
    mrp_jnl_batch = models.ForeignKey(
        MRPJournalBatch, on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return '{}'.format(self.user)

    class Meta:
        db_table = ''
        managed = True
        verbose_name = 'User Setup'
        verbose_name_plural = 'User Setups'
        unique_together = ['user']
