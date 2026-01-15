
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./wishlist.css";
import "./home.css";

/* ================= ASSETS ================= */
import iconimg from "../assets/icon.png";
import icon2 from "../assets/icon2.png";
import icon from "../assets/iconimg.png";
import getingoogle from "../assets/getInGoogle.svg";
import getinapple from "../assets/getInApple.svg";
import footerimg from "../assets/FooterImage.png";

/* ================= TRENDING IMAGES ================= */
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

/* ================= FIREBASE ================= */
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

/* ================= COMPONENTS ================= */
import AddWishModal from "./AddWishModal";

export default function WishlistPage() {
  const { brand } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showAddWish, setShowAddWish] = useState(false);
  const [startManual, setStartManual] = useState(false);

  /* ✅ PERSISTENT WISHES */
  const [wishes, setWishes] = useState(() => {
    return JSON.parse(localStorage.getItem("wishes")) || [];
  });

  const [selectedWish, setSelectedWish] = useState(null);

  /* ================= AUTH ================= */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) navigate("/");
      else setUser(currentUser);
    });
    return () => unsubscribe();
  }, [navigate]);

  /* ================= SAVE ================= */
  useEffect(() => {
    localStorage.setItem("wishes", JSON.stringify(wishes));
  }, [wishes]);

  /* ================= HELPERS ================= */
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

  /* ================= ADD ================= */
  const handleAddWish = (wish) => {
    const newWish = {
      id: crypto.randomUUID(),
      name: wish.name || "Untitled wish",
      image: wish.image || iconimg,
      link: wish.link || "",
      mostWanted: wish.mostWanted || false,
    };
    setWishes((prev) => [...prev, newWish]);
  };

  /* ================= DELETE ================= */
  const handleDeleteWish = (id) => {
    setWishes((prev) => prev.filter((w) => w.id !== id));
    setSelectedWish(null);
  };

  /* ================= TRENDING ================= */
  const trending = [
    { img: T1 }, { img: T2 }, { img: T3 }, { img: T4 }, { img: T5 },
    { img: T6 }, { img: T7 }, { img: T8 }, { img: T9 }, { img: T10 },
  ];

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
          />
        </div>

        <nav className="home-navbar-center">
          <span onClick={() => navigate("/wishlists")}>Wishlists</span>
          <span onClick={() => navigate("/activity")}>Activity</span>
          <span onClick={() => navigate("/inspiration")}>Inspiration</span>
        </nav>

        {/* ✅ UPDATED NAV RIGHT (MATCHES INSPIRATION) */}
        <div className="home-navbar-right">
          <button
            className="add-wish-btn"
            onClick={() => {
              setStartManual(true);
              setShowAddWish(true);
            }}
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

      {/* ================= GRID VIEW ================= */}
      {!selectedWish && (
        <main className="wishlist-page">
          <section className="profile-section">
            <div className="profile-avatar">{getInitials()}</div>
            <div>
              <h2>{user?.displayName}</h2>
              <p>{wishes.length} wishes · 1 wishlist</p>
            </div>
          </section>

          <section className="wishlist-section">
            <h3>My wishlists</h3>

            <div className="wishlist-grid">
              {wishes.map((wish) => (
                <div
                  key={wish.id}
                  className="wishlist-card"
                  onClick={() => setSelectedWish(wish)}
                >
                  <img src={wish.image || iconimg} alt={wish.name} />
                  <p>
                    {wish.name}
                    {wish.mostWanted && " ⭐"}
                  </p>
                </div>
              ))}

              {brand && (
                <div className="wishlist-card">
                  <img src={iconimg} alt="WishWell" />
                  <p>WishWell</p>
                </div>
              )}

              <div
                className="wishlist-card create"
                onClick={() => {
                  setStartManual(true);
                  setShowAddWish(true);
                }}
              >
                <span>+</span>
                <p>Create wishlist</p>
              </div>
            </div>
          </section>

          {/* ================= INSPIRATION ================= */}
          <section className="inspiration">
            <h3>Inspiration 🔥</h3>
            <p>See what’s the trend now</p>

            <div className="trending-row">
              {trending.map((item, index) => (
                <div
                  key={index}
                  className="trend-card"
                  style={{
                    backgroundImage: `linear-gradient(
                      rgba(0,0,0,0.25),
                      rgba(0,0,0,0.55)
                    ), url(${item.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              ))}
            </div>
          </section>
        </main>
      )}

      {/* ================= DETAIL VIEW ================= */}
      {selectedWish && (
        <main className="wish-detail-page">
          <div className="wish-detail-left">
            <img src={selectedWish.image || iconimg} alt={selectedWish.name} />
          </div>

          <div className="wish-detail-right">
            <h1>{selectedWish.name}</h1>

            <button
              className="go-to-store-btn"
              onClick={() =>
                selectedWish.link &&
                window.open(selectedWish.link, "_blank")
              }
            >
              Go to store →
            </button>

            <button
              className="delete-wish-btn"
              onClick={() => handleDeleteWish(selectedWish.id)}
            >
              Delete wish
            </button>

            <button
              className="back-btn"
              onClick={() => setSelectedWish(null)}
            >
              ← Back
            </button>
          </div>
        </main>
      )}

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
        startManual={startManual}
        onAddWish={handleAddWish}
      />
    </>
  );
}

