from rest_framework import permissions
import os
import uuid
import math
from django.core.mail import EmailMessage
from django.http import HttpResponse
from django.template.loader import get_template
from io import BytesIO
from django.http import HttpResponse
from django.utils import timezone
from django.template.loader import render_to_string
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from xhtml2pdf import pisa
from .serializers import *
from .models import *

# from knox import auth


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

    def update(self, request, *args, **kwargs):
        # print(f'updateContact: {request.data}')
        contact_no = request.data.get('contact_no')
        contact_person = Person.objects.filter(contact_no=contact_no)
        persons = self.get_serializer(contact_person, many=True).data
        super().update(request, *args, **kwargs)
        return Response(persons, status=status.HTTP_202_ACCEPTED)

    @action(methods=['DELETE'], detail=False)
    def del_selected(self, request, *args, **kwargs):
        contact = request.data.get('contact')
        persons = request.data.get('persons')

        if persons is None or contact is None:
            print(f'persons: {persons}')
            return Response(status=status.HTTP_400_BAD_REQUEST)

        for ps in persons:
            ps_no = ps.get('no')
            person = Person.objects.get(no=ps_no)
            # print(f'person: {person}')
            person.delete()

        contact_persons = Person.objects.filter(contact_no=contact)
        # print(f'contact_persons: {contact_persons}')

        persons_data = self.get_serializer(contact_persons, many=True).data

        return Response(persons_data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=False)
    def new_by_contact_no(self, request, *args, **kwargs):

        contact_no = request.data.get('contact_no')

        try:
            contact = Contact.objects.get(no=contact_no)
        except:
            contact, _ = Contact.objects.get_or_create(
                key=uuid.uuid4(), no=contact_no)

        # collect instance
        last_person = Person.objects.filter(contact_no=contact_no).last()
        if last_person is None:
            next_no = 1
        else:
            next_no = int(last_person.no[-3:]) + 1

        # print(
        #     f'last_person: {last_person}\nnext_no: {next_no}')

        person_no = str(next_no).zfill(3)

        person = Person.objects.create(
            key=uuid.uuid4(),
            no=f'{contact_no}-{person_no}',
            contact_no=contact,
            first_name=request.data.get('first_name'),
            last_name=request.data.get('last_name'),
            nick_name=request.data.get('nick_name'),
            email_address=request.data.get('email_address')
        )

        contact.persons.add(person)

        persons = Person.objects.filter(contact_no=contact_no)
        contact_persons = self.get_serializer(persons, many=True).data
        return Response(contact_persons, status=status.HTTP_201_CREATED)

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

    def retrieve(self, request, *args, **kwargs):
        contact_no = kwargs.get('pk')

        try:
            contact = Contact.objects.get(no=contact_no)
        except:
            contact, _ = Contact.objects.get_or_create(
                key=uuid.uuid4(), no=contact_no)

        return super().retrieve(request, *args, **kwargs)

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

    def update(self, request, *args, **kwargs):
        # print(f'request: {request.data}')
        super().update(request, *args, **kwargs)
        return self.list(request, *args, **kwargs)

    @action(methods=['post'], detail=False)
    def import_data(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED,
                        headers=headers)

    # @action(methods='put', detail=True)
    # def update_vend(self, request, pk, *args, **kwargs):
    #     print(f'request: {request}\npk: {pk}')
    #     return Response(status=status.HTTP_400_BAD_REQUEST)


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
        print(f'data: {request.data}')
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
        print(f'request: {request}, args: {args}, kwargs: {kwargs}')
        return super().destroy(request, *args, **kwargs)

    def perform_destroy(self, instance):
        return super().perform_destroy(instance)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(methods=['GET'], detail=False)
    def get_batch_jnl_line(self, request, *args, **kwargs):
        print(f'batch_name: {request.data}')
        return Response(request.data, status=status.HTTP_200_OK)

    @action(methods=['DELETE'], detail=False)
    def clear_all(self, request, *args, **kwargs):
        # print(f'request: {request.data}\nargs: {args} \nkwargs: {kwargs}')
        batch = JournalBatch.objects.get(pk=request.data)
        MRPJournalLine.objects.filter(journal_batch=batch).delete()
        VendorForecastBatch.objects.filter(batch_name=batch).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @ action(methods=['post'], detail=False)
    def import_data(self, request, *args, **kwargs):
        jnl_line_data = request.data['jnl_line']
        # print(f'jnl_line_data: {jnl_line_data}')
        batch = request.data['batch']
        jnl_batch = JournalBatch.objects.get(pk=batch)

        mrp_jnl_batch = MRPJournalBatch.objects.filter(
            batch_name=jnl_batch).first()

        for data in jnl_line_data:
            print(f'data: {data}')

            vend_no = data.get('vendor_no')

            try:
                vendor = Vendor.objects.get(no=vend_no)
            except:
                vend_name = data.get('vendor_name')
                vendor, _ = Vendor.objects.get_or_create(
                    no=vend_no, name=vend_name, key=uuid.uuid4())

            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)

            mrp_jnl_line = MRPJournalLine.objects.filter(
                key=data['key']).first()

            mrp_jnl_batch.journal_line.add(mrp_jnl_line)

            # print(f'vendor_no: {vendor}')

            vend_forecast = VendorForecastBatch.objects.filter(
                batch_name=jnl_batch, vendor_no=vendor)

            # print(f'vend_forecast: {vend_forecast.count()}')

            if vend_forecast.count() == 0:
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


