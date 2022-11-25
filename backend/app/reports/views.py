import datetime
import math
from django.shortcuts import render
from django.http import HttpResponse
from django.template.loader import get_template
from django.template.loader import render_to_string
from io import BytesIO
from xhtml2pdf import pisa
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from forecast.models import *
from forecast.serializers import *

from faker import Faker

faker = Faker()


def generateBlankLines(num_rows=0, *args, **kwargs):

    blank_line = []
    rows = 0

    pageRows = kwargs.get('page_rows', 27)

    # return rows

    if num_rows < pageRows:
        rows = pageRows - num_rows
    else:
        rows = pageRows - (num_rows % pageRows)

    for i in range(rows):
        blank_line.append({
            "line": i
        })

    # print(f'pageRows: {pageRows}\n rows: {rows}')

    return blank_line


def generatePeriodOfMonth(startingDate):
    periods = [startingDate.strftime('%b-%Y')]
    currMonth = startingDate.month
    currYear = startingDate.year
    for _ in range(3):
        currMonth = currMonth + 1

        if currMonth == 13:
            currMonth = 1
            currYear = currYear + 1

        nextMonth = startingDate.replace(month=currMonth, year=currYear)
        periods.append(nextMonth.strftime('%b-%y'))

    return periods


def calTotalPage(total_rows, *args, **kwargs):
    pageRows = kwargs.get('page_rows', 27)
    pages = (total_rows/pageRows) % 1

    if pages > 0:
        return math.floor(total_rows/pageRows) + 1

    return 1


def createMrpRecportContext(obj):

    periods = generatePeriodOfMonth(obj.starting_period)
    totalRows = obj.entries.all().count()
    blankRows = generateBlankLines(totalRows)
    total_pages = calTotalPage(totalRows)
    return {"vendForecasts": obj,
            "periods": periods,
            "blank_rows": blankRows,
            "total_pages": total_pages}


@ api_view(['GET'])
@ permission_classes([])
def vendor_forecast(request, description, *args, **kwargs):
    vfh = VendorForecastHeader.objects.filter(
        description=description).first()

    print(f'vfh: {vfh} \ndescription: {description}')

    if vfh:
        context = createMrpRecportContext(vfh)
        template_path = 'reports/mrpReport.html'
        html = render_to_string(template_path, context)

        io_bytes = BytesIO()
        pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), io_bytes)

        if not pdf.err:
            return HttpResponse(io_bytes.getvalue(), content_type='application/pdf')
        else:
            return HttpResponse("Error while rendering PDF", status=400)

    return HttpResponse(f'{description} not found!', status=400)
    # return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([])
def posted_vendor_forecast(request, description, *args, **kwargs):
    pvfh = PostedVendorForecastHeader.objects.filter(
        description=description).first()

    print(f'pvfh: {pvfh} \ndescription: {description}')

    if pvfh:
        context = createMrpRecportContext(pvfh)
        template_path = 'reports/mrpReport.html'
        html = render_to_string(template_path, context)

        io_bytes = BytesIO()
        pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), io_bytes)

        if not pdf.err:
            return HttpResponse(io_bytes.getvalue(), content_type='application/pdf')
        else:
            return HttpResponse("Error while rendering PDF", status=400)

    return HttpResponse(f'{description} not found!', status=400)
    # return Response(status=status.HTTP_400_BAD_REQUEST)


def mrp_summary_preview(request):

    vend_forecast = VendorForecastHeader.objects.filter(
        description='J004-092022-122022').first()

    vfl_rows = vend_forecast.entries.count()
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
        blank_vfl.append(
            {
                "line_no": "",
            }
        )

    startingDate = vend_forecast.starting_period
    curr_m = startingDate.month
    y = startingDate.year
    periods = [startingDate.strftime('%b-%y')]

    for _ in range(3):
        curr_m = curr_m + 1

        if curr_m == 13:
            curr_m = 1
            y = y+1

        nextMonth = startingDate.replace(month=curr_m, year=y)
        periods.append(nextMonth.strftime('%b-%y'))

    fonts = f'media/fonts/Sarabun-Regular.ttf'

    # context = {"states": State.objects.all()[:100]}
    context = {"vendForecasts": vend_forecast,
               "periods": periods,
               "fonts": fonts,
               "blank_rows": blank_vfl,
               "total_pages": total_pages}

    template_path = 'reports/mrpReport.html'

    # print(f'file_exists: {file_exists}')
    html = render_to_string(template_path, context)

    io_bytes = BytesIO()
    pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), io_bytes)

    if not pdf.err:
        return HttpResponse(io_bytes.getvalue(), content_type='application/pdf')
    else:
        return HttpResponse("Error while rendering PDF", status=400)


def save_to_pdf(request):

    vend_forecast = VendorForecastHeader.objects.filter(
        description='K008-092022-122022').first()

    # print(f'vend_forecast: {vend_forecast}')

    vfl_rows = vend_forecast.entries.count()
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
        blank_vfl.append(
            {
                "line_no": "",
            }
        )

    startingDate = vend_forecast.starting_period
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

    # print(f'periods: {periods}')

    # context = {"states": State.objects.all()[:100]}
    context = {"vendForecasts": vend_forecast,
               "periods": periods,
               "blank_rows": blank_vfl,
               "total_pages": total_pages}

    template_path = 'reports/mrpReport.html'

    file_name = f'media/{vend_forecast.description}.pdf'
    # print(f'file_name: {file_name}')

    html = render_to_string(template_path, context)

    write_to_file = open(file_name, "w+b")
    result = pisa.CreatePDF(html, dest=write_to_file)
    write_to_file.close()

    return HttpResponse(result.err)
