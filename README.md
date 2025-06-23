# Polls App

A simple polling application built with Django 5.2, based on the official tutorial from the Django documentation.

Developed and maintained by **Mauro Castro Rojas**.

GitHub Repository: [mauro-castro-rojas/pollsApp](https://github.com/mauro-castro-rojas/pollsApp)

---

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Development Server](#running-the-development-server)
- [Usage](#usage)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Display a list of published poll questions
- Vote on choices for each question
- View real-time results for each poll
- Admin interface for creating and managing questions and choices

*All functionality follows the official Django tutorial for version 5.2.*

---

## Requirements

- Python 3.10+ (or your preferred 3.x version)
- Django 5.2

Optional (for development):

- `virtualenv` or `venv` for isolated Python environments

---

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mauro-castro-rojas/pollsApp.git
   cd pollsApp
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   python3 -m venv venv
   source venv/bin/activate    # macOS/Linux
   venv\Scripts\activate     # Windows
   ```

3. **Install dependencies**
   ```bash
   pip install django==5.2
   ```

4. **Configure settings**

   - If you’d like, update `pollsApp/settings.py` to configure database credentials or other settings.

---

## Database Setup

1. **Apply migrations**
   ```bash
   python manage.py migrate
   ```

2. **Create a superuser** (to access the admin site)
   ```bash
   python manage.py createsuperuser
   ```

---

## Running the Development Server

Start the Django development server:

```bash
python manage.py runserver
```

By default, the app will be available at:

```
http://127.0.0.1:8000/polls/
```

And the admin site at:

```
http://127.0.0.1:8000/admin/
```

---

## Usage

- **List of Polls**: Visit `/polls/` to view all published questions.
- **Vote**: Click a question, select a choice, and submit your vote.
- **Results**: After voting, view the results page for the question.
- **Admin**: Log in at `/admin/` to add, edit, or delete polls and choices.

---

## Running Tests

To run the built-in test suite from the tutorial:

```bash
python manage.py test polls
```

---

## Contributing

Contributions are welcome! To propose changes:

1. Fork the repository on GitHub
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m "Add YourFeature"`)
4. Push to your branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

Please ensure your code follows PEP 8 style guidelines and includes relevant tests.

---

## License

This project is licensed under the [MIT License](LICENSE).
