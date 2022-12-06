from django.contrib import admin
from .models import *


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
                    'base_unit_of_measure_code', 'kb_sd', 'model', 'item_category_code']


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


@admin.register(Vendor)
class VendorAdmin(admin.ModelAdmin):
    list_display = ['no', 'name', 'contact_no', 'email',
                    'phone_no', 'address', 'city', 'post_code']
    search_fields = ['no', 'name']


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['no', 'description']


@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ['no', 'contact_no', 'nick_name',
                    'first_name', 'last_name', 'email_address']


@admin.register(Phone)
class PhoneAdmin(admin.ModelAdmin):
    list_display = ['type', 'no', 'owner']


@admin.register(VendorForecastHeader)
class VendorForecastHeaderAdmin(admin.ModelAdmin):
    list_display = ['description', 'vendor_no', 'vendor_name',
                    'starting_period', 'ending_period', 'created_by', 'created_at', 'approved_by', 'approved_at']
    search_fields = ['description', 'vendor_no']


@admin.register(VendorForecastLine)
class VendorForecastLineAdmin(admin.ModelAdmin):
    list_display = ['description',  'vendor_no', 'item_no', 'kb_sd',
                    'unit_of_measure', 'm1_qty', 'm2_qty', 'm3_qty', 'm4_qty']
    search_fields = ['description', 'vendor_no', 'item_no']


@admin.register(PostedVendorForecastHeader)
class PostedVendorForecastHeader(admin.ModelAdmin):
    list_display = ['description', 'vendor_no', 'vendor_name',
                    'starting_period', 'ending_period', 'created_by', 'created_at', 'approved_by', 'apporved_at']
    search_fields = ['description', 'vendor_no']


@admin.register(PostedVendorForecastLine)
class PostedVendorForecastLineAdmin(admin.ModelAdmin):
    list_display = ['key', 'description',  'vendor_no', 'item_no', 'kb_sd']
    search_fields = ['description',  'vendor_no', 'item_no', 'kb_sd']
