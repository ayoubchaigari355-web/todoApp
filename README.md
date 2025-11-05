# 🧾 Task Management Application (React + Supabase)

## 🧩 Project Overview

This project is a **Task Management Application** (Todo List) developed using **React**, **TypeScript**, **Bootstrap**, and **Supabase**.  
It allows users to **create, view, update, and delete tasks** in real time, with all data stored in a cloud database (**Supabase**).

The main objective is to demonstrate how to build a modern and responsive web app that combines:

- Frontend (React)
- Backend-as-a-Service (Supabase)
- Real-time database integration

---

## 🎯 Project Objectives

- Implement a **task management system** with CRUD operations.
- Use **Supabase** as a backend and database service.
- Practice **React Hooks**, **TypeScript**, and **component-based architecture**.
- Create a clean and **user-friendly interface** with Bootstrap.
- Understand how **environment variables** and **database security policies** work.

---

## 🧰 Tools & Technologies

| Category | Technology |
|-----------|-------------|
| Frontend | React, TypeScript |
| UI Design | Bootstrap, Tailwind CSS |
| Icons | Lucide React |
| Backend | Supabase (PostgreSQL + API) |
| Database | Supabase Cloud Database |
| IDE | Visual Studio Code |
| Version Control | Git & GitHub |

---

## 🏗️ Project Architecture

The app follows a modular and organized folder structure:

src/
├── components/
│ ├── TaskForm.tsx # Handles creating new tasks
│ ├── TaskItem.tsx # Displays single task
│ └── TaskList.tsx # Lists active and completed tasks
├── services/
│ └── taskService.ts # Handles all Supabase CRUD logic
├── lib/
│ └── supabase.ts # Initializes Supabase client
├── App.tsx # Main app logic and state management
└── index.tsx # Entry point (React DOM rendering)

---

## 🧠 Understanding the Main Files

### 🧩 TaskForm.tsx
Handles the **creation of new tasks**:
- Uses `useState` to manage the input field.
- Validates the input.
- Calls the parent component function (`onSubmit`) to create a new task in Supabase.
- Uses `isSubmitting` to prevent duplicate submissions.

### 🧩 TaskItem.tsx
Displays a **single task**:
- Checkbox to toggle completion status.
- Delete button with confirmation.
- Formatted date display using JavaScript’s `toLocaleDateString()`.
- Visual feedback when a task is completed (greyed text and “Completed” badge).

### 🧩 TaskList.tsx
Responsible for showing all tasks:
- Splits tasks into **Active** and **Completed** groups.
- Renders each task using the `TaskItem` component.
- Shows an info message when no tasks exist.

### 🧩 taskService.ts
Handles **all communication with Supabase**.  
Includes 4 main functions:
1. `getTasks()` → Fetches all tasks  
2. `createTask(title)` → Inserts a new task  
3. `toggleTask(id, is_done)` → Updates task completion status  
4. `deleteTask(id)` → Deletes a task by ID  

Uses async/await and checks for errors from Supabase after each operation.

### 🧩 supabase.ts
Creates and configures the **Supabase client connection**.

```ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


🧱 Database Structure (Supabase)

The database contains a single table called tasks.

Column	Type	Description
id	UUID	Unique ID for each task
title	Text	Description of the task
is_done	Boolean	True if completed
created_at	Timestamp	Auto-set when created
updated_at	Timestamp	Auto-updated when modified

SQL Script:
```
  CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  is_done boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

```



🔐 Supabase Concepts Explained
🧩 1. Supabase Client

createClient() connects your app to Supabase using:

URL → project endpoint

Anon key → public access key

Together, they give your React app direct access to your hosted database.

🧩 2. Row Level Security (RLS)
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;


RLS restricts access to each row in your table.
No one can read or modify data unless you define policies.

🧩 3. Policies

Permission rules written in SQL:

CREATE POLICY "Allow public read access" ON tasks
FOR SELECT TO anon USING (true);


✅ You used four of them (SELECT, INSERT, UPDATE, DELETE).
This makes your demo app fully public, meaning anyone can use it.

🧩 4. CRUD Operations (API)

Supabase automatically exposes your database as a RESTful API.
Each query is written in JavaScript but executed as SQL under the hood.

Example:

await supabase.from('tasks').select('*'); // SELECT * FROM tasks;
await supabase.from('tasks').insert([{ title: 'Learn Supabase' }]);
await supabase.from('tasks').update({ is_done: true }).eq('id', '...');
await supabase.from('tasks').delete().eq('id', '...');

🧩 5. Environment Variables

Supabase credentials are stored in .env:

VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1...


Accessed using:

import.meta.env.VITE_SUPABASE_URL


✅ Keeps secrets out of GitHub for security.

🧩 6. Error and Data Handling

Every Supabase request returns { data, error }.
You always check for error to catch database issues.

⚙️ Application Flow

User enters a task in the TaskForm.

The form calls handleCreateTask() in App.tsx.

App.tsx calls taskService.createTask().

Supabase inserts the task into the tasks table.

The new task is added to state (setTasks) → UI updates instantly.

Toggling or deleting tasks works the same way — database updates first, UI second.

🧩 Example of Component Communication
```
    TaskForm  → (creates task)
        ↓
    App (manages state)
        ↓
    taskService → Supabase → Database
        ↑
    TaskList / TaskItem (display + actions)

```


Each arrow means data flow or function call.


🎨 UI and UX

Bootstrap gives a modern and responsive design.

Lucide icons add professional visuals (trash, plus, calendar).

Smooth transitions (transition: all 0.3s ease) enhance user experience.

Clear separation between Active Tasks and Completed Tasks.

🚀 How to Run the Project
1️⃣ Clone the repository
git clone https://github.com/yourusername/task-app.git

2️⃣ Install dependencies
npm install

3️⃣ Add environment variables

Create a .env file:

VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key

4️⃣ Run the project
npm run dev

💡 Future Improvements

Add user authentication with Supabase Auth.

Allow categories, priorities, or tags for tasks.

Implement search and filtering.

Add real-time updates (Supabase subscriptions).

Include dark mode and better animations.

🧠 Conclusion

This project successfully demonstrates how to build a complete frontend + backend application using React and Supabase.
It shows how to connect a React app to a remote PostgreSQL database, perform CRUD operations, and handle data securely — all with minimal backend code.

Supabase makes database handling as easy as Firebase but with full SQL power, while React provides the dynamic interface that keeps everything responsive and interactive.
