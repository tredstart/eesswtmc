import json
import random
import string
import unittest

import requests


def random_string(length):
    return ''.join(random.choice(string.ascii_letters) for _ in range(length))


coach = "CH"
sportsman = "SP"
judge = "JG"
organization = "OG"

judo = "JD"
box = "BX"
mma = "MM"

authToken = ""
user = {}
club_id = None


class TestRegistration(unittest.TestCase):

    def runTest(self):
        global authToken, user, club_id
        username = random_string(7) + "@gmail.com"
        password = random_string(8)
        body = {
            "email": username,
            "password1": password,
            "password2": password,
            "first_name": "test",
            "last_name": "user"
        }
        user["username"] = username
        user["password"] = password
        response = requests.post("http://127.0.0.1:5000/api/auth/register", json=body)
        authToken = response.cookies.get("authToken", None)
        self.assertIsNotNone(authToken)
        self.assertEqual(response.status_code, 200)


class TestGetRoles(unittest.TestCase):

    def runTest(self):
        global authToken, user, club_id
        cookies = {"authToken": authToken}
        response = requests.get("http://127.0.0.1:5000/api/roles", cookies=cookies)
        self.assertEqual(response.status_code, 200)


class TestSetRole(unittest.TestCase):

    def __init__(self, role):
        super().__init__()
        self.role = role

    def runTest(self):
        global authToken, user, club_id
        cookies = {"authToken": authToken}
        body = {
            "role": self.role
        }
        response = requests.post("http://127.0.0.1:5000/api/roles", json=body, cookies=cookies)
        self.assertEqual(response.status_code, 200)


class TestGetSport(unittest.TestCase):

    def runTest(self):
        global authToken, user, club_id
        cookies = {"authToken": authToken}
        response = requests.get("http://127.0.0.1:5000/api/sports/", cookies=cookies)
        self.assertEqual(response.status_code, 200)


class TestSetSport(unittest.TestCase):

    def __init__(self, sport):
        super().__init__()
        self.sport = sport

    def runTest(self):
        global authToken, user, club_id
        cookies = {"authToken": authToken}
        body = {
            "sport": self.sport
        }
        response = requests.post("http://127.0.0.1:5000/api/sports/", json=body, cookies=cookies)
        self.assertEqual(response.status_code, 200)


class TestPrivate(unittest.TestCase):

    def runTest(self):
        global authToken, user, club_id
        cookies = {"authToken": authToken}
        response = requests.get("http://127.0.0.1:5000/api/private", cookies=cookies)
        self.assertEqual(response.status_code, 200)
        print(user)


class TestCreateClub(unittest.TestCase):

    def __init__(self, sport, name):
        super().__init__()
        self.sport = sport
        self.name = name

    def runTest(self):
        global authToken, user, club_id
        cookies = {"authToken": authToken}
        body = {
            "sport": self.sport,
            "name": self.name
        }
        response = requests.post("http://127.0.0.1:5000/api/create-club", json=body, cookies=cookies)
        self.assertEqual(response.status_code, 200)


class TestGetClubs(unittest.TestCase):

    def __init__(self, sport):
        super().__init__()
        self.sport = sport

    def runTest(self):
        global authToken, user, club_id
        cookies = {"authToken": authToken}
        response = requests.get(f"http://127.0.0.1:5000/api/pick-club?sport={self.sport}", cookies=cookies)
        self.assertEqual(response.status_code, 200)
        content = json.loads(response.content)
        club_id = content[-1]["id"]


class TestPickClub(unittest.TestCase):

    def runTest(self):
        global authToken, user, club_id
        cookies = {"authToken": authToken}
        body = {
            "id": club_id
        }
        response = requests.post("http://127.0.0.1:5000/api/pick-club", json=body, cookies=cookies)
        self.assertEqual(response.status_code, 200)


def auth_suite(name):
    suite = unittest.TestSuite()
    print(name)
    suite.addTests(
        [
            TestRegistration(),
            TestGetRoles(),
            TestSetRole(coach),
            TestGetSport(),
            TestSetSport(judo),
            TestCreateClub(judo, name=name),
            TestPrivate(),
            TestRegistration(),
            TestSetRole(sportsman),
            TestSetSport(judo),
            TestGetClubs(judo),
            TestPickClub(),
            TestPrivate()
        ]
    )
    return suite


if __name__ == '__main__':
    club_name = random_string(4)
    print(club_name)
    unittest.TextTestRunner().run(auth_suite(club_name))
