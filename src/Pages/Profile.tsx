import type React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../Store"; // <-- adjust path to your store
import { updateProfile, updatePassword } from "../Features/ProfileSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.profile);

  const [isEditing, setIsEditing] = useState(false);

  // Local state for editing profile
  const [profileData, setProfileData] = useState({
    username: user.username,
    name: user.name,
    cellphone: user.cellphone,
    email: user.email,
  });

  const [newPassword, setNewPassword] = useState("");

  // Toggle edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setProfileData({
      username: user.username,
      name: user.name,
      cellphone: user.cellphone,
      email: user.email,
    });
  };

  // Handle profile field change
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // Save profile changes
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateProfile(profileData));
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  // Save password changes
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.trim()) {
      dispatch(updatePassword(newPassword));
      setNewPassword("");
      alert("Password updated successfully!");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "2rem",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>My Profile</h2>

      {/* Show current info */}
      {!isEditing && (
        <div
          style={{
            marginBottom: "2rem",
            padding: "1rem",
            background: "#f9f9f9",
            borderRadius: "8px",
          }}
        >
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

          <button
            onClick={handleEditToggle}
            style={{
              marginTop: "1rem",
              padding: "0.7rem 1.2rem",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "black",
              color: "white",
              cursor: "pointer",
            }}
          >
            Edit Profile
          </button>
        </div>
      )}

      {/* Profile update form */}
      {isEditing && (
        <form onSubmit={handleProfileUpdate} style={{ marginBottom: "2rem" }}>
          <input
            type="text"
            name="username"
            value={profileData.username}
            onChange={handleProfileChange}
            placeholder="Update Username"
            style={{ width: "100%", marginBottom: "0.8rem", padding: "0.5rem" }}
          />

          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleProfileChange}
            placeholder="Update Full Name"
            style={{ width: "100%", marginBottom: "0.8rem", padding: "0.5rem" }}
          />

          <input
            type="tel"
            name="cellphone"
            value={profileData.cellphone}
            onChange={handleProfileChange}
            placeholder="Update Cellphone Number"
            style={{ width: "100%", marginBottom: "0.8rem", padding: "0.5rem" }}
          />

          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleProfileChange}
            placeholder="Update Email Address"
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
              marginBottom: "0.5rem",
            }}
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={handleEditToggle}
            style={{
              width: "100%",
              padding: "0.7rem",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "gray",
              color: "white",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </form>
      )}

      {/* Password update form */}
      <form onSubmit={handlePasswordUpdate}>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
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
