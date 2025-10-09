import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import ShopAgain from "./Pages/ShopAgain";
import Profile from "./Pages/Profile";
import Registration from "./Pages/Register";
import Login from "./Pages/Login";
import Landing from "./Pages/Landing";
import Footer from "./Components/Footer";
import ProtectedRoute from "./Components/ProtectedRoute";


export default function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Landing />} />
        
        {/* Public routes */}
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes - require authentication */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <ShopAgain />
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




