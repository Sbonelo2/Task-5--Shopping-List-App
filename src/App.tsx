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
      <Routes>
        {/* Landing page - full screen without nav/footer */}
        <Route path="/" element={<Landing />} />
        
        {/* Other routes with nav and footer */}
        <Route path="/*" element={
          <>
            <NavBar />
            <Routes>
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
          </>
        } />
      </Routes>
    </div>
  );
}