class VendorForecastHeaderViewSet(viewsets.ModelViewSet):

    queryset = VendorForecastHeader.objects.all()
    serializer_class = VendorForecastHeaderSerializer
    lookup_field = 'description'

    def destroy(self, request, *args, **kwargs):
        vfh = self.get_object()
        # print(f'delete: {vfh}')
        vfh.entries.all().delete()
        super().destroy(request, *args, **kwargs)
        vfh_list = VendorForecastHeader.objects.all()
        data = VendorForecastHeaderSerializer(vfh_list, many=True).data
        return Response(data, status=status.HTTP_204_NO_CONTENT)

    @action(methods=['GET'], detail=True)
    def details(self, request, *args, **kwargs):
        vfh = self.get_object()
        vfl = vfh.entries.all()
        header = VendorForecastHeaderSerializer(vfh).data
        lines = VendorForecastLineSerializer(vfl, many=True).data
        return Response({"header": header, "lines": lines}, status=status.HTTP_200_OK)

    @action(methods=['delete'], detail=False)
    def deletes(self, request, *args, **kwargs):
        # print(f'request: {request.data} \nargs: {args} \nkwargs: {kwargs}')
        for data in request.data:
            doc_no = data['description']
            vfh = VendorForecastHeader.objects.filter(
                description=doc_no).first()
            # print(f'doc_no: {doc_no}\nvfh: {vfh}')
            vfh.entries.all().delete()
            vfh.delete()

        vfh_list = VendorForecastHeader.objects.all()
        data = VendorForecastHeaderSerializer(vfh_list, many=True).data
        return Response(data)

    @action(methods=['post'], detail=True)
    def approved(self, request, *args, **kwargs):
        vfh = self.get_object()
        # print(f'approved by: {vfh.approved_by}')
        if vfh.approved_by is None:
            vfh.approved_by = request.user
            vfh.approved_at = timezone.now()
            vfh.save()
        data = self.get_serializer(vfh).data
        query_data = self.get_queryset()
        list_data = self.get_serializer(query_data, many=True).data
        # print(f'list_data: {list_data}')
        return Response({"data": data, "list": list_data}, status=status.HTTP_200_OK)


