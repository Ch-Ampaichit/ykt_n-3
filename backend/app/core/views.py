from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from django.core.mail import send_mail, EmailMessage
from rest_framework.response import Response
from .models import UserSetup
from .serializers import UserSetupSerializer
import os


class UserSetupViewSet(viewsets.ModelViewSet):

    queryset = UserSetup.objects.all()
    serializer_class = UserSetupSerializer
    # lookup_field = 'pk'


@api_view(['POST'])
def send_email(request):

    data = request.data
    # print(f'data: {data}')
    send_mail(data['subject'], data['message'], request.user.email, [
              'admin_it@yokoyama.co.th'], auth_user=request.user.email, auth_password=data['password'])
    return Response({"data": request.data, "from": request.user.email})


@api_view(['POST'])
def send_forecast(request):
    data = request.data

    file_name = 'media/K008-092022-122022.pdf'
    file_exists = os.path.isfile(file_name)
    # print(f'file_exists: {file_exists}')

    email = EmailMessage(
        data['subject'], data['message'], 'amphol@yokoyama.co.th', ['chatchai@yokoyama.co.th'])
    email.attach_file(file_name)
    email.send()

    return Response(status=status.HTTP_204_NO_CONTENT)
