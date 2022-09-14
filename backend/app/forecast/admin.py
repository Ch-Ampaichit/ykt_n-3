from django.contrib import admin
from .models import Item, UnitOfMeasure, ItemCategory, Vendor, Contact, Person, Phone,  VendorForecastEntry, MRPJournalLine, MRPJournalBatch, JournalBatch, VendorForecastBatch


@admin.register(JournalBatch)
class JournalBatchAdmin(admin.ModelAdmin):
    list_display = ['name']


@admin.register(MRPJournalBatch)
class MRPJournalBatchAdmin(admin.ModelAdmin):
    list_display = ['batch_name']


@admin.register(VendorForecastBatch)
class VendorForecastBatchAdmin(admin.ModelAdmin):
    list_display = ['batch_name', 'vendor_no']


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ['no', 'description',
                    'base_unit_of_measure_code', 'kb_sd', 'model', 'search_name', 'item_category_code', 'key']


@admin.register(UnitOfMeasure)
class UnitOfMeasureAdmin(admin.ModelAdmin):
    list_display = ['code', 'description', 'quantity_per']


@admin.register(ItemCategory)
class ItemCategoryAdmin(admin.ModelAdmin):
    list_display = ['code', 'description', ]


@admin.register(MRPJournalLine)
class MRPJournalLineAdmin(admin.ModelAdmin):
    list_display = ['item_no', 'vendor_no',  'journal_batch',
                    'description', 'kb_sd', 'due_date', 'quantity', 'created_by']


@admin.register(VendorForecastEntry)
class VendorForecastEntryAdmin(admin.ModelAdmin):
    list_display = [f.name for f in VendorForecastEntry._meta.get_fields()]


@admin.register(Vendor)
class VendorAdmin(admin.ModelAdmin):
    list_display = ['no', 'name', 'contact_no', 'email',
                    'phone_no', 'address', 'city', 'post_code']


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['no', 'description']


@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ['no', 'contact_no',
                    'first_name', 'last_name', 'email_address']


@admin.register(Phone)
class PhoneAdmin(admin.ModelAdmin):
    list_display = ['type', 'no', 'owner']