class VendorForecasEntriesiewSet(viewsets.ModelViewSet):

    queryset = VendorForecastLine.objects.all()
    serializer_class = VendorForecastLineSerializer

    @action(methods=['post'], detail=False)
    def import_data(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED,
                        headers=headers)


@ api_view(['GET'])
def mrp_worksheet(request):
    jnl_batch = JournalBatch.objects.all()
    batch_serializer = JournalBatchSerializer(jnl_batch, many=True).data

    batch = JournalBatch.objects.get(pk=request.user.user_setup.mrp_jnl_batch)

    mrp_jnl_batch = MRPJournalBatch.objects.filter(batch_name=batch).first()
    mrpJnlBatch_serializer = MRPJournalBatchSerializer(mrp_jnl_batch).data

    return Response({"batches": batch_serializer, "data":  mrpJnlBatch_serializer})


@api_view(['GET'])
def vend_forecast_detail(request, description, * args, **kwargs):
    # doc_no = request.data['document_no']
    print(f'description: {description}')
    # vend_forecast_line = VendorForecastLine.objects.filter(description=doc_no)
    # serializer = VendorForecastLineSerializer(
    #     vend_forecast_line, many=True).data

    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def generate_vend_forecast(request, *args, **kwargs):

    period = request.data['period']
    months_period = request.data['months_period']
    # print(f'request: {request.data}')

    vends_batch = VendorForecastBatch.objects.all()

    for vend in vends_batch:
        # print(f'vendor: {vend}')
        vfh_no = str(f'{vend.vendor_no}-{period}')
        vend_forecast_h = VendorForecastHeader.objects.filter(
            description=vfh_no).first()

        # try:
        #     vendor = Vendor.objects.get(no=vend.vendor_no)
        # except:
        #     vendor, _ = Vendor.objects.get_or_create(no=vend.vendor_no)

        if vend_forecast_h is None:
            # vendor = Vendor.objects.get(no=vend.vendor_no)
            vend_forecast_h = VendorForecastHeader.objects.create(
                key=uuid.uuid4(),
                vendor_no=vend.vendor_no,
                description=vfh_no,
                starting_period=request.data['starting_period'],
                ending_period=request.data['ending_period'],
                created_by=request.user)

        # print(f'vend_forecast_h: {vend_forecast_h}.')

        vend_mrp_jnl = MRPJournalLine.objects.filter(
            vendor_no=vend.vendor_no)
        # print(f'vend_mrp_jnl: {vend_mrp_jnl}')

        for jnl_line in vend_mrp_jnl:

            month_due = jnl_line.due_date.strftime('%b-%Y')

            if month_due in months_period:
                vend_forecast_l = VendorForecastLine.objects.filter(
                    description=vfh_no, item_no=jnl_line.item_no).first()

                if vend_forecast_l is None:
                    vend_forecast_l = VendorForecastLine.objects.create(
                        key=uuid.uuid4(),
                        vendor_no=vend.vendor_no,
                        description=vfh_no,
                        item_no=jnl_line.item_no,
                        kb_sd=jnl_line.kb_sd,
                        unit_of_measure=jnl_line.unit_of_measure_code
                    )

                month_of_period = months_period.index(month_due) + 1

                # print(f'month_of_period: {month_of_period}')

                if month_of_period == 1:
                    vend_forecast_l.m1_qty = jnl_line.quantity

                if month_of_period == 2:
                    vend_forecast_l.m2_qty = jnl_line.quantity

                if month_of_period == 3:
                    vend_forecast_l.m3_qty = jnl_line.quantity

                if month_of_period == 4:
                    vend_forecast_l.m4_qty = jnl_line.quantity

                vend_forecast_l.save()

                vend_forecast_h.entries.add(vend_forecast_l)
                vend_forecast_h.save()

                # print(
                #     f'item_no {vend_forecast_l.item_no},month_of_period {month_of_period}')

            else:  # Not in period
                print(f'{month_due} is not in period')

            # print(f'vend_forecast_l {vend_forecast_l.description}')
            jnl_line.delete()

        vend.delete()

    return Response(request.data)


