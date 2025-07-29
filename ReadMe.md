# MemoEthiopia

## Overview

**MemoEthiopia** MemoEthiopia is an AI-powered web application that allows users to create, manage, and interact with their notes intelligently. The AI assistant can generate, update, search, and translate notes using natural language.


<div style="display: flex; gap: 10px; flex-wrap: wrap;">
  <img src="https://i.ibb.co/wFmYyKCf/Screenshot-2025-07-29-165427.png" alt="MemoEthiopia Preview 1" width="28%" />
  <img src="https://i.ibb.co/1t9Z5kgk/image.png" alt="MemoEthiopia Preview 2" width="28%" />
  <img src="https://i.ibb.co/hFqKH451/image.png" alt="MemoEthiopia Preview 3" width="39%" />
  <img src="https://i.ibb.co/pBpR6TXL/image.png" alt="MemoEthiopiaBlog Preview 1" width="39%" />
</div>



## 🚀 Features

- Create smart notes using AI
- Search and translate notes
- Organize notes with folders
- Integrated with LLMs (like LLaMA3 via Groq)
- User authentication and personalized settings
- Markdown support for notes



## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Ant Design
- **Backend:** Django, Django REST Framework
- **Database:** PostgreSQL
- **AI:** Groq API, Langchain
- **Payments:** Chapa API (for ETB)

## ⚙️ Installation Guide

1, Clone the repository:

```bash
git clone https://github.com/Kidus-fu/MemoEthiopia.git
cd MemoEthiopia
```

2, Create a virtual  environment and activate it to back end:

```bash
cd Back-end/MemoEthiopa/
python -m venv venv
source venv/bin/activate  # On Windows use     `venv\Scripts\activate`
```

3:1, Install dependencies for backend:

```bash
cd Back-end/MemoEthiopa/
pip install -r requirements.txt
```

3:2, Install dependencies for frontend:

```bash
cd front-end/MemoEthiopa/
npm i
```

4, Set up the database:

```bash
cd Back-end/MemoEthiopa/
python manage.py migrate
```

5, Create a superuser:

```bash
cd Back-end/MemoEthiopa/
python manage.py createsuperuser
```

6:1, Run the development server:

```bash
cd Back-end/MemoEthiopa/
python manage.py runserver
```
6:2, Run the development server for front end

```bash
cd front-end/MemoEthiopa/
npm run dev
```

## 🌍 Live Demo
[Visit MemoEthiopia](https://memoethiopia.pro.et/)

## 📧 Contact
Built with ❤️ by [Githube](https://github.com/Kidus-fu/)

