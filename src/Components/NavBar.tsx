import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div
      className="NavBar"
      style={{
        backgroundColor: "black",
        width: "100%",
        padding: "1rem",
        color: "white",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        boxSizing: "border-box",
        // borderRadius: "0 0 10px 10px",
      }}
    >
      <Link to="/home" style={{ color: "white", textDecoration: "none" }}>
        ShopAgain
      </Link>
      <Link
        to="/registration"
        style={{ color: "white", textDecoration: "none" }}
      >
        Registration
      </Link>
      <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>
        Profile
      </Link>

      <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
        Login
      </Link>
    </div>
  );
}
