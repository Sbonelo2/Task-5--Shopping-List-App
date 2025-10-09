import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  username: string;
  name: string;
  cellphone: string;
  email: string;
  password: string;
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Check if a user is already logged in
  useEffect(() => {
    const userId = localStorage.getItem("loggedInUserId");
    if (userId) {
      fetch(`http://localhost:5000/users/${userId}`)
        .then((res) => res.json())
        .then((data) => setCurrentUser(data))
        .catch(() => localStorage.removeItem("loggedInUserId"));
    }
  }, []);

  const handleLogin = async (destination: "home" | "profile") => {
    try {
      const res = await fetch(
        `http://localhost:5000/users?username=${username}&password=${password}`
      );
      const data = await res.json();

      if (data.length > 0) {
        const user = data[0];
        console.log("💘 Login success:", user);

        localStorage.setItem("loggedInUserId", user.id.toString());
        setCurrentUser(user); // update state

       
        if (destination === "profile") navigate("/profile");
        else navigate("/home");
      } else {
        alert("🥺 Invalid username or password");
      }
    } catch (error) {
      console.error("❌ Error logging in:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUserId");
    setCurrentUser(null);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      {currentUser && (
        <div style={{ textAlign: "center" }}>
          <h2>Welcome back, {currentUser.name} 🎉</h2>
          <button
            onClick={handleLogout}
            style={{
              marginTop: "1rem",
              padding: "0.7rem 1.2rem",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "red",
              color: "white",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      )}

      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          width: "300px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            padding: "0.7rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: "0.7rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button
            onClick={() => handleLogin("profile")}
            style={{
              padding: "0.7rem",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "black",
              color: "white",
              cursor: "pointer",
              flex: 1,
            }}
          >
            Go to Profile
          </button>

          <button
            onClick={() => handleLogin("home")}
            style={{
              padding: "0.7rem",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "black",
              color: "white",
              cursor: "pointer",
              flex: 1,
            }}
          >
            Go to Home
          </button>
        </div>

        <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.9rem" }}>
          Don't have an account?{" "}
          <a
            href="/registration"
            style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
