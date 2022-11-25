from django.shortcuts import render
from django.http import HttpResponse
from django.template.loader import get_template
from xhtml2pdf import pisa
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import *
from .serializers import *


@api_view(['GET'])
def pdf_preview(request, pk, * args, **kwargs):
    print(f'request: {request} \npk: {pk} \nargs: {args} \nkwargs: {kwargs}')
    return Response(status=status.HTTP_200_OK)

# def show_vfh(request):
#     vfh = VendorForecastHeader.objects.all()
#     template_path = 'forecast/pdfReport.html'
#     context = {'vend_forcast_header': vfh}

#     # template = get_template(template_path)
#     # html = template.render(context)
#     # print(f'html: {html}')

#     return render(request, template_path, context)


def pdf_report_preview(request, pk):
    print(f'pk: {pk}')
    # products = Product.objects.all()
    vfh = VendorForecastHeader.objects.all()

    # template_path = 'forecast/pdfReport.html'

    template_path = 'reports/mrpReport.html'

    context = {'vend_forcast_header': vfh}

    response = HttpResponse(content_type='application/pdf')

    response['Content-Disposition'] = 'filename="vfh_report.pdf"'

    template = get_template(template_path)

    html = template.render(context)

    # create a pdf
    pisa_status = pisa.CreatePDF(
        html, dest=response)
    # if error then show some funy view
    if pisa_status.err:
        return HttpResponse('We had some errors <pre>' + html + '</pre>')

    return response
