import { Link } from "react-router-dom";
import "../Landing.css";

export default function Landing() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">🛍️ Shop'Again</h1>
            <p className="hero-subtitle">
              Your Smart Shopping List Companion
            </p>
            <p className="hero-description">
              Never forget an item again. Organize, share, and manage your
              shopping lists with ease.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="cta-buttons">
            <Link to="/registration" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="section-title">Why Choose Shop'Again?</h2>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3 className="feature-title">Easy Management</h3>
              <p className="feature-text">
                Create, edit, and delete shopping lists effortlessly with our
                intuitive interface.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">Secure & Private</h3>
              <p className="feature-text">
                Your data is safe with secure authentication and encrypted
                storage.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">Smart Search</h3>
              <p className="feature-text">
                Quickly find lists and items with powerful search functionality.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📤</div>
              <h3 className="feature-title">Easy Sharing</h3>
              <p className="feature-text">
                Share your shopping lists with friends and family instantly.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📷</div>
              <h3 className="feature-title">Add Images</h3>
              <p className="feature-text">
                Attach images to items for visual reference while shopping.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💾</div>
              <h3 className="feature-title">Auto-Save</h3>
              <p className="feature-text">
                Your lists are automatically saved and synced across devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="how-it-works-container">
          <h2 className="section-title">How It Works</h2>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3 className="step-title">Sign Up</h3>
              <p className="step-text">Create your account in seconds</p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3 className="step-title">Create Lists</h3>
              <p className="step-text">Add your shopping lists</p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3 className="step-title">Add Items</h3>
              <p className="step-text">Populate with items and details</p>
            </div>

            <div className="step-card">
              <div className="step-number">4</div>
              <h3 className="step-title">Shop & Share</h3>
              <p className="step-text">Use and share with others</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
