<div align="center">

# 📋 Mini-Trello — Kanban Task Management Board

**A lightweight Kanban task management web application built with Python, Flask, JavaScript & SQLite.**

Create tasks · Track progress · Move tasks · Complete work · Delete tasks

<br>

[🚀 Quick Start](#-quick-start) ·
[✨ Features](#-features) ·
[🛠️ Tech Stack](#️-tech-stack) ·
[📖 API](#-rest-api) ·
[🚀 Deployment](#-deployment-on-render)

</div>

---

## 🎯 Problem Statement

Managing tasks through simple to-do lists can make it difficult to understand the current progress of work.

Users need a simple visual system that allows them to:

* Create tasks
* Organize tasks by their current status
* Track work in progress
* Identify completed tasks
* Update task status easily
* Remove unnecessary tasks

**Mini-Trello** solves this problem by providing a simple Kanban board with three workflow stages:

```text
┌──────────────┐       ┌────────────────┐       ┌──────────────┐
│    TO DO     │ ────► │  IN PROGRESS   │ ────► │     DONE     │
│              │       │                │       │              │
│ New Tasks    │       │ Active Tasks   │       │ Completed    │
│              │       │                │       │ Tasks        │
└──────────────┘       └────────────────┘       └──────────────┘
```

---

## ✨ Features

### 📋 Task Management

| Feature                  | Description                                |
| ------------------------ | ------------------------------------------ |
| **Create Task**          | Create a task with title and description   |
| **View Tasks**           | Display all tasks grouped by status        |
| **Move Forward**         | Move a task to the next workflow stage     |
| **Move Backward**        | Move a task to the previous workflow stage |
| **Delete Task**          | Remove a task after confirmation           |
| **Database Persistence** | Store tasks permanently in SQLite          |
| **Task Counters**        | Display the number of tasks in each column |

### 🗂️ Kanban Workflow

```text
To Do
  │
  │ Next
  ▼
In Progress
  │
  │ Next
  ▼
Done
```

Tasks can also be moved backwards:

```text
Done
  │
  │ Previous
  ▼
In Progress
  │
  │ Previous
  ▼
To Do
```

### 🎨 Responsive Interface

* Clean Kanban board
* Three-column layout
* Responsive design
* Task cards
* Create Task modal
* Previous / Next controls
* Delete confirmation
* Empty-column messages
* Mobile-friendly layout

---

## 🛠️ Tech Stack

| Layer                 | Technology         | Purpose                          |
| --------------------- | ------------------ | -------------------------------- |
| **Frontend**          | HTML5              | Page structure                   |
| **Styling**           | CSS3               | Responsive UI and Kanban design  |
| **Client Logic**      | Vanilla JavaScript | API communication and dynamic UI |
| **Backend**           | Flask              | Web server and REST API          |
| **Database**          | SQLite             | Task data persistence            |
| **Database Access**   | Python `sqlite3`   | SQLite connection and queries    |
| **Production Server** | Gunicorn           | Production deployment            |
| **Deployment**        | Render             | Cloud hosting                    |

---

## 📁 Project Structure

```text
mini_trello/
│
├── 📄 app.py
├── 📄 database.py
├── 📄 models.py
├── 📄 requirements.txt
├── 📄 trello.db
├── 📄 LICENSE
├── 📄 README.md
│
├── 📂 templates/
│   └── 📄 index.html
│
└── 📂 static/
    ├── 📂 css/
    │   └── 📄 style.css
    │
    └── 📂 js/
        └── 📄 script.js
```

### File Responsibilities

| File               | Responsibility                                |
| ------------------ | --------------------------------------------- |
| `app.py`           | Flask application and REST API routes         |
| `database.py`      | SQLite connection and database initialization |
| `models.py`        | Task CRUD and database operations             |
| `index.html`       | Kanban board interface                        |
| `style.css`        | Application styling and responsive layout     |
| `script.js`        | Frontend interaction and API requests         |
| `requirements.txt` | Python dependencies                           |
| `trello.db`        | SQLite database created automatically         |
| `README.md`        | Project documentation                         |
| `LICENSE`          | MIT License                                   |

---

## 🏗️ Architecture

Mini-Trello follows a simple **client-server architecture**.

```text
┌──────────────────────────────────────────────────────┐
│                    Web Browser                       │
│                                                      │
│             HTML + CSS + JavaScript                  │
└───────────────────────┬──────────────────────────────┘
                        │
                        │ HTTP / REST API
                        ▼
┌──────────────────────────────────────────────────────┐
│                    Flask Server                      │
│                       app.py                         │
│                                                      │
│             GET · POST · PUT · DELETE               │
└───────────────────────┬──────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────┐
│                    Task Model                        │
│                    models.py                         │
│                                                      │
│              Create · Read · Update · Delete         │
└───────────────────────┬──────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────┐
│                 Database Layer                       │
│                  database.py                         │
└───────────────────────┬──────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────┐
│                    SQLite                            │
│                   trello.db                          │
└──────────────────────────────────────────────────────┘
```

---

## 🔄 Application Flow

### Create Task

```text
User
 │
 ▼
Click "+ Create New Task"
 │
 ▼
Enter Title + Description
 │
 ▼
JavaScript
 │
 ▼
POST /api/tasks
 │
 ▼
Flask
 │
 ▼
Task Model
 │
 ▼
SQLite
 │
 ▼
New Task → To Do
```

### Move Task

```text
Click "Next" / "Previous"
          │
          ▼
     JavaScript
          │
          ▼
 PUT /api/tasks/<id>
          │
          ▼
        Flask
          │
          ▼
     Task Model
          │
          ▼
       SQLite
          │
          ▼
    Reload Tasks
          │
          ▼
 Updated Kanban Board
```

### Delete Task

```text
Click Delete
     │
     ▼
Confirmation
     │
     ▼
DELETE /api/tasks/<id>
     │
     ▼
    Flask
     │
     ▼
   SQLite
     │
     ▼
Task Removed
     │
     ▼
Board Updated
```

---

## 🗄️ Database Design

Mini-Trello uses **SQLite** for task persistence.

### Tasks Table

| Column        | Type    | Constraint  | Description             |
| ------------- | ------- | ----------- | ----------------------- |
| `id`          | INTEGER | Primary Key | Unique task ID          |
| `title`       | TEXT    | NOT NULL    | Task title              |
| `description` | TEXT    | NOT NULL    | Task description        |
| `status`      | TEXT    | NOT NULL    | Current workflow status |

### Status Values

```text
todo
in_progress
done
```

Every newly created task starts with:

```text
status = todo
```

---

# 📖 REST API

Mini-Trello provides a RESTful API for task management.

## Get All Tasks

### `GET /api/tasks`

Returns all tasks stored in the database.

**Response:**

```json
[
    {
        "id": 1,
        "title": "Design Database",
        "description": "Create the database schema.",
        "status": "todo"
    }
]
```

---

## Create New Task

### `POST /api/tasks`

Creates a new task. Newly created tasks are automatically assigned to the `todo` status.

**Request:**

```json
{
    "title": "Design Database",
    "description": "Create the database schema."
}
```

**Response:**

```json
{
    "id": 1,
    "title": "Design Database",
    "description": "Create the database schema.",
    "status": "todo"
}
```

---

## Update Task Status

### `PUT /api/tasks/<task_id>`

Updates the status of an existing task.

**Request:**

```json
{
    "status": "in_progress"
}
```

**Valid status values:**

```text
todo
in_progress
done
```

**Response:**

```json
{
    "id": 1,
    "title": "Design Database",
    "description": "Create the database schema.",
    "status": "in_progress"
}
```

---

## Delete Task

### `DELETE /api/tasks/<task_id>`

Deletes a task from the database.

**Response:**

```json
{
    "message": "Task deleted successfully"
}
```

---

## 📊 API Summary

| Method   | Endpoint          | Description        |
| -------- | ----------------- | ------------------ |
| `GET`    | `/api/tasks`      | Get all tasks      |
| `POST`   | `/api/tasks`      | Create a new task  |
| `PUT`    | `/api/tasks/<id>` | Update task status |
| `DELETE` | `/api/tasks/<id>` | Delete a task      |

---

# ⚡ Quick Start

## Prerequisites

Make sure the following are installed:

* Python 3.9 or higher
* pip
* Git

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd mini_trello
```

### 2. Create a Virtual Environment

```bash
python -m venv venv
```

### 3. Activate the Virtual Environment

**Windows:**

```bash
venv\Scripts\activate
```

**macOS / Linux:**

```bash
source venv/bin/activate
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Launch the Application

```bash
python app.py
```

Open your browser and visit:

```text
http://127.0.0.1:5000
```

🎉 The Mini-Trello application should now be running.

> **Note:** The `trello.db` SQLite database is created automatically when the application starts.

---

# 🖥️ Usage Guide

| What You Want        | How to Do It                                |
| -------------------- | ------------------------------------------- |
| **Create a task**    | Click `+ Create New Task`                   |
| **Add task details** | Enter title and description                 |
| **Move forward**     | Click `Next`                                |
| **Move backward**    | Click `Previous`                            |
| **Delete a task**    | Click `Delete` and confirm                  |
| **View task status** | Check the corresponding Kanban column       |
| **Track task count** | Check the counter at the top of each column |

---

# 🧪 API Testing

The REST API can be tested using tools such as:

* Postman
* Insomnia
* cURL
* Browser Developer Tools

## Get All Tasks

```bash
curl http://127.0.0.1:5000/api/tasks
```

## Create a Task

```bash
curl -X POST http://127.0.0.1:5000/api/tasks \
-H "Content-Type: application/json" \
-d "{\"title\":\"Test Task\",\"description\":\"Test task description\"}"
```

## Update a Task

```bash
curl -X PUT http://127.0.0.1:5000/api/tasks/1 \
-H "Content-Type: application/json" \
-d "{\"status\":\"in_progress\"}"
```

## Delete a Task

```bash
curl -X DELETE http://127.0.0.1:5000/api/tasks/1
```

---

# 🚀 Deployment on Render

Mini-Trello can be deployed as a **Python Web Service on Render**.

## Build Command

```bash
pip install -r requirements.txt
```

## Start Command

```bash
gunicorn app:app
```

## Deployment Steps

1. Push the project to a GitHub repository.

2. Create a new Web Service on Render.

3. Connect the GitHub repository.

4. Select the Python environment.

5. Set the build command:

   ```bash
   pip install -r requirements.txt
   ```

6. Set the start command:

   ```bash
   gunicorn app:app
   ```

7. Deploy the application.

8. Open the generated Render URL.

### ⚠️ SQLite Deployment Note

The project uses SQLite as a lightweight database.

For production applications, persistent storage should be configured if database data must survive service replacement or redeployment.

For this student project, SQLite provides a simple database solution that is easy to develop, test, and demonstrate.

---

# 📅 Agile Development

The project follows a **two-sprint Agile/Scrum development approach**.

## Sprint 1 — Backend & Initial UI

### Main Activities

* Project planning
* Database schema creation
* SQLite database setup
* Task model implementation
* GET API implementation
* POST API implementation
* Initial three-column frontend layout

### Sprint 1 Deliverable

A working database, testable REST API, and initial Kanban board interface.

---

## Sprint 2 — Integration & Dynamic Functionality

### Main Activities

* PUT API implementation
* DELETE API implementation
* Frontend API integration
* Dynamic task creation
* Dynamic task movement
* Task deletion
* Database persistence testing
* Final UI improvements

### Sprint 2 Deliverable

A complete working Kanban board with frontend, backend, REST API, and database integration.

---

# 📸 Screenshots

Add screenshots of the completed application below.

## Kanban Board

> Add the main Kanban board screenshot here.

## Create New Task

> Add the task creation modal screenshot here.

## Tasks in Different Stages

> Add a screenshot showing tasks across To Do, In Progress, and Done.

---

# 🗺️ Roadmap

Future improvements planned for Mini-Trello:

* [ ] User authentication
* [ ] Multiple user accounts
* [ ] Task assignment
* [ ] Drag-and-drop task movement
* [ ] Task editing
* [ ] Task due dates
* [ ] Task priorities
* [ ] Search and filtering
* [ ] Dark mode
* [ ] PostgreSQL/MySQL support
* [ ] Activity history
* [ ] Team collaboration
* [ ] Email notifications

---

# 🤝 Contributing

Contributions are welcome.

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes

Implement and test the feature.

### 3. Commit Your Changes

```bash
git commit -m "feat: add your feature"
```

### 4. Push the Branch

```bash
git push origin feature/your-feature-name
```

### Before Submitting a Pull Request

Make sure:

* Application runs successfully
* REST API endpoints work correctly
* Database operations work correctly
* Existing functionality is not broken
* UI remains responsive
* Code follows the existing project structure

---

# 📚 Learning Outcomes

This project demonstrates practical understanding of:

* Flask web application development
* RESTful API design
* CRUD operations
* SQLite database integration
* HTML/CSS frontend development
* Vanilla JavaScript
* Client-server communication
* JSON-based API requests
* Responsive web design
* Agile/Scrum development
* Cloud deployment using Render

---

# 📜 License

This project is distributed under the **MIT License**.

See [`LICENSE`](LICENSE) for the complete license text.

---

# 👤 Project

**Mini-Trello — Kanban Task Management Board**

Built as a **7th Semester student project** to demonstrate practical frontend, backend, database, REST API, and Agile/Scrum development skills.

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a star!

<br>

**Built with Python · Flask · JavaScript · SQLite**

*Educational project · Built for learning and demonstration purposes*

</div>