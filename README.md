# To Do List

A fast, clean, and private task manager built to make tracking your daily tasks straightforward and hassle-free. Registration takes seconds with zero tracking or unnecessary personal info required—just a simple username and password to keep your tasks secure.

Every task you add is saved safely to a database associated with your account, so your list is always waiting for you whenever you log back in.

## 💻 Usage Guide

### Task Management

- **Create a Task**: Type your task title into the input bar on the main dashboard and click the **Add** button.
- **Complete a Task**: Click a task once to toggle its status. Completed tasks will appear with a strikethrough effect.
- **Delete a Task**: There are two methods to remove a task:
  - **Quick Delete**: Click an already completed (strikethrough) task one more time to delete it instantly.
  - **Batch Delete Mode**: Click the **Delete (Dustbin)** icon in the bottom toolbar, then click on any tasks you wish to remove.

### Account & Cloud Sync (Recommended)

This application supports both guest sessions and persistent cloud storage.

- **Guest Mode (Local/Temporary)**: You can create and manage tasks without an account. However, your data is stored dynamically in memory—**refreshing or closing the page will permanently delete your tasks.**
- **Cloud Mode (Persistent Storage)**: To ensure your lists are securely saved across page reloads and devices:
  1. Click the **Register** button in the bottom toolbar.
  2. Create a secure account using only a unique username and password (no email or personal information required).
  3. Once registered, log in via the **Login** button in the bottom toolbar to automatically sync and store your tasks in the secure database.

## 🛠️ Under the Hood

This full-stack application is hand-coded using a robust modern stack:

### Frontend

- **HTML5**
- **CSS3**
- **JavaScript**

### Backend

- **Python**
- **FastAPI**
- **MongoDB**

The client-side interface relies on clean HTML and CSS creating UI, and Javascript handelling the logic and APIs while the backend utilizes high-speed Python with FastAPI ,that is hosted with Render, to communicate smoothly with the MongoDB database.

## 🤝 About the Creator

Hi, I'm **Abhishek Sahani**, a 14-year-old developer who built this app from scratch to combine a smooth user interface with a full database-driven backend.

## 📄 License & Copyright

© 2026 To Do List by [abhishek_sahani_builds](https://www.github.com/AbhishekSahaniBuilds). All rights reserved.
