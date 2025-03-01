# Memo Ethiopia Backend Documentation

## Overview

Memo Ethiopia is a real-time note-taking application built using Django and Django REST Framework (DRF). This documentation covers the backend implementation, including models, APIs, authentication, and deployment.

## Technologies Used

* **Django** (Web framework)
* **Django REST Framework (DRF)** (API development)
* **PostgreSQL** (Database)
* **DRF-YASG** (Swagger API documentation)
* **JWT Authentication** (User authentication)

## Installation

1, Clone the repository:

```bash
git clone https://github.com/Kidus-fu/MemoEthiopia.git
cd MemoEthiopia
```

2, Create a virtual environment and activate it:

```bash
python -m venv venv
source venv/bin/activate  # On Windows use     `venv\Scripts\activate`
```

3, Install dependencies:

```bash
pip install -r requirements.txt
```

4, Set up the database:

```bash
python manage.py migrate
```

5, Create a superuser:

```bash
python manage.py createsuperuser
```

6, Run the development server:

```bash
python manage.py runserver
```

## Models

### UserInfo Model

```python
class userInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Links user profile to Django's built-in User model
    bio = models.TextField(blank=True, null=True)  # Optional field for user biography
    profile_picture = models.ImageField(blank=True, null=True, upload_to='profile_pictures/')  # Optional profile picture
```

### Category Model

```python
class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="categories")
    name = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
```

### Note Model

```python
class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name="notes")
    title = models.CharField(max_length=255)
    content = models.TextField()
    image = models.ImageField(upload_to="notes_images/", blank=True, null=True)
    file = models.FileField(upload_to="notes_files/", blank=True, null=True)
    is_pinned = models.BooleanField(default=False)
    is_archived = models.BooleanField(default=False)
    color = models.CharField(max_length=20, blank=True, null=True)  # Optional note color
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

```

## API Endpoints

### Authentication

* **`POST /api-v1/username/token/`** → Obtain JWT token using user name
* **`POST /api-v1/email/token/`** → Obtain JWT token using email
* **`POST /api-v1/token/refresh/`** → Refresh JWT token

### User Endpoints

* **`GET /api-v1/users/`** → List users
* **`POST /api-v1/register/`** → Register new user
* **`GET /api-v1/users/{id}/`** → Get user details

### Notes Endpoints

* **`GET /api-v1/notes/`** → List all notes
* **`POST /api-v1/notes/`** → Create a note
* **`GET /api-v1/notes/{id}/`** → Retrieve a note
* **`PUT /api-v1/notes/{id}/`** → Update a note
* **`DELETE /api-v1/notes/{id}/`** → Delete a note

### Categories Endpoints

* **`GET /api-v1/categories/`** → List all categories
* **`POST /api-v1/categories/`** → Create a category
* **`GET /api-v1/categories/{id}/`** → Retrieve a category
* **`PUT /api-v1/categories/{id}/`** → Update a category
* **`DELETE /api-v1/categories/{id}/`** → Delete a category

## Deployment

### Environment Variables

* `.env` file must include:

  ```env
  SECRET_KEY=your-secret-key
  DEBUG=True
  DATABASE_URL=postgres://user:password@localhost:5432/memo_ethiopia
  ALLOWED_HOSTS=*
  ```

## API Documentation

* Visit `http://localhost:8000/Docs/swagger/` for API docs (Swagger UI)
* Visit `http://localhost:8000/Docs/redoc/` for Redoc UI

## Example a JOSN Format

### Notes

```json
{  
    "user": null,
    "title": "",
    "content": "",
    "image": null,
    "file": null,
    "color": "",
    "is_pinned": false,
    "is_archived": false,
    "category": null
}
```

### Users Info

```json
{
    "user": null,
    "bio": "",
    "profile_picture": null
}
```

### User Singup

```json
{
    "username": "",
    "email": "",
    "password": "",
    "first_name": "",
    "last_name": ""
}
```

### User Singin in email

```json
{
    "email":"",
    "password":""
}
```

### User Singin in username

```json
{
    "username":"",
    "password":""
}
```

## Conclusion

This backend powers the **Memo Ethiopia** application by providing APIs for user authentication, note management, and categories. Feel free to contribute or customize based on your needs!

---

### 🛠 Need Help?

If you face any issues, open an issue on GitHub or contact the developer!
