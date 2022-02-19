# Create your models here.
import django
from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class EasyChampUser(models.Model):
    ROLES = [('JG', 'Judge'), ('OG', 'Organization'), ('SP', 'Sportsman'), ('CH', 'Coach'), ('EA', 'Event Admin')]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=2, choices=ROLES, null=False, blank=False, default=None)
    club = models.ForeignKey("Clubs", on_delete=models.CASCADE, null=True, unique=False)


class Sport(models.Model):
    SPORTS = [('JD', 'Judo'), ('MM', 'MMA'), ('BX', 'Box')]
    nameId = models.CharField(max_length=2, choices=SPORTS, null=False, blank=False, default=None)
    name = models.CharField(max_length=50, default=None)


class Clubs(models.Model):
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE, unique=False)
    name = models.CharField(max_length=50, null=False, blank=False, default=None)


try:
    if not Sport.objects.all():
        for s in Sport.SPORTS:
            sport = Sport(name=s[1], nameId=s[0])
            sport.save()
except django.db.utils.OperationalError:
    print("waiting for the connection...")
