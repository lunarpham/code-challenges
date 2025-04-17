## Challenge 8: Todo Application

A simple Todo application built with React and Redux.
Candidate: Me

#### Features

✅ Create, update, and delete todo items
🔍 Filter todos by status and category type
🔄 Sort todos by creation date
💾 Storage using localStorage

### Tech Stack

- Vite + React 19
- Redux Toolkit
- Tailwind + HeadlessUI

### Installation

1. Clone the repository

```
git clone <repository-url>
cd todo-app
```

2. Install dependencies

```
npm install
```

3. Start the development server

```
npm run dev
```

4. Open your browser and visit http://localhost:5173
   Expose your host by `npm run host`

### Project Structure

```
todo-app/
├── src/
│   ├── components/     # UI components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── store/          # Redux store configuration
│   ├── App.jsx         # Main application component
│   └── main.jsx        # Entry point
├── public/             # Static assets
└── index.html          # HTML template
```

### Components

- **AppContent**: main layout container
- **Header**: contains filtering and sorting controls, button to open form
- **TodoList**: renders the filtered list of todos
- **TodoItem**: individual todo item with data parsed from TodoList
- **TodoForm**: form for creating and editing todos
- **DeleteModal**: confirmation dialog for deletion

### Hooks

- **useList**: manages all available operations in TodoList, returns filtered list of Todos for rendering
- **useForm**: handles form state for creating/editing todos
- **useModal**: controls modal visibility and transition animations
- **useFilters**: manages filter state

### State Management using Redux

- **addNewTodo**: create a new todo
- **updateTodo**: update an existing todo
- **deleteTodo**: remove a todo
- **changeStatus**: toggle todo completion status
- **setFilter**: update filtering criteria
- **toggleModal**: show/hide the todo form
- **toggleDeleteModal**: show/hide the confirmation dialog
