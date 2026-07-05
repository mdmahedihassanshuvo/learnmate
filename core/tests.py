from django.urls import reverse
from rest_framework.test import APITestCase

from core.models.profile import Profile
from core.models.user import User


class UserCreateAPITest(APITestCase):
    def test_create_user_also_creates_profile(self):
        payload = {
            'username': 'alice',
            'email': 'alice@example.com',
            'phone': '0123456789',
            'password': 'pass12345',
        }

        response = self.client.post(
            reverse('user-create'),
            payload,
            format='json'
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(Profile.objects.count(), 1)

        user = User.objects.get(username='alice')
        profile = Profile.objects.get(user=user)

        self.assertEqual(profile.name, 'alice')
        self.assertTrue(user.check_password('pass12345'))
        self.assertEqual(response.data['username'], 'alice')
        self.assertNotIn('password', response.data)
