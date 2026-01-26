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

```bash
#Clone the repository using
https://github.com/Sbonelo2/Task-5--Shopping-List-App

# Navigate into the project directory
cd Task-5--Shopping-List-App
```

2. Install dependencies:

```bash
npm install
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

## 📖 Usage Instructions

### Creating a Shopping List

1. Log in or register with your credentials
2. Navigate to the shopping list page
3. Click "Create New List" button
4. Enter a name for your shopping list
5. Add items by specifying:
   - Item name
   - Quantity
   - Category
   - Notes (optional)
   - Images (optional)

### Managing Items

- **Edit**: Click on any item to modify its details
- **Delete**: Remove items by clicking the delete icon
- **Search**: Use the search bar to filter lists by name or category

### Sharing Lists

- Click the "Share" button to copy your shopping list to clipboard
- Paste the list to share with others

### User Profile

- Access your profile page to view account information
- Update personal details as needed

## 📁 Project Structure

```
src/
├── Components/
│   ├── Footer.tsx          # Application footer component
│   ├── NavBar.tsx          # Navigation bar component
│   └── ProtectedRoute.tsx  # Route protection wrapper
├── Features/
│   ├── HomeSlice.ts        # Redux slice for home page state
│   ├── LoginSlice.ts       # Redux slice for login state
│   ├── ProfileSlice.ts     # Redux slice for user profile state
│   └── RegisterSlice.ts    # Redux slice for registration state
├── Pages/
│   ├── Landing.tsx         # Landing/welcome page
│   ├── Login.tsx           # Login page
│   ├── Register.tsx        # Registration page
│   ├── Profile.tsx         # User profile page
│   └── ShopAgain.tsx       # Shopping list page
├── data/
│   └── db.json             # JSON server database for user data
├── img/                    # Image assets
├── App.tsx                 # Main application component
├── main.tsx                # Application entry point
└── assets/                 # Static assets
```

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

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**

```bash
git clone https://github.com/Sbonelo2/Task-5--Shopping-List-App
cd Task-5--Shopping-List-App
```

2. **Create a feature branch**

```bash
git checkout -b feature/your-feature-name
```

3. **Make your changes**
   - Ensure your code follows TypeScript and React best practices
   - Test your changes thoroughly
   - Update documentation if needed

4. **Commit your changes**

```bash
git commit -m "Add your descriptive commit message"
```

5. **Push to your branch**

```bash
git push origin feature/your-feature-name
```

6. **Submit a Pull Request**
   - Describe the changes you've made
   - Reference any related issues

### Code Guidelines

- Use TypeScript for type safety
- Follow the existing code style and structure
- Add comments for complex logic
- Keep components small and reusable
- Test new features before submitting

## 📞 Support

For issues, questions, or suggestions, please open an issue on the [GitHub repository](https://github.com/Sbonelo2/Task-5--Shopping-List-App).

<img src="https://socialify.git.ci/Sbonelo2/Task-5--Shopping-List-App/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="Task-5--Shopping-List-App" width="640" height="320" />
