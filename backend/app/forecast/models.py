import uuid
from django.db import models
from django.contrib.auth.models import User


class Item(models.Model):
    no = models.CharField(max_length=20, primary_key=True)
    key = models.UUIDField(default=uuid.uuid4())
    description = models.CharField(max_length=100, null=True, blank=True)
    base_unit_of_measure_code = models.ForeignKey(
        'UnitOfMeasure', on_delete=models.SET_NULL, blank=True, null=True)
    kb_sd = models.CharField(max_length=20, null=True, blank=True)
    model = models.CharField(max_length=20, null=True, blank=True)
    search_name = models.CharField(max_length=100, null=True, blank=True)
    item_category_code = models.ForeignKey(
        'ItemCategory', on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return self.no

    def save(self, *args, **kwargs):
        self.no = self.no.upper()
        if self.description is not None:
            self.search_name = self.description.upper()
        super().save(*args, **kwargs)

    class Meta:
        db_table = ''
        managed = True
        verbose_name = 'Item'
        verbose_name_plural = 'Items'


class UnitOfMeasure(models.Model):
    key = models.UUIDField(default=uuid.uuid4())
    code = models.CharField(max_length=20, primary_key=True)
    description = models.CharField(max_length=50, blank=True, null=True)
    quantity_per = models.DecimalField(
        max_digits=10, decimal_places=2, default=1)

    def __str__(self):
        return '{}'.format(self.code)

    def save(self, *args, **kwargs):
        self.code = self.code.upper()
        super().save(*args, **kwargs)

    class Meta:
        db_table = ''
        managed = True
        verbose_name = 'Unit Of Measure'
        verbose_name_plural = 'Unit Of Measures'


class ItemCategory(models.Model):
    key = models.UUIDField(default=uuid.uuid4())
    code = models.CharField(max_length=20, primary_key=True)
    description = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return '{}'.format(self.code)

    def save(self, *args, **kwargs):
        self.code = self.code.upper()
        super().save(*args, **kwargs)

    class Meta:
        db_table = ''
        managed = True
        verbose_name = 'Item Category'
        verbose_name_plural = 'Item Categories'


class Vendor(models.Model):
    no = models.CharField(max_length=20, primary_key=True)
    key = models.UUIDField(default=uuid.uuid4())
    name = models.CharField(max_length=100, null=True, blank=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    address_2 = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    post_code = models.CharField(max_length=50, null=True, blank=True)
    phone_no = models.CharField(max_length=150, blank=True, null=True)
    email = models.EmailField(null=True, blank=True)
    search_name = models.CharField(max_length=100, blank=True, null=True)
    contact_no = models.ForeignKey(
        'Contact', on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return '{}'.format(self.no)

    def save(self, *args, **kwargs):
        self.no = self.no.upper()
        if (self.name is not None):
            self.search_name = self.name.upper()
        super().save(*args, **kwargs)

    class Meta:
        db_table = ''
        managed = True
        verbose_name = 'Vendor'
        verbose_name_plural = 'Vendors'


class Contact(models.Model):
    key = models.UUIDField(default=uuid.uuid4())
    no = models.CharField(max_length=20, primary_key=True)
    description = models.CharField(max_length=100, blank=True, null=True)
    persons = models.ManyToManyField('Person', blank=True)

    def __str__(self):
        return '{}'.format(self.no)

    def save(self, *args, **kwargs):
        self.no = self.no.upper()
        super().save(*args, **kwargs)

    class Meta:
        db_table = ''
        managed = True
        verbose_name = 'Contact'
        verbose_name_plural = 'Contacts'


class Person(models.Model):
    key = models.UUIDField(default=uuid.uuid4())
    no = models.CharField(max_length=20, primary_key=True)
    contact_no = models.ForeignKey(
        Contact, on_delete=models.SET_NULL, blank=True, null=True)
    first_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    nick_name = models.CharField(max_length=100, blank=True, null=True)
    email_address = models.EmailField(blank=True, null=True)
    phones = models.ManyToManyField('Phone', blank=True)

    def __str__(self):
        return '{} : {}  ({})'.format(self.no, self.first_name, self.nick_name)

    def save(self, *args, **kwargs):
        self.no = self.no.upper()
        super().save(*args, **kwargs)

    class Meta:
        db_table = ''
        managed = True
        verbose_name = 'Person'
        verbose_name_plural = 'Persons'


class Phone(models.Model):
    key = models.UUIDField(default=uuid.uuid4())
    PHONE_TYPE = [('HOME', 'Home'), ('MOBILE', 'Mobile')]
    no = models.CharField(max_length=10, primary_key=True)
    type = models.CharField(
        max_length=10, choices=PHONE_TYPE, default='MOBILE')
    owner = models.CharField(max_length=150, blank=True, null=True)

    def __str__(self):
        return self.no

    class Meta:
        db_table = ''
        managed = True
        verbose_name = 'Phone'
        verbose_name_plural = 'Phones'


class JournalBatch(models.Model):
    key = models.UUIDField(default=uuid.uuid4())
    name = models.CharField(max_length=50, primary_key=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.name = self.name.upper()
        super().save(*args, **kwargs)

    class Meta:
        db_table = ''
        managed = True
        verbose_name = 'Journal Batch'
        verbose_name_plural = 'Journal Batches'


class MRPJournalBatch(models.Model):
    key = models.UUIDField(default=uuid.uuid4())
    batch_name = models.ForeignKey(JournalBatch, on_delete=models.CASCADE)
    journal_line = models.ManyToManyField(
        'MRPJournalLine', blank=True)
    vendor = models.ManyToManyField(
        'VendorForecastBatch', blank=True)

    def __str__(self):
        return '{}'.format(self.batch_name)

    class Meta:
        db_table = ''
        managed = True
        verbose_name = 'MRP Journal Batch'
        verbose_name_plural = 'MRP Journal Batches'


class VendorForecastBatch(models.Model):
    key = models.UUIDField(default=uuid.uuid4())
    batch_name = models.ForeignKey(JournalBatch, on_delete=models.CASCADE)
    vendor_no = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    vendor_name = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return '{}:{}'.format(self.batch_name, self.vendor_no)

    def save(self, *args, **kwargs):
        self.vendor_name = self.vendor_no.name
        super().save(*args, **kwargs)

    class Meta:
        db_table = ''
        managed = True
        verbose_name = 'Vendor Forecast Batch'
        verbose_name_plural = 'Vendor Forecast Batches'
        ordering = ['vendor_no']


class MRPJournalLine(models.Model):
    key = models.UUIDField(default=uuid.uuid4())
    item_no = models.ForeignKey('Item', on_delete=models.CASCADE)
    journal_batch = models.ForeignKey(
        JournalBatch, on_delete=models.CASCADE, blank=True, null=True)
    description = models.CharField(max_length=150, null=True, blank=True)
    kb_sd = models.CharField(max_length=20, null=True, blank=True)
    due_date = models.DateField(null=True, blank=True)
    quantity = models.DecimalField(max_digits=18, decimal_places=8)
    unit_of_measure_code = models.CharField(
        max_length=20, null=True, blank=True)
    vendor_no = models.ForeignKey('Vendor', on_delete=models.CASCADE)
    vendor_name = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return '{} : {} {} {}'.format(self.journal_batch, self.item_no, self.quantity, self.unit_of_measure_code)

    def save(self, *args, **kwargs):
        self.vendor_name = self.vendor_no.name
        super().save(*args, **kwargs)

    class Meta:
        db_table = ''
        managed = True
        verbose_name = 'MRP Journal Line'
        verbose_name_plural = 'MRP Journal Lines'
        ordering = ['vendor_no']


class VendorForecast(models.Model):
    key = models.UUIDField(default=uuid.uuid4())
    description = models.CharField(max_length=150, blank=True, null=True)
    vendor_no = models.ForeignKey(
        Vendor, on_delete=models.CASCADE)
    vendor_name = models.CharField(max_length=100, blank=True, null=True)
    starting_period = models.DateField()
    ending_period = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    entries = models.ManyToManyField('VendorForecastEntry', blank=True)

    def __str__(self):
        return self.no

    def save(self, *args, **kwargs):
        self.no = self.no.upper()
        self.vendor_name = self.vendor_no.name
        super().save(*args, **kwargs)

    class Meta:
        db_table = ''
        managed = True
        verbose_name = 'Vendor Forecast'
        verbose_name_plural = 'Vendor Forecasts'
        ordering = ['vendor_no']


class VendorForecastEntry(models.Model):
    key = models.UUIDField(default=uuid.uuid4())
    vendor_no = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    item_no = models.ForeignKey(Item, on_delete=models.CASCADE)
    description = models.CharField(max_length=150, null=True, blank=True)
    kb_sd = models.CharField(max_length=20, null=True, blank=True)
    unit_of_measure = models.CharField(max_length=20, null=True, blank=True)
    m1_qty = models.DecimalField(max_digits=18, decimal_places=8)
    m2_qty = models.DecimalField(max_digits=18, decimal_places=8)
    m3_qty = models.DecimalField(max_digits=18, decimal_places=8)
    m4_qty = models.DecimalField(max_digits=18, decimal_places=8)
    approved = models.BooleanField()
    apporved_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_created=True)
    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        pass

    @property
    def vendor_name(self):
        vendor = Vendor.objects.get(pk=self.vendor_no)
        if vendor is not None:
            return '{}'.format(vendor.name)
        return ''

    class Meta:
        db_table = ''
        managed = True
        verbose_name = 'Vendor Forecast Entry'
        verbose_name_plural = 'Vendor Forecast Entries'
