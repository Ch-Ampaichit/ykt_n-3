from ast import arg
from pstats import Stats
from telnetlib import STATUS
from urllib import request
import uuid
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response

from .serializers import (ItemSerializer, MRPJournalBatchSerializer, VendorSerializer, VendorForecastEntrySerializer,
                          ItemCategorySerializer, UnitOfMeasureSerializer, JournalBatchSerializer, PhoneSerializer,
                          MRPJournalLineSerializer, PersonSerializer, ContactSerializer)
from .models import (Item, MRPJournalBatch, Vendor, VendorForecastBatch, VendorForecastEntry, Contact,
                     Person, Phone, ItemCategory, UnitOfMeasure, JournalBatch, MRPJournalLine)


class PhoneViewSet(viewsets.ModelViewSet):

    queryset = Phone.objects.all()
    serializer_class = PhoneSerializer

    @action(methods=['post'], detail=False)
    def import_data(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED,
                        headers=headers)


class PersonViewSet(viewsets.ModelViewSet):

    queryset = Person.objects.all()
    serializer_class = PersonSerializer

    @action(methods=['post'], detail=False)
    def import_data(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED,
                        headers=headers)


class ContactViewSet(viewsets.ModelViewSet):

    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    @action(methods=['post'], detail=False)
    def import_data(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED,
                        headers=headers)


class VendorForecastEntryViewSet(viewsets.ModelViewSet):

    queryset = VendorForecastEntry.objects.all()
    serializer_class = VendorForecastEntrySerializer

    @action(methods=['post'], detail=False)
    def import_data(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED,
                        headers=headers)


class VendorViewSet(viewsets.ModelViewSet):

    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer

    @action(methods=['post'], detail=False)
    def import_data(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED,
                        headers=headers)


class UnitOfMeasureViewSet(viewsets.ModelViewSet):

    queryset = UnitOfMeasure.objects.all()
    serializer_class = UnitOfMeasureSerializer

    @action(methods=['post'], detail=False)
    def import_data(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED,
                        headers=headers)


class ItemCategoryViewSet(viewsets.ModelViewSet):

    queryset = ItemCategory.objects.all()
    serializer_class = ItemCategorySerializer

    @action(methods=['post'], detail=False)
    def import_data(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED,
                        headers=headers)


class ItemViewSet(viewsets.ModelViewSet):

    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    @action(methods=['post'], detail=False)
    def import_data(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED,
                        headers=headers)


class MRPJournalLineViewSet(viewsets.ModelViewSet):

    queryset = MRPJournalLine.objects.all()
    serializer_class = MRPJournalLineSerializer

    def destroy(self, request, *args, **kwargs):
        print(f'request: {request}, args: {arg}, kwargs: {kwargs}')
        return super().destroy(request, *args, **kwargs)

    def perform_destroy(self, instance):
        return super().perform_destroy(instance)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(methods=['GET'], detail=False)
    def get_batch_jnl_line(self, *args, **kwargs):
        print(f'batch_name: {request.data}')
        return Response(request.data, status=status.HTTP_200_OK)

    @action(methods=['POST'], detail=False)
    def clear_all(self, request, *args, **kwargs):
        # print(f'request: {request.data}')
        batch = JournalBatch.objects.get(pk=request.data['batch_name'])
        MRPJournalLine.objects.filter(journal_batch=batch).delete()
        VendorForecastBatch.objects.filter(batch_name=batch).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @ action(methods=['post'], detail=False)
    def import_data(self, request, *args, **kwargs):
        jnl_line_data = request.data['jnl_line']
        batch = request.data['batch']
        jnl_batch = JournalBatch.objects.get(pk=batch)

        mrp_jnl_batch = MRPJournalBatch.objects.filter(
            batch_name=jnl_batch).first()

        for data in jnl_line_data:
            # print(f'data: {data}')
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)

            mrp_jnl_line = MRPJournalLine.objects.filter(
                key=data['key']).first()

            mrp_jnl_batch.journal_line.add(mrp_jnl_line)

            vendor = Vendor.objects.get(pk=data['vendor_no'])
            # print(f'vendor: {vendor}')
            vend_forecast = VendorForecastBatch.objects.filter(
                batch_name=jnl_batch, vendor_no=vendor)

            # print(f'vend_forecast: {vend_forecast.count()}')

            if vend_forecast.count() is 0:
                vendor_batch = VendorForecastBatch.objects.create(key=uuid.uuid4(),
                                                                  batch_name=jnl_batch, vendor_no=vendor)
                mrp_jnl_batch.vendor.add(vendor_batch)

            mrp_jnl_batch = MRPJournalBatch.objects.filter(
                batch_name=batch).first()
            mrpJnlBatch_serializer = MRPJournalBatchSerializer(
                mrp_jnl_batch).data

        return Response({"data": mrpJnlBatch_serializer}, status=status.HTTP_201_CREATED)


class MRPJournalBatchViewSet(viewsets.ModelViewSet):

    queryset = MRPJournalBatch.objects.all()
    serializer_class = MRPJournalBatchSerializer
    lookup_field = 'batch_name'


@ api_view(['GET'])
def mrp_worksheet(request):
    jnl_batch = JournalBatch.objects.all()
    batch_serializer = JournalBatchSerializer(jnl_batch, many=True).data

    batch = JournalBatch.objects.get(pk=request.user.user_setup.mrp_jnl_batch)

    mrp_jnl_batch = MRPJournalBatch.objects.filter(batch_name=batch).first()
    mrpJnlBatch_serializer = MRPJournalBatchSerializer(mrp_jnl_batch).data

    return Response({"batches": batch_serializer, "data":  mrpJnlBatch_serializer})
