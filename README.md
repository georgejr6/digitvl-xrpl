# music-beats-novam
Platform for the artist to sale beats using Blockchain and Etherium Smart Contracts

# Backend Stack:
* python
* Django Rest Framework
* Redis -> gamification handle on redis and queue the tasks used by Celery
* Celery -> automation task with Async
* Postgres Sql -> Database
* ORM -> queries written in object relational mapping
* Blockchain
* Etherium
  
# Frontend Stack:
  * React
  
# Commands
* python3 -m venv ./venv
* source venv/bin/activate
* pip install -r requirements.txt

* python manage.py dumpdata subscriptions.Membership --indent 4 > fixtures/membership_plan.json
* python manage.py loaddata fixtures/model_name.json --app subscriptions.Membership

* python manage.py makemigrations

* python manage.py migrate

* python manage.py runserver

### https://digitvl.com
