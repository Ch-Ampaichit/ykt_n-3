from dataclasses import fields
from rest_framework import serializers
from .models import *


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


class VendorForecastHeaderSerializer(serializers.ModelSerializer):
    issued_fullname = serializers.SerializerMethodField(read_only=True)
    approved_fullname = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = VendorForecastHeader
        fields = [
            'key',
            'description',
            'vendor_no',
            'vendor_name',
            'starting_period',
            'ending_period',
            'created_at',
            'approved_at',
            'issued_fullname',
            'approved_fullname'
        ]

    def get_issued_fullname(self, obj):
        return obj.get_issued_fullname()

    def get_approved_fullname(self, obj):
        # if not hasattr(obj, 'approved_by'):
        #     return None

        return obj.get_approved_fullname()


class VendorForecastLineSerializer(serializers.ModelSerializer):

    class Meta:
        model = VendorForecastLine
        fields = [
            "key",
            "description",
            "kb_sd",
            "unit_of_measure",
            "m1_qty",
            "m2_qty",
            "m3_qty",
            "m4_qty",
            "item_no",
            "item_description",
        ]


class VendForecastHeaderDetailSerializer(serializers.ModelSerializer):
    issued_fullname = serializers.SerializerMethodField(read_only=True)
    approved_fullname = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = VendorForecastHeader
        fields = [
            'key',
            'description',
            'entries',
            'vendor_no',
            'vendor_name',
            'starting_period',
            'ending_period',
            'created_at',
            'approved_at',
            'issued_fullname',
            'approved_fullname',
        ]
        depth = 1

    def get_issued_fullname(self, obj):
        return obj.get_issued_fullname()

    def get_approved_fullname(self, obj):
        return obj.get_approved_fullname()


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
        model = JournalBatch
        fields = '__all__'


class MRPJournalLineSerializer(serializers.ModelSerializer):
    class Meta:
        model = MRPJournalLine
        fields = ['id', 'key', 'vendor_no', 'item_no', 'vendor_name', 'journal_batch',
                  'description', 'kb_sd', 'due_date', 'quantity', 'unit_of_measure_code', 'created_at']


class MRPJournalBatchSerializer(serializers.ModelSerializer):

    class Meta:
        model = MRPJournalBatch
        fields = '__all__'
        depth = 1


class PostedVendorForecastHeaderSerializer(serializers.ModelSerializer):
    issued_fullname = serializers.SerializerMethodField(read_only=True)
    approved_fullname = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = PostedVendorForecastHeader
        fields = [
            'key',
            'description',
            'vendor_no',
            'vendor_name',
            'starting_period',
            'ending_period',
            'created_at',
            'apporved_at',
            'issued_fullname',
            'approved_fullname'
        ]

    def get_issued_fullname(self, obj):
        return obj.get_issued_fullname()

    def get_approved_fullname(self, obj):
        return obj.get_approved_fullname()


class PostedVendorForecastLineSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostedVendorForecastLine
        fields = [
            "key",
            "description",
            "kb_sd",
            "unit_of_measure",
            "m1_qty",
            "m2_qty",
            "m3_qty",
            "m4_qty",
            "item_no",
            "item_description",
        ]
