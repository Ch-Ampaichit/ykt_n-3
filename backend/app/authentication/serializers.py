from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from core.serializers import UserSetupSerializer


class UserSerializer(serializers.ModelSerializer):
    user_setup = UserSetupSerializer()

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name',
                  'username', 'email', 'user_setup',)
        extra_kwargs = {'password': {'write_only': True}}
        # depth = 3

# Register Serializer


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])

        return user

# Login Serializer


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        # print(f'authUser is : {user}')
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