class VendForecastHeaderDetailViewSet(viewsets.ModelViewSet):

    queryset = VendorForecastHeader.objects.all()
    serializer_class = VendForecastHeaderDetailSerializer
    lookup_field = 'description'

    # permission_classes = []

    @action(['POST'], detail=True)
    def send_email(self, request, *args, **kwargs):
        vendor_forecast = self.get_object()
        # print(f'vendor email: {vendor_forecast.vendor_no.email}')

        if vendor_forecast.approved_by is None:
            return Response({"title": "Approval required!", "detail": f"Please approve document no. {vendor_forecast.description} before send an email."}, status=status.HTTP_400_BAD_REQUEST)

        if not request.user.email:
            return Response({"detail": f"{request.user.username}\'s email From must not be blank!"}, status=status.HTTP_400_BAD_REQUEST)

        contact = Contact.objects.get(no=vendor_forecast.vendor_no)
        contact_person = contact.persons.all()

        email_to = []

        for person in contact_person:
            email_to.append(person.email_address)

        # print(
        #     f'contact: {contact_person} \ncontact_person: {len(contact_person)}')

        if (not vendor_forecast.vendor_no.email) and (not email_to):
            return Response({"title": "Data required!", 'detail': f'{vendor_forecast.vendor_no.name}({vendor_forecast.vendor_no})\'s email or Contact must not be blank!'}, status=status.HTTP_400_BAD_REQUEST)

        file_name = f'media/{vendor_forecast.description}.pdf'

        file_exists = os.path.isfile(file_name)

        if not file_exists:
            vfl_rows = vendor_forecast.entries.count()
            total_pages = 1
            num_row = 0
            blank_vfl = []

            if vfl_rows < 27:
                num_row = 27 - vfl_rows
            else:
                num_row = 27 - (vfl_rows % 27)

                page_mod = (vfl_rows/27) % 1

                if page_mod > 0:
                    total_pages = math.floor(vfl_rows/27) + 1

            for i in range(num_row):
                blank_vfl.append({"line_no": "", })

            startingDate = vendor_forecast.starting_period
            curr_m = startingDate.month
            y = startingDate.year
            periods = [startingDate.strftime('%b-%y')]

            for _ in range(3):
                curr_m = curr_m + 1
                if curr_m == 13:
                    curr_m = 1
                    y = y+1
                nextMonth = startingDate.replace(month=curr_m, year=y)
                periods.append(nextMonth.strftime('%b-%Y'))

            context = {"vendForecasts": vendor_forecast,
                       "periods": periods,
                       "blank_rows": blank_vfl,
                       "total_pages": total_pages}

            template_path = 'reports/mrpReport.html'

            html = render_to_string(template_path, context)

            write_to_file = open(file_name, "w+b")
            result = pisa.CreatePDF(html, dest=write_to_file)
            write_to_file.close()

            if result.err:
                return Response({"detail": "There are some problem about pdf file."}, status=status.HTTP_400_BAD_REQUEST)

        email_from = request.user.email
        # email_to = vendor_forecast.vendor_no.email
        email_to.append(vendor_forecast.vendor_no.email)

        # print(f'email_to : {email_to}')

        mail_ctx = {
            "user": request.user
        }

        from_period = vendor_forecast.starting_period.strftime('%B%Y')
        to_period = vendor_forecast.ending_period.strftime('%B%Y')

        # print(f'from_period: {from_period}')

        subject = f'MRP Summary Period {from_period} - {to_period}'
        body = get_template('forecast/mail.html').render(mail_ctx)

        email = EmailMessage(
            subject, body, email_from, email_to)
        email.attach_file(file_name)
        email.content_subtype = "html"  # Main content is now text/html
        email.send()

        posted_vfh = PostedVendorForecastHeader.objects.create(
            key=vendor_forecast.key,
            description=vendor_forecast.description,
            vendor_no=vendor_forecast.vendor_no,
            vendor_name=vendor_forecast.vendor_name,
            starting_period=vendor_forecast.starting_period,
            ending_period=vendor_forecast.ending_period,
            approved=True,
            approved_by=vendor_forecast.approved_by,
            apporved_at=vendor_forecast.approved_at,
            created_by=vendor_forecast.created_by,
            created_at=vendor_forecast.created_at
        )

        vend_forescast_lines = VendorForecastLine.objects.filter(
            description=vendor_forecast.description)

        for vfl in vend_forescast_lines:
            posted_vfl = PostedVendorForecastLine.objects.create(
                key=vfl.key,
                vendor_no=vfl.vendor_no,
                item_no=vfl.item_no,
                description=vfl.description,
                kb_sd=vfl.kb_sd,
                unit_of_measure=vfl.unit_of_measure,
                m1_qty=vfl.m1_qty,
                m2_qty=vfl.m2_qty,
                m3_qty=vfl.m3_qty,
                m4_qty=vfl.m4_qty
            )

            posted_vfh.entries.add(posted_vfl)
            posted_vfh.save()

            vfl.delete()

        vendor_forecast.delete()

        vfh = VendorForecastHeader.objects.all()
        data = VendorForecastHeaderSerializer(vfh, many=True).data
        # print(f'data: {data}')

        return Response(data, status=status.HTTP_202_ACCEPTED)


