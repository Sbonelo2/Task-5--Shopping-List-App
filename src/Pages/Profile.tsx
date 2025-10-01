import React, { useState, useEffect } from "react";

export default function Profile() {
  // Simulate logged-in user data (normally comes from Redux or API)
  const [user, setUser] = useState({
    username: "",
    name: "",
    cellphone: "",
    email: "",
    password: "",
  });

  // Local form state for profile updates
  const [profileData, setProfileData] = useState({
    username: user.username,
    name: user.name,
    cellphone: user.cellphone,
    email: user.email,
  });

  // Local form state for password update
  const [newPassword, setNewPassword] = useState("");

  // Update form state if user changes (useful if loaded asynchronously)
  useEffect(() => {
    setProfileData({
      username: user.username,
      name: user.name,
      cellphone: user.cellphone,
      email: user.email,
    });
  }, [user]);

  // Handle profile input changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // Update profile
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ ...user, ...profileData });
    alert("Profile updated successfully!");
  };

  // Update password
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.trim()) {
      setUser({ ...user, password: newPassword });
      setNewPassword("");
      alert("Password updated successfully!");
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "2rem auto",
        padding: "2rem",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>My Profile</h2>

      {/* Display current info */}
      <div
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          background: "#f9f9f9",
          borderRadius: "8px",
        }}
      >
        <div>
          <h3>Current Info</h3>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Cellphone:</strong> {user.cellphone}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>

      {/* Profile Update Form */}
      <form onSubmit={handleProfileUpdate} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          name="username"
          value={profileData.username}
          onChange={handleProfileChange}
          placeholder="Username"
          required
          style={{ width: "100%", marginBottom: "0.8rem", padding: "0.5rem" }}
        />

        <input
          type="text"
          name="name"
          value={profileData.name}
          onChange={handleProfileChange}
          placeholder="Full Name"
          required
          style={{ width: "100%", marginBottom: "0.8rem", padding: "0.5rem" }}
        />

        <input
          type="tel"
          name="cellphone"
          value={profileData.cellphone}
          onChange={handleProfileChange}
          placeholder="Cellphone Number"
          required
          style={{ width: "100%", marginBottom: "0.8rem", padding: "0.5rem" }}
        />

        <input
          type="email"
          name="email"
          value={profileData.email}
          onChange={handleProfileChange}
          placeholder="Email Address"
          required
          style={{ width: "100%", marginBottom: "0.8rem", padding: "0.5rem" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.7rem",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "black",
            color: "white",
            cursor: "pointer",
          }}
        >
          Update Profile
        </button>
      </form>

      {/* Password Update Form */}
      <form onSubmit={handlePasswordUpdate}>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
          style={{ width: "100%", marginBottom: "0.8rem", padding: "0.5rem" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.7rem",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "darkred",
            color: "white",
            cursor: "pointer",
          }}
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
