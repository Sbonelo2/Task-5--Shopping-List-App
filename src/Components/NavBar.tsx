import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  FaHome,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("loggedInUserId");
    setIsLoggedIn(!!userId);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUserId");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinkStyle = (path: string) => ({
    color: isActive(path) ? "#ff6b6b" : "#e0e0e0",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.95rem",
    fontWeight: isActive(path) ? "600" : "500",
    borderBottom: isActive(path)
      ? "2px solid #ff6b6b"
      : "2px solid transparent",
  });

  return (
    <nav
      style={{
        backgroundColor: "#1a1a1a",
        borderBottom: "3px solid #ff6b6b",
        padding: "0",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Logo */}
        <Link
          to="/home"
          style={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: "#ff6b6b",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <FaShoppingCart /> Shop'Again
        </Link>

        {/* Right Side - Navigation, User Menu & Mobile Menu Button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          {/* Desktop Navigation */}
          <div
            style={
              {
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                "@media (maxWidth: 768px)": {
                  display: "none",
                },
              } as any
            }
          >
            <Link
              to="/home"
              style={navLinkStyle("/home")}
              onMouseEnter={(e) => {
                if (!isActive("/home")) {
                  e.currentTarget.style.color = "#ff6b6b";
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 107, 107, 0.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive("/home")) {
                  e.currentTarget.style.color = "#e0e0e0";
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              <FaHome /> Home
            </Link>

            <Link
              to="/profile"
              style={navLinkStyle("/profile")}
              onMouseEnter={(e) => {
                if (!isActive("/profile")) {
                  e.currentTarget.style.color = "#ff6b6b";
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 107, 107, 0.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive("/profile")) {
                  e.currentTarget.style.color = "#e0e0e0";
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              <FaUser /> Profile
            </Link>

            {!isLoggedIn && (
              <Link
                to="/registration"
                style={navLinkStyle("/registration")}
                onMouseEnter={(e) => {
                  if (!isActive("/registration")) {
                    e.currentTarget.style.color = "#ff6b6b";
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 107, 107, 0.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive("/registration")) {
                    e.currentTarget.style.color = "#e0e0e0";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                Register
              </Link>
            )}
          </div>
          {/* Simple Logout Button - Always Visible */}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#ff6b6b",
                color: "white",
                border: "none",
                padding: "0.6rem 1.2rem",
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.95rem",
                fontWeight: "600",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#ff5252";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(255, 107, 107, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ff6b6b";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <MdLogout /> Logout
            </button>
          )}
          {/* Desktop Logout Button */}
          {!isLoggedIn && (
            <button
              onClick={handleLogout}
              disabled
              style={{
                backgroundColor: "#ff6b6b",
                color: "white",
                border: "none",
                padding: "0.6rem 1.2rem",
                borderRadius: "6px",
                cursor: "not-allowed",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.95rem",
                fontWeight: "600",
                transition: "all 0.3s",
                opacity: 0.5,
              }}
            >
              <MdLogout /> Logout
            </button>
          )}
          {/* User Dropdown - Removed for simplicity */}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={
              {
                backgroundColor: "transparent",
                border: "none",
                color: "#ff6b6b",
                fontSize: "1.5rem",
                cursor: "pointer",
                display: "none",
                "@media (maxWidth: 768px)": {
                  display: "block",
                },
              } as any
            }
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: "#0d0d0d",
            padding: "1rem",
            borderTop: "1px solid #333",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <Link
            to="/home"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              ...navLinkStyle("/home"),
              padding: "0.8rem 1rem",
            }}
          >
            <FaHome /> Home
          </Link>

          <Link
            to="/profile"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              ...navLinkStyle("/profile"),
              padding: "0.8rem 1rem",
            }}
          >
            <FaUser /> Profile
          </Link>

          {!isLoggedIn && (
            <Link
              to="/registration"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                ...navLinkStyle("/registration"),
                padding: "0.8rem 1rem",
              }}
            >
              Register
            </Link>
          )}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleLogout();
            }}
            style={{
              backgroundColor: isLoggedIn ? "#ff6b6b" : "#999",
              color: "white",
              border: "none",
              padding: "0.8rem 1rem",
              borderRadius: "4px",
              cursor: isLoggedIn ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.95rem",
              fontWeight: "600",
              marginTop: "0.5rem",
              opacity: isLoggedIn ? 1 : 0.6,
              transition: "all 0.3s",
            }}
            disabled={!isLoggedIn}
          >
            <MdLogout /> Logout
          </button>
        </div>
      )}
    </nav>
  );
}
