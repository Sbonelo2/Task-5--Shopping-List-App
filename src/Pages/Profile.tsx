import { useEffect, useState } from "react";

type User = {
  id: number;
  username: string;
  name: string;
  cellphone: string;
  email: string;
  password: string;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    name: "",
    cellphone: "",
    email: "",
  });
  const [newPassword, setNewPassword] = useState("");


  useEffect(() => {
    const userId = localStorage.getItem("loggedInUserId");
    if (userId) {
      fetch(`http://localhost:5000/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setProfileData({
            username: data.username,
            name: data.name,
            cellphone: data.cellphone,
            email: data.email,
          });
        })
        .catch((err) => console.error("❌ Error fetching user:", err));
    }
  }, []);

  
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (user) {
      setProfileData({
        username: user.username,
        name: user.name,
        cellphone: user.cellphone,
        email: user.email,
      });
    }
  };

  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const res = await fetch(`http://localhost:5000/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...user, ...profileData }),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
        setIsEditing(false);
        alert("😍 Profile updated successfully!");
      }
    } catch (err) {
      console.error("❌ Error updating profile:", err);
    }
  };

  
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newPassword.trim()) return;

    try {
      const res = await fetch(`http://localhost:5000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });

      if (res.ok) {
        setNewPassword("");
        alert("😍 Password updated successfully!");
      }
    } catch (err) {
      console.error("❌ Error updating password:", err);
    }
  };

  if (!user) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
        Loading profile...
      </h2>
    );
  }

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

      {/* Display user info */}
      {!isEditing && (
        <div
          style={{
            marginBottom: "2rem",
            padding: "1rem",
            background: "#f9f9f9",
            borderRadius: "8px",
          }}
        >
          <h3>Current Information</h3>
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

      {/* Edit form */}
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
              backgroundColor: "green",
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
              backgroundColor: "red",
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
            backgroundColor: "green",
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
