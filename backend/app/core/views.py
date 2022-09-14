from rest_framework import viewsets
from rest_framework.decorators import api_view
from django.core.mail import send_mail
from rest_framework.response import Response
from .models import UserSetup
from .serializers import UserSetupSerializer


class UserSetupViewSet(viewsets.ModelViewSet):

    queryset = UserSetup.objects.all()
    serializer_class = UserSetupSerializer
    # lookup_field = 'pk'


@api_view(['POST'])
def send_email(request):
    data = request.data
    # print(f'password: {request.user.password}')
    # print(f'data: {data}')
    send_mail(data['subject'], data['message'], request.user.email, [
              'admin_it@yokoyama.co.th'], auth_user=request.user.email, auth_password=data['password'])
    return Response({"data": request.data, "from": request.user.email})
