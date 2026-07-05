# REST FRAMEWORK IMPORTS
from rest_framework.generics import CreateAPIView

# LOCAL IMPORTS
from core.api.serializer import UserSerializer


class UserCreateAPIView(CreateAPIView):
    serializer_class = UserSerializer