class PostedVendorForecastHeaderViewSet(viewsets.ModelViewSet):

    queryset = PostedVendorForecastHeader.objects.all()
    serializer_class = PostedVendorForecastHeaderSerializer
    lookup_field = 'description'
    permission_classes = []

    @action(['GET'], detail=True)
    def details(self, request, *args, **kwargs):
        rec = self.get_object()
        # doc_header = PostedVendorForecastHeader.objects.get(id=rec.id)
        # print(f'lines: {doc_header.entries.all()}')
        pvfh = PostedVendorForecastHeaderSerializer(rec).data
        doc_lines = PostedVendorForecastLine.objects.filter(description=rec)
        pvfl = PostedVendorForecastLineSerializer(doc_lines, many=True).data
        return Response({"header": pvfh, "lines": pvfl}, status=status.HTTP_200_OK)

    @action(methods=['POST'], detail=True)
    def send_email(self, request, *args, **kwargs):
        pvfvh = self.get_object()

        contact = Contact.objects.get(no=pvfvh.vendor_no)
        contact_person = contact.persons.all()

        email_to = []

        for person in contact_person:
            email_to.append(person.email_address)

        # print(
        #     f'pvfvh.vendor_no.email: {not pvfvh.vendor_no.email} \n  contact: {contact_person} \n  contact_person: {len(contact_person)}\n  email_to: {email_to}')

        if (not pvfvh.vendor_no.email) and (not email_to):
            return Response({"title": "Data required!", 'detail': f'{pvfvh.vendor_no.name}({pvfvh.vendor_no})\'s email or Contact must not be blank!'}, status=status.HTTP_400_BAD_REQUEST)

        file_name = f'media/{pvfvh.description}.pdf'

        email_from = request.user.email
        # email_to = [pvfvh.vendor_no.email]
        email_to.append(pvfvh.vendor_no.email)

        mail_ctx = {
            "user": request.user
        }

        from_period = pvfvh.starting_period.strftime('%B%Y')
        to_period = pvfvh.ending_period.strftime('%B%Y')

        # print(f'from_period: {from_period}')

        subject = f'MRP Summary Period {from_period} - {to_period}'
        body = get_template('forecast/mail.html').render(mail_ctx)

        email = EmailMessage(
            subject, body, email_from, email_to)
        email.attach_file(file_name)
        email.content_subtype = "html"  # Main content is now text/html
        email.send()

        return Response(status=status.HTTP_200_OK)
