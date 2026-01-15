import React, { useEffect, useState } from "react";
import "./activity.css";

import icon2 from "../assets/icon2.png";
import icon1 from "../assets/icon.png";
import iconimg from "../assets/iconimg.png";
import getingoogle from "../assets/getInGoogle.svg";
import getinapple from "../assets/getInApple.svg";
import footerimg from "../assets/FooterImage.png";

import AddWishModal from "./AddWishModal";

import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Activity() {
  const [showAddWish, setShowAddWish] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [followed, setFollowed] = useState(false);

  const navigate = useNavigate();

  /* 🔐 Auth protection */
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

  /* 👤 Initials */
  const getInitials = () => {
    if (!user) return "";
    if (user.displayName) {
      const parts = user.displayName.split(" ");
      return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
    }
    return user.email?.slice(0, 2).toUpperCase();
  };

  /* 🚪 Logout */
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <>
      {/* ================= NAVBAR (FROM HOME) ================= */}
      <header className="home-navbar">
        <div className="home-navbar-left">
          <img
            src={icon1}
            alt="WishWell"
            className="home-logo"
            onClick={() => navigate("/home")}
          />
        </div>

        <nav className="home-navbar-center">
          <span onClick={() => navigate("/wishlists")}>Wishlists</span>
          <span className="active">Activity</span>
          <span onClick={() => navigate("/inspiration")}>Inspiration</span>
        </nav>

        <div className="home-navbar-right">
          <button className="add-wish-btn" onClick={() => setShowAddWish(true)}>
            ADD WISH
          </button>
          <span className="icon">🔔</span>

          <span
            className="profile-circle"
            onClick={() => setShowProfile(true)}
          >
            {getInitials()}
          </span>
        </div>
      </header>

      {/* ================= PROFILE ================= */}
      {showProfile && (
        <div className="profile-overlay" onClick={() => setShowProfile(false)}>
          <div className="profile-panel" onClick={(e) => e.stopPropagation()}>
            <div className="profile-header">
              <h3>Profile</h3>
              <span className="close-btn" onClick={() => setShowProfile(false)}>
                ×
              </span>
            </div>

            <div className="profile-user">
              <div className="profile-circle big">{getInitials()}</div>
              <div>
                <p className="profile-name">{user?.displayName || "User"}</p>
                <p className="profile-email">{user?.email}</p>
              </div>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              LOG OUT
            </button>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY LAYOUT ================= */}
      <main className="activity-page">
        {/* LEFT SIDEBAR */}
        <aside className="activity-sidebar">
          <ul>
            <li className="active">All</li>
            <li>Wishlists</li>
            <li>Brands</li>
            <li>Creator</li>
          </ul>

          <div className="suggested-brands">
            <h4>Suggested brands</h4>

            <div className="brand-row">
              <div className="brand-info">
                <img src={iconimg} alt="GoWish" />
                <span>GoWish</span>
              </div>

              <button
                className={followed ? "unfollow" : "follow"}
                onClick={() => setFollowed(!followed)}
              >
                {followed ? "UNFOLLOW" : "FOLLOW"}
              </button>
            </div>

            <p className="show-more">SHOW MORE</p>
          </div>
        </aside>

        {/* FEED */}
        <section className="activity-feed">
          <h2>Feed</h2>

          {followed && (
            <div className="toast">
              ✔ Brand GoWish followed successfully
            </div>
          )}

          <p className="empty-text">
            You are out of suggestions, come back later to check for more.
          </p>
        </section>
      </main>

      {/* ================= FOOTER (FROM HOME) ================= */}
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
