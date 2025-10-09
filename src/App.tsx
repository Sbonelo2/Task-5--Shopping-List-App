import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Registration from "./Pages/Register";
import Login from "./Pages/Login";
import Footer from "./Components/Footer";
import ProtectedRoute from "./Components/ProtectedRoute";


export default function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        {/* Default route redirects to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Public routes */}
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes - require authentication */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}




