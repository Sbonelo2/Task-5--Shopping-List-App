# 🛍️ Shop'Again - Shopping List App

A modern shopping list application built with React, TypeScript, and Vite. Features user authentication, protected routes, and persistent data storage.

## 🚀 Features

- **User Authentication**: Forced login/registration flow before accessing the app
- **Protected Routes**: Home and Profile pages require authentication
- **Shopping List Management**: Create, edit, delete shopping lists with items
- **Item Details**: Add name, quantity, category, notes, and images to items
- **Search Functionality**: Search lists by name or category
- **Share Lists**: Copy shopping lists to clipboard for sharing
- **Persistent Storage**: Shopping lists saved to localStorage as JSON
- **User Management**: User data stored in JSON server (db.json)

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- json-server (for user authentication backend)

## 🔧 Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Install json-server globally (if not already installed):
```bash
npm install -g json-server
```

## 🏃 Running the App

1. Start the JSON server (for user authentication):
```bash
json-server --watch src/data/db.json --port 5000
```

2. In a new terminal, start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the local development URL (typically http://localhost:5173)

## 🔐 Authentication Flow

1. **First Visit**: Users are automatically redirected to the login page
2. **Registration**: New users can register via the registration page
3. **Login**: Existing users can log in with username and password
4. **Auto-redirect**: After successful login/registration, users are directed to the home page
5. **Protected Access**: Home and Profile pages are only accessible when authenticated
6. **Session Persistence**: Authentication state is stored in localStorage

## 💾 Data Storage

- **User Data**: Stored in `src/data/db.json` via json-server
- **Shopping Lists**: Stored in browser localStorage as JSON
- **Session Data**: User authentication token stored in localStorage

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Routing and navigation
- **json-server** - Mock REST API for user data
- **Tailwind CSS** - Styling (via classes)

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
