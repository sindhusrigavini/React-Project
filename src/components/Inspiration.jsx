import React, { useEffect, useState } from "react";
import "./wishlist.css";
import "./home.css";
import "./Inspiration.css";
import icon from "../assets/icon.png";
import wizard from "../assets/Wizard.svg";
import inspirationimg from "../assets/inspirationimg.svg";
import iconimg from "../assets/iconimg.png";
import sindhu from "../assets/sindhu.jpg";
import elsa from "../assets/elsa.jpeg";
import emma from "../assets/emma.webp";
import laura from "../assets/laura.webp";
import jessy from "../assets/jessy.webp";
import maih from "../assets/maih.jpeg";
import anna from "../assets/anna.webp";
import jumper from "../assets/jumper.webp";
import fezzy from "../assets/fezzy.webp";
import reli from "../assets/reli.webp";
import AddWishModal from "./AddWishModal";

import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

/* 🔥 TRENDING IMAGES */
import T1 from "../assets/T1.jpg";
import T2 from "../assets/T2.jpg";
import T3 from "../assets/T3.jpg";
import T4 from "../assets/T4.jpg";
import T5 from "../assets/T5.jpg";
import T6 from "../assets/T6.jpg";
import T7 from "../assets/T7.jpg";
import T8 from "../assets/T8.jpg";
import T9 from "../assets/T9.jpg";
import T10 from "../assets/T10.jpg";

/* FOOTER ASSETS */
import icon2 from "../assets/icon2.png";
import getingoogle from "../assets/getInGoogle.svg";
import getinapple from "../assets/getInApple.svg";
import footerimg from "../assets/FooterImage.png";

/* ✅ TRENDING DATA — UNCHANGED */
const trendingData = [
  { img: T1 },
  { img: T2 },
  { img: T3 },
  { img: T4 },
  { img: T5 },
  { img: T6 },
  { img: T7 },
  { img: T8 },
  { img: T9 },
  { img: T10 }
];

export default function Inspiration() {
  const [activeTab, setActiveTab] = useState("All");
  const [showAddWish, setShowAddWish] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) navigate("/");
      else setUser(currentUser);
    });
    return () => unsub();
  }, [navigate]);

  const getInitials = () => {
    if (!user) return "";
    if (user.displayName) {
      const p = user.displayName.split(" ");
      return (p[0][0] + (p[1] ? p[1][0] : "")).toUpperCase();
    }
    return user.email?.slice(0, 2).toUpperCase();
  };

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
            src={icon}
            alt="WishWell"
            className="home-logo"
            onClick={() => navigate("/home")}
          />
        </div>

        <nav className="home-navbar-center">
          <span onClick={() => navigate("/wishlists")}>Wishlists</span>
          <span onClick={() => navigate("/activity")}>Activity</span>
          <span style={{ color: "#1aa7d9", fontWeight: 600 }}>
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
        <div
          className="profile-overlay"
          onClick={() => setShowProfile(false)}
        >
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

      {/* ================= CONTENT ================= */}
      <main className="wishlist-page">
        <div style={{ display: "flex", gap: 28, marginBottom: 40 }}>
          {["All", "Products", "Creators", "Trending", "Brands"].map((tab) => (
            <span
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                cursor: "pointer",
                fontWeight: activeTab === tab ? 600 : 400,
                color: activeTab === tab ? "#1aa7d9" : "#bbb"
              }}
            >
              {tab}
            </span>
          ))}
        </div>

        {activeTab === "All" && (
          <>
            <h3 style={{ marginBottom: 6 }}>Inspiration 🔥</h3>
            <p style={{ color: "#777", marginBottom: 20 }}>
              See what’s the trend now
            </p>

            <div className="wishlist-grid">
              {trendingData.slice(0, 4).map((item, index) => (
                <div className="wishlist-card" key={index}>
                  <div style={{ position: "relative" }}>
                    <img src={item.img} alt="trend" />
                    <span
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        background: "#fff",
                        borderRadius: 8,
                        padding: "4px 8px",
                        fontWeight: 700
                      }}
                    >
                      ⋯
                    </span>
                  </div>
                  <div style={{ padding: 14 }}>
                    <strong>WishWell</strong>
                    <p style={{ fontSize: 13, color: "#777" }}>
                      WishWell · Sponsored
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ margin: "40px 0 20px" }}>Brands</h3>
            <div style={{ display: "flex", gap: 20 }}>
              <img src={iconimg} alt="brand" style={{ width: 100 }} />
            </div>
          </>
        )}

        {activeTab === "Products" && (
          <div style={{ textAlign: "center", padding: "80px 20px 140px" }}>
            <img src={wizard} alt="wizard" style={{ width: 140 }} />
            <h1 style={{ color: "#1aa7d9", margin: "20px 0 10px" }}>
              Help us inspire you!
            </h1>
            <p style={{ color: "#666", maxWidth: 520, margin: "0 auto" }}>
              Inspiration's are only visible to users over 13 years of age.
              <br />
              Please double check your age in profile settings.
            </p>
            <img
              src={inspirationimg}
              alt="inspiration"
              style={{ width: "100%", maxWidth: 720, marginTop: 50 }}
            />
          </div>
        )}

        {activeTab === "Creators" && (
          <>
            <h3 style={{ marginBottom: 20 }}>
              Suggested creators for you
            </h3>

            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {[
                { name: "Sindhu", img: sindhu, followers: "10,000 followers" },
                { name: "Elsa", img: elsa, followers: "7,450 followers" },
                { name: "Emma", img: emma, followers: "12,300 followers" },
                { name: "Laura", img: laura, followers: "5,980 followers" },
                { name: "Jessy", img: jessy, followers: "8,210 followers" },
                { name: "Maih", img: maih, followers: "6,740 followers" },
                { name: "Anna", img: anna, followers: "14,560 followers" },
                { name: "Jumper", img: jumper, followers: "9,430 followers" },
                { name: "Fezzy", img: fezzy, followers: "11,820 followers" },
                { name: "Reli", img: reli, followers: "4,990 followers" }
              ].map((creator, index) => (
                <div
                  key={index}
                  style={{
                    width: 220,
                    height: 300,
                    borderRadius: 18,
                    backgroundImage: `url(${creator.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                    color: "#fff"
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 18,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.7), transparent)"
                    }}
                  />
                  <div style={{ position: "absolute", bottom: 16, left: 16 }}>
                    <strong>{creator.name}</strong>
                    <p style={{ fontSize: 13, opacity: 0.9 }}>
                      {creator.followers}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "Trending" && (
          <>
            <h3 style={{ marginBottom: 20 }}>
              Inspiration 🔥 <br />
              <span style={{ fontSize: 14, color: "#777" }}>
                See what’s the trend now
              </span>
            </h3>

            <div className="wishlist-grid">
              {trendingData.map((item, index) => (
                <div className="wishlist-card" key={index}>
                  <div style={{ position: "relative" }}>
                    <img src={item.img} alt="trend" />
                    <span
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        background: "#fff",
                        borderRadius: 8,
                        padding: "4px 8px",
                        fontWeight: 700
                      }}
                    >
                      ⋯
                    </span>
                  </div>
                  <div style={{ padding: 14 }}>
                    <strong>WishWell</strong>
                    <p style={{ fontSize: 13, color: "#777" }}>
                      WishWell · Sponsored
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "Brands" && (
          <div style={{ display: "flex", gap: 20 }}>
            <img src={iconimg} alt="brand" style={{ width: 100 }} />
          </div>
        )}
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

      <AddWishModal
        isOpen={showAddWish}
        onClose={() => setShowAddWish(false)}
      />
    </>
  );
}
