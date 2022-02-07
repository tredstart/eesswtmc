from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.forms import ChoiceField

from .models import EasyChampUser


class UserCreateForm(UserCreationForm):
    role = ChoiceField(choices=EasyChampUser.ROLES)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password1', 'password2']

    def save(self, commit=True):
        if not commit:
            raise NotImplementedError("Can't create User and UserProfile without database save")
        user = super(UserCreateForm, self).save(commit=True)
        easychamp = EasyChampUser(user=user, role=self.cleaned_data['role'])
        easychamp.save()
        return user, easychamp