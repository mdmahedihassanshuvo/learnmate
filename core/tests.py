from django.urls import reverse
from rest_framework.test import APITestCase

from core.models.profile import Profile
from core.models.user import User


class UserCreateAPITest(APITestCase):
    def test_signup_also_creates_profile(self):
        payload = {
            'username': 'alice',
            'email': 'alice@example.com',
            'phone': '0123456789',
            'password': 'pass12345',
        }

        response = self.client.post(
            reverse('signup'),
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


class JWTAuthenticationAPITest(APITestCase):
    def setUp(self):
        self.password = 'pass12345'
        self.user = User.objects.create_user(
            username='bob',
            email='bob@example.com',
            password=self.password
        )

    def test_login_and_access_protected_view(self):
        login_response = self.client.post(
            reverse('login'),
            {
                'email': self.user.email,
                'password': self.password,
            },
            format='json'
        )

        self.assertEqual(login_response.status_code, 200)
        self.assertIn('access', login_response.data)
        self.assertIn('refresh', login_response.data)
        self.assertIn('user', login_response.data)
        self.assertEqual(login_response.data['user']['username'], self.user.username)

        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {login_response.data['access']}"
        )
        profile_response = self.client.get(reverse('current-user'))

        self.assertEqual(profile_response.status_code, 200)
        self.assertEqual(profile_response.data['username'], self.user.username)
        self.assertEqual(profile_response.data['email'], self.user.email)
