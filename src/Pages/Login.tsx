import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [goToProfile, setGoToProfile] = useState(false); // ✅ user choice
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:5000/users?username=${username}&password=${password}`
      );
      const data = await res.json();

      if (data.length > 0) {
        const user = data[0];
        console.log("✅ Login success:", user);

        localStorage.setItem("loggedInUserId", user.id);

        // ✅ Decide redirect based on user choice
        if (goToProfile) {
          navigate("/profile");
        } else {
          navigate("/home");
        }
      } else {
        alert("❌ Invalid credentials");
      }
    } catch (error) {
      console.error("❌ Error logging in:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <form
        onSubmit={handleLogin}
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

        {/* ✅ User chooses where to go */}
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="checkbox"
            checked={goToProfile}
            onChange={(e) => setGoToProfile(e.target.checked)}
          />
          Go to Profile after login
        </label>

        <button
          type="submit"
          style={{
            padding: "0.7rem",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "black",
            color: "white",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
