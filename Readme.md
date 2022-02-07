# Install requirements
```
pip install -r requirements.txt
```
# Running server
## Step 1
First you need to apply changes to database / create new database.
In project root directory run:
```
python manage.py makemigrations
python manage.py migrate
```
## Step 2
Now you have to create superuser
```
python manage.py createsuperuser
```
And enter some credentials (please enter username same as email)

## Step 3
Run server
```
python manage.py runserver 5000
```

## Step 4
Now go to [Admin Page](http://localhost:5000/admin) and login using credentials you 
entered in Step 2.

Enter page Users and pick your user.
At the end of the page pick role for this user.
