# React Django Ecommerce

## Installation

- Clone the repo

```bash
git clone git@github.com:shankarlmc/react-django-ecommerce.git
cd react-django-ecommerce
```

- Create a virtual environment and activate it

```bash
# Ubuntu
python3 -m venv venv
source venv/bin/activate
# Windows
python -m venv venv
venv\Scripts\activate
```

- Install dependencies

```bash
cd backend
pip install -r requirements.txt
```

- Migrate the database

```bash
python manage.py migrate
```

- Create a superuser

```bash
python manage.py createsuperuser
```

- Run the server

```bash
python manage.py runserver
```
