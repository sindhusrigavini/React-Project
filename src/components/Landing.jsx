import React, { useState } from "react";
import "./landing.css";

export default function Landing() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div id="landing-wrapper">

      {/* 🧭 Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold text-primary" href="#">
            Gifty
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              {/* ⭐ Chatbot toggle */}
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.dispatchEvent(new Event("toggle-gifty-ai"));
                  }}
                >
                  Gifty AI
                </a>
              </li>

              {/* 🛒 SHOP DROPDOWN */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="shopDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Shop
                </a>

                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="https://www.amazon.in" target="_blank">Amazon</a></li>
                  <li><a className="dropdown-item" href="https://www.flipkart.com" target="_blank">Flipkart</a></li>
                  <li><a className="dropdown-item" href="https://www.meesho.com" target="_blank">Meesho</a></li>
                  <li><a className="dropdown-item" href="https://www.myntra.com" target="_blank">Myntra</a></li>
                  <li><a className="dropdown-item" href="https://www.ajio.com" target="_blank">Ajio</a></li>
                </ul>
              </li>

            </ul>

            <button className="btn btn-primary px-4" onClick={() => setShowLogin(true)}>
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* 🎁 Hero Section */}
      <div id="landing-box">
        <h1 id="landing-title">Gifty</h1>
        <h2 id="landing-subtitle">Smart Gifting Made Simple</h2>
        <p id="landing-text">
          Create, personalize, and deliver thoughtful gifts instantly with a
          clean and modern interface designed for effortless gifting.
        </p>

        {/* Get Started Button */}
        <button id="landing-btn">Get Started</button>

        {/* ⭐ CONTACT DETAILS UNDER BUTTON */}
        <div id="contact-info">
          <p><strong>📧 Email:</strong> support@giftyapp.com</p>
          <p><strong>📞 Phone:</strong> +91 98765 43210</p>
          <p><strong>🌐 Website:</strong> www.giftyapp.com</p>
        </div>
      </div>

      {/* 🟦 Login Popup */}
      {showLogin && (
        <div className="login-overlay" onClick={() => setShowLogin(false)}>
          <div className="login-box pretty" onClick={(e) => e.stopPropagation()}>
            
            <button
              className="close-btn pretty-close"
              onClick={() => setShowLogin(false)}
            >
              ×
            </button>

            <h2 className="pretty-title">Welcome Back 👋</h2>
            <p className="pretty-subtitle">Login to continue your gifting journey</p>

            <div className="pretty-input-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>

            <div className="pretty-input-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" />
            </div>

            <button className="pretty-login-btn">Login</button>

            <p className="pretty-footer">
              Don’t have an account? <span>Create one</span>
            </p>

          </div>
        </div>
      )}

    </div>
  );
}
