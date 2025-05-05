# Memo Ethiopia Backend Documentation

## Overview

Memo Ethiopia is a real-time note-taking application designed to help users create, manage, and share notes efficiently. Built with Django and Django REST Framework (DRF), it offers a robust backend architecture for handling user authentication, note management, and real-time data interaction.

This documentation provides a comprehensive overview of the backend implementation, including:

* RESTful APIs to perform CRUD operations on notes and user data
* Authentication & Authorization using token-based JWT access control
* Error Handling & Validation to ensure data integrity
* Deployment Instructions for running the backend on production servers in render.com

Memo Ethiopia is built with scalability and extensibility in mind, making it suitable for users

### Key Backend Features
The backend powers the Memo Ethiopia application by providing a robust set of APIs to support:

* User Authentication – Secure login, registration, and token-based access control
* Note Management – Create, edit, delete, and organize notes with features like:
  * <u>Folders</u> for categorizing notes 
  * <u>Trash</u> for soft-deletion and recory
  * <u>Pinning</u> for marking important notes
  * <u>Archiving</u> for decluttering the workspace

* Custom Colors – Allow users to color-code their notes
* AI Agent Integration – Enable smart note suggestions or actions via an AI assistant
* OTCB Chat Functionality – One-Time Chat Bot for quick chat
* Translation Services – Translate word between languages (e.g., Amharic and English) for multilingual support


## Technologies Used

* **Django** (Web framework)
* **Django REST Framework (DRF)** (API development)
* **PostgreSQL** (Database)
* **DRF-YASG** (Swagger API documentation)
* **JWT Authentication** (User authentication)
* **Django CORS Headers** (Cross-Origin Resource Sharing)
* **Langchain** (To AI chat and AI Agent)
* **Groq** (To LLM)
* **Gunicorn** (WSGI HTTP server for UNIX)

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


## API Endpoints

### Authentication & Authorization

* **`POST /api-v1/username/token/`** → Obtain JWT token using user name
* **`POST /api-v1/email/token/`** → Obtain JWT token using email
* **`POST /api-v1/token/refresh/`** → Refresh JWT token
* **`POST /api-v1/register/`** → To sign up

### User Endpoints

* **`GET /api-v1/users/`** → List users
* **`POST /api-v1/register/`** → Register new user
* **`GET /api-v1/users/{uuid}/`** → Get user details

### Notes Endpoints

* **`GET /api-v1/notes/`** → List all notes
* **`POST /api-v1/notes/`** → Create a note
* **`GET /api-v1/notes/{uuid}/`** → Retrieve a note
* **`PUT /api-v1/notes/{uuid}/`** → Update a note
* **`PUT /api-v1/notes/outtrash/{uuid}/`** → Update Trash a note
* **`DELETE /api-v1/notes/{uuid}/`** → Delete a note

### Categories Endpoints

* **`GET /api-v1/categories/`** → List all categories
* **`POST /api-v1/categories/`** → Create a category
* **`GET /api-v1/categories/{id}/`** → Retrieve a category
* **`PUT /api-v1/categories/{id}/`** → Update a category
* **`DELETE /api-v1/categories/{id}/`** → Delete a category

## OTP

* `POST /api-v1/otp/send-otp/` → Send a OTP in email
* `POST /api-v1/otp/verify-otp/` → Verify a OTP

## Notification

* **`GET /api-v1/notification/`** → List all notification
* **`POST /api-v1/notification/`** → Create a notification
* **`GET /api-v1/notification/{id}/`** → Retrieve a notification
* **`PUT /api-v1/notification/{id}/`** → Update a notification
* **`DELETE /api-v1/notification/{id}/`** → Delete a notification

## Folder 

* **`GET /api-v1/folders/`** → List all folders
* **`POST /api-v1/folders/`** → Create a folders
* **`GET /api-v1/folders/{id}/`** → Retrieve a folders
* **`PUT /api-v1/folders/{id}/`** → Update a folders
* **`DELETE /api-v1/folders/{id}/`** → Delete a folders

## TrashNote 

* **`GET /api-v1/trashNotes/`** → List all trashNotes
* **`POST /api-v1/trashNotes/`** → Create a trashNotes
* **`GET /api-v1/trashNotes/{id}/`** → Retrieve a trashNotes
* **`PUT /api-v1/trashNotes/{id}/`** → Update a trashNotes
* **`DELETE /api-v1/trashNotes/{id}/`** → Delete a trashNotes

