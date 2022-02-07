# Create your models here.
from django.contrib.auth.models import User
from django.db import models


# Create your models here.

class EasyChampUser(models.Model):
    ROLES = [('JG', 'Judge'), ('OG', 'Organization'), ('SP', 'Sportsman'), ('EA', 'Event Admin'), ('CH', 'Coach')]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=2, choices=ROLES, null=False, blank=False, default=None)


class Sport(models.Model):
    SPORTS = [('JD', 'Judo'), ('MM', 'MMA'), ('BX', 'Box')]
    name = models.CharField(max_length=2, choices=SPORTS, null=False, blank=False, default=None)


class Clubs(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    sport = models.OneToOneField(Sport, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, null=False, blank=False, default=None)
