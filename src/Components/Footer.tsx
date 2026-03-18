import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "#1a1a1a",
        color: "#e0e0e0",
        marginTop: "auto",
        borderTop: "3px solid #ff6b6b",
      }}
    >
      {/* Main Footer Content */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem",
          padding: "3rem 2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Brand Section */}
        <div>
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#ff6b6b",
              marginBottom: "1rem",
            }}
          >
            🛒 Shop'Again
          </h3>
          <p style={{ lineHeight: "1.6", fontSize: "0.95rem" }}>
            Your smart shopping companion for organized, efficient, and
            enjoyable shopping experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: "#ffffff",
            }}
          >
            Quick Links
          </h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {["Home", "Create List", "My Profile", "About"].map((link) => (
              <li key={link} style={{ marginBottom: "0.5rem" }}>
                <a
                  href="#"
                  style={{
                    color: "#e0e0e0",
                    textDecoration: "none",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#ff6b6b")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#e0e0e0")
                  }
                >
                  → {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: "#ffffff",
            }}
          >
            Get In Touch
          </h4>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.8rem",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <MdEmail style={{ color: "#ff6b6b", fontSize: "1.2rem" }} />
              <a
                href="mailto:support@shopagain.com"
                style={{
                  color: "#e0e0e0",
                  textDecoration: "none",
                }}
              >
                support@shopagain.com
              </a>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <MdPhone style={{ color: "#ff6b6b", fontSize: "1.2rem" }} />
              <a
                href="tel:+1234567890"
                style={{ color: "#e0e0e0", textDecoration: "none" }}
              >
                +1 (234) 567-890
              </a>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <MdLocationOn style={{ color: "#ff6b6b", fontSize: "1.2rem" }} />
              <span>123 Shopping St, Commerce City</span>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h4
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: "#ffffff",
            }}
          >
            Follow Us
          </h4>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              fontSize: "1.5rem",
            }}
          >
            {[
              { icon: FaFacebook, label: "Facebook" },
              { icon: FaTwitter, label: "Twitter" },
              { icon: FaInstagram, label: "Instagram" },
              { icon: FaLinkedin, label: "LinkedIn" },
              { icon: FaGithub, label: "GitHub" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                title={label}
                style={{
                  color: "#e0e0e0",
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ff6b6b";
                  e.currentTarget.style.transform = "scale(1.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#e0e0e0";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          backgroundColor: "#0d0d0d",
          borderTop: "1px solid #333",
          padding: "1.5rem 2rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ margin: 0, fontSize: "0.9rem" }}>
            © {currentYear} Shop'Again Services. All rights reserved.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              fontSize: "0.9rem",
            }}
          >
            {["Privacy Policy", "Terms & Conditions", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  color: "#e0e0e0",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6b6b")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#e0e0e0")}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        <p
          style={{
            margin: "1rem 0 0 0",
            fontSize: "0.85rem",
            color: "#888",
          }}
        >
          Made with ❤️ for smart shoppers
        </p>
      </div>
    </footer>
  );
}