## Favorites 

* **`GET /api-v1/favorites/`** → List all favorites
* **`POST /api-v1/favorites/`** → Create a favorites
* **`GET /api-v1/favorites/{id}/`** → Retrieve a favorites
* **`PUT /api-v1/favorites/{id}/`** → Update a favorites
* **`DELETE /api-v1/favorites/{id}/`** → Delete a favorites

## OTCB (One Time Chat Bot)
* **`POST /memoai/otcb/`** → Send a message to the user

## Deployment

### Environment Variables

* `.env` file must include:

  ```env
  ALLOWED_HOSTS=*
  DATABASE_URL=postgres://user:password@localhost:5432/memo_ethiopia
  DEBUG=True
  EMAIL_HOST_PASSWORD = 
  EMAIL_HOST_USER = 
  SECRET_KEY=your-secret-key
  LANGSMITH_API_KEY= your-langsmith-api-key
  GROQ_API_KEY = your-groq-api-key
  ```

## API Documentation

* Visit `http://localhost:8000/Docs/swagger/` for API docs (Swagger UI)
* Visit `http://localhost:8000/Docs/redoc/` for Redoc UI

## Example a JOSN Format

### Notes 📝

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
    "category": null,
    "folder":"",
    "is_trashed":bool,
}
```

### Users Info 👤

```json
{
    "user": null,
    "bio": "",
    "profile_picture": null,
    "plan": "Pro | Free",
    "is_verified": false,
    "phone_number": "",
    "location": "",
    "date_of_birth": "YYYY-MM-DD",
    "gender": "Male | Female | Other",
    "social_links": {
        "facebook": "https://facebook.com/username",
        "twitter": "https://twitter.com/username",
        "linkedin": "https://linkedin.com/in/username"
    },
    "education": "",
    "preferred_language": "en | am | etc."
}

```

### User Signup 👤

```json
{
    "username": "",
    "email": "",
    "password": "",
    "first_name": "",
    "last_name": ""
}
```

### User Signin in email 👤

```json
{
    "email":"",
    "password":""
}
```

### User Signin in username 👤

```json
{
    "username":"",
    "password":""
}
```

## OTP send 🗝️

```json
{
    "email":"user@gmail.et"
}
```

## OTP verify 🗝️

```json
{
    "email":"user@email.et",
    "otp_code":"333333"
}
```

## Share Note 🗒️

```json
{
    "user":"shared_user_id",
    "note":"note_id",
    "sheard_with":"shared_with_id",    
    "permission": "edit | view"
}
```

## Notification 🔔

```json
{
    "user":"user_id",
    "message":"Notification message"
}
```

## Folder 📁

```json
{
    "user":"user_id",
    "name":"folder name"
}
```

## Trash 🗑️

```json
{
    "user":"user_id",
    "note":"note_id"
}
```

## Favorite ⭐

```json
{
    "user":"user_id",
    "note":"note_id"
}
```

## Change Password 🗝️

```json
{
    "old_password":"old_password",
    "new_password":"new_password"
}
```


## OTCB (one time chat boT) 🤖

This is a bot that can be used to send a message to the user. It is a simple bot that can be used to send a message to the user one Time only.
example of a message that can be sent to the user is:
```json
{
  "message": "Hello! How can I assist you today?",
  "user_info": {
    "name": "John Doe",
    "bio": "A passionate note-taker.",
    "joined_at": "2023-10-01T12:00:00Z",
    "plan": "Pro",
    "location": "Ethiopia",
    "uuid": "123e4567-e89b-12d3-a456-426614174000",
    "is_verified": true
  }
}

```

## Conclusion
This backend powers the Memo Ethiopia application by providing APIs for:

User authentication

Note management (including  <u>folders</u> <u>trash</u> <u>pinning</u> and <u>archiving</u>)

* Custom colors for notes
* AI Agent integration
* OTCB Chat functionality
* Translation services

You can test it out at [Memo Ethiopia](https://memoethiopia.onrender.com/).



---

### 🛠 Need Help? If you face any issues, open an issue on GitHub or contact the developer!