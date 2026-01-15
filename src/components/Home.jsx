import React, { useEffect, useState } from "react";
import "./home.css";


import icon2 from "../assets/icon2.png";
import iconimg from "../assets/icon.png";
import getingoogle from "../assets/getInGoogle.svg";
import getinapple from "../assets/getInApple.svg";
import footerimg from "../assets/FooterImage.png";

import AddWishModal from "./AddWishModal";

import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Home() {
  const [showAddWish, setShowAddWish] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // 🔐 Protect page + get user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // 🧠 Firebase initials (SG)
  const getInitials = () => {
    if (!user) return "";
    if (user.displayName) {
      const parts = user.displayName.split(" ");
      return (
        parts[0][0] + (parts[1] ? parts[1][0] : "")
      ).toUpperCase();
    }
    return user.email?.slice(0, 2).toUpperCase();
  };

  // 🚪 Logout
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className="home-navbar">
        <div className="home-navbar-left">
          <img
            src={iconimg}
            alt="WishWell"
            className="home-logo"
            onClick={() => navigate("/home")}
            style={{ cursor: "pointer" }}
          />
        </div>

        {/* ✅ FIXED NAVIGATION */}
        <nav className="home-navbar-center">
          <span onClick={() => navigate("/wishlists")}>
            Wishlists
          </span>
          <span onClick={() => navigate("/activity")}>
            Activity
          </span>
          <span onClick={() => navigate("/inspiration")}>
            Inspiration
          </span>
        </nav>

        <div className="home-navbar-right">
          <button
            className="add-wish-btn"
            onClick={() => setShowAddWish(true)}
          >
            ADD WISH
          </button>

          <span className="icon">🔔</span>

          {/* 👤 FIREBASE PROFILE ICON */}
          <span
            className="profile-circle"
            onClick={() => setShowProfile(true)}
          >
            {getInitials()}
          </span>
        </div>
      </header>

      {/* ================= PROFILE PANEL ================= */}
      {showProfile && (
        <div className="profile-overlay" onClick={() => setShowProfile(false)}>
          <div
            className="profile-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="profile-header">
              <h3>Profile</h3>
              <span
                className="close-btn"
                onClick={() => setShowProfile(false)}
              >
                ×
              </span>
            </div>

            <div className="profile-user">
              <div className="profile-circle big">
                {getInitials()}
              </div>

              <div>
                <p className="profile-name">
                  {user?.displayName || "User"}
                </p>
                <p className="profile-email">
                  {user?.email}
                </p>
              </div>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              LOG OUT
            </button>
          </div>
        </div>
      )}

      {/* ================= ABOUT CONTENT ================= */}
      <main className="home-content about-page">
        <article className="about-container">
          <header className="about-header">
            <h1>About Us</h1>
            <p className="about-intro">
              Learn more about WishWell and our mission to fix gifting.
            </p>
          </header>

          <section className="about-section">
            <h2>About WishWell</h2>
            <p>
              <strong>WishWell</strong> is a leading app for wishlists and social
              shopping, empowering millions of users worldwide.
            </p>
            <p className="highlight">Wish. Share. Compare.</p>
          </section>

          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              Our mission is <strong>Fixing Gifting</strong>.
            </p>
          </section>

          <section className="about-section">
            <h2>Our Vision</h2>
            <p>
              WishWell aims to become the{" "}
              <strong>Global Genie of Social Shopping</strong>.
            </p>
          </section>
        </article>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="home-footer">
        <div className="home-footer-container">
          <img src={icon2} alt="WishWell" className="footer-logo" />

          <div className="footer-links">
            <div>
              <h4>Customer Service</h4>
              <p>mail@wishwell.com</p>
            </div>

            <div>
              <h4>Inspirations</h4>
              <p>Creators</p>
              <p>Brands</p>
              <p>Trending</p>
            </div>
          </div>

          <div className="footer-buttons">
            <img src={getinapple} alt="App Store" />
            <img src={getingoogle} alt="Google Play" />
          </div>

          <div className="footer-phone">
            <img src={footerimg} alt="App preview" />
          </div>
        </div>
      </footer>

      {/* ================= ADD WISH MODAL ================= */}
      <AddWishModal
        isOpen={showAddWish}
        onClose={() => setShowAddWish(false)}
      />
    </>
  );
}

