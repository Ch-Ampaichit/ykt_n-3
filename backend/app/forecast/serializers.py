from dataclasses import fields
from rest_framework import serializers
from .models import Item, Vendor, VendorForecastLine, Contact, Person, Phone, ItemCategory, UnitOfMeasure, JournalBatch, MRPJournalBatch
from . import models


class PhoneSerializer(serializers.ModelSerializer):

    class Meta:
        model = Phone
        fields = '__all__'


class PersonSerializer(serializers.ModelSerializer):

    class Meta:
        model = Person
        fields = '__all__'


class ContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contact
        fields = '__all__'


class VendorForecastLineSerializer(serializers.ModelSerializer):

    class Meta:
        model = VendorForecastLine
        fields = '__all__'


class VendorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vendor
        fields = '__all__'
        # depth = 3


class ItemCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = ItemCategory
        fields = '__all__'


class UnitOfMeasureSerializer(serializers.ModelSerializer):

    class Meta:
        model = UnitOfMeasure
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = '__all__'


class JournalBatchSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.JournalBatch
        fields = '__all__'


class MRPJournalLineSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MRPJournalLine
        fields = ['id', 'key', 'vendor_no', 'item_no', 'vendor_name', 'journal_batch',
                  'description', 'kb_sd', 'due_date', 'quantity', 'unit_of_measure_code', 'created_at']


class MRPJournalBatchSerializer(serializers.ModelSerializer):

    class Meta:
        model = MRPJournalBatch
        fields = '__all__'
        depth = 1
