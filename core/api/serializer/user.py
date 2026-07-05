# REST FRAMEWORK IMPORTS
from django.db import transaction
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# LOCAL IMPORTS
from core.models.profile import Profile
from core.models.user import User


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'phone',
            'password',
            'is_staff'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'is_staff': {'read_only': True}
        }

    @transaction.atomic
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            phone=validated_data.get('phone'),
            password=validated_data['password']
        )
        Profile.objects.create(
            user=user,
            name=user.username
        )
        return user


class LoginSerializer(TokenObtainPairSerializer):
    username_field = User.EMAIL_FIELD

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        return token

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        try:
            self.user = User.objects.get(email=email)
        except User.DoesNotExist as exc:
            raise AuthenticationFailed('No active account found with the given credentials') from exc

        if not self.user.check_password(password) or not self.user.is_active:
            raise AuthenticationFailed('No active account found with the given credentials')

        refresh = self.get_token(self.user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
            'id': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
            'phone': self.user.phone,
            'is_staff': self.user.is_staff,
        }
        }
