import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    cellphone: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newUser = await res.json();
        console.log("✅ New User Registered:", newUser);

          // Auto login after registration
        if (newUser.id) {
          localStorage.setItem("loggedInUserId", newUser.id.toString());
        }

        // redirect to profile page
        navigate("/profile");
      } else {
        console.error("❌ Failed to register user");
      }
    } catch (error) {
      console.error("❌ Error:", error);
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
        onSubmit={handleSubmit}
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
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Register</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={{
            padding: "0.7rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            padding: "0.7rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="tel"
          name="cellphone"
          placeholder="Cellphone Number"
          value={formData.cellphone}
          onChange={handleChange}
          required
          style={{
            padding: "0.7rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            padding: "0.7rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            padding: "0.7rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

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
          Register
        </button>
      </form>
    </div>
  );
}
