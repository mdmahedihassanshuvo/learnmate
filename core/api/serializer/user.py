# REST FRAMEWORK IMPORTS
from django.db import transaction
from rest_framework import serializers

# LOCAL IMPORTS
from core.models.profile import Profile
from core.models.user import User


class UserSerializer(serializers.ModelSerializer):
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
