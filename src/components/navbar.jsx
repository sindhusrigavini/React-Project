import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ ADD useLocation
import "./navbar.css";

import enFlag from "../assets/en.svg";
import iconimg from "../assets/icon.png";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); // ✅ GET CURRENT PATH

  // ✅ SHOW MENU ONLY AFTER LOGIN (NOT ON LANDING PAGE)
  const showMainMenu = location.pathname !== "/";

  return (
    <>
      <nav className="gifty-navbar">
        {/* ================= LEFT ================= */}
        <div className="gifty-nav-left">
          <img
            src={iconimg}
            alt="Logo"
            className="gifty-logo"
            onClick={() => navigate("/")}
          />
        </div>

        {/* ================= CENTER (ONLY HOME) ================= */}
        {showMainMenu && (
          <div className="gifty-nav-center">
            <span onClick={() => navigate("/wishlists")} className="nav-link">
              Wishlists
            </span>
            <span onClick={() => navigate("/activity")} className="nav-link">
              Activity
            </span>
            <span onClick={() => navigate("/inspiration")} className="nav-link">
              Inspiration
            </span>
          </div>
        )}

        {/* ================= RIGHT ================= */}
        <div className="gifty-nav-right">
          <div className="gifty-lang">
            <span>English</span>
            <img src={enFlag} alt="English" className="lang-flag" />
          </div>

          <button
            className="gifty-login"
            onClick={() => setShowLogin(true)}
          >
            LOG IN
          </button>

          <button
            className="gifty-signup"
            onClick={() => setShowSignup(true)}
          >
            SIGN UP
          </button>
        </div>
      </nav>

      {/* ================= MODALS ================= */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      />

      <SignupModal
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
      />
    </>
  );
}
