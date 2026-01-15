import React, { useState } from "react";
import "./landing.css";
import heroImg from "../assets/home.png";
import page2Img from "../assets/2page.png";
import phoneImg from "../assets/phone.png";
import phoneImg2 from "../assets/phone1.png";
import phoneImg3 from "../assets/phone2.png";
import laptopimg from "../assets/laptopimg.png";
import footerimg from "../assets/FooterImage.png";
import getingoogle from "../assets/getInGoogle.svg";
import getinapple from "../assets/getInApple.svg";
import icon2 from "../assets/icon2.png";
import Navbar from "./navbar";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

export default function Landing() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      <Navbar
        onLogin={() => setShowLogin(true)}
        onSignup={() => setShowSignup(true)}
      />

      {/* ================= HERO ================= */}
      <section className="wishwell-hero">
        <div className="wishwell-hero-left">
          <span className="wishwell-tag">GET STARTED WITH WISHWELL</span>

          <h1 className="wishwell-title">
            All your wishes <br /> in one place
          </h1>

          <p className="wishwell-desc">
            WishWell makes it easy to save and share all your wishes.
          </p>

          <button
            className="wishwell-btn"
            onClick={() => setShowSignup(true)}
          >
            CREATE YOUR ACCOUNT
          </button>
        </div>
        <div className="wishwell-hero-right">
          <img
            src={heroImg}
            alt="WishWell App"
            className="wishwell-phones"
          />
        </div>
      </section>
      {/* ================= PAGE 2 ================= */}
      <section className="wishwell-page2">
        <img src={page2Img} alt="Brands" />
      </section>

      {/* ================= PAGE 3 ================= */}
      <section className="wishwell-page3">
        <div className="wishwell-page3-container">
          <div className="wishwell-page3-left">
            <h2>Save wishes from all your favorite brands</h2>
            <p>Available on desktop, tablet, and mobile.</p>

            <button
              className="wishwell-page3-btn"
              onClick={() => setShowSignup(true)}
            >
              CREATE WISHLIST
            </button>
          </div>

          <div className="wishwell-page3-right">
            <div>
              <span className="wishwell-stat-number">+16M</span>
              <p className="wishwell-stat-label">users created</p>
            </div>
            <div>
              <span className="wishwell-stat-number">+500M</span>
              <p className="wishwell-stat-label">wishes created</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PAGE 4 ================= */}
      <section className="wishwell-page4">
        <h2 className="page4title">How WishWell works</h2>

        <div className="wishwell-page4-container">
          <img
            src={phoneImg}
            alt="Create"
            className="wishwell-page4-phone"
          />
          <div className="wishwell-page4-right">
            <h3>Create wishes & wishlists</h3>
            <p>Save all your wishes in one place.</p>
          </div>
        </div>
      </section>

      {/* ================= PAGE 5 ================= */}
      <section className="wishwell-page5">
        <div className="wishwell-page5-container">
          <div className="wishwell-page5-left">
            <h2>Share with friends & family</h2>
            <p>Easily share your wishlist.</p>
          </div>
          <img
            src={phoneImg2}
            alt="Share"
            className="wishwell-page5-phone"
          />
        </div>
      </section>

      {/* ================= PAGE 6 ================= */}
      <section className="wishwell-page6">
        <div className="wishwell-page6-container">
          <img
            src={phoneImg3}
            alt="Avoid"
            className="wishwell-page6-phone"
          />
          <div className="wishwell-page6-right">
            <h2>Avoid duplicate gifts</h2>
            <p>Friends can reserve wishes.</p>
          </div>
        </div>
      </section>

      {/* ================= PAGE 7 ================= */}
      <section className="wishwell-page7">
        <div className="wishwell-page7-container">
          <div>
            <h2>WishWell Chrome extension</h2>
            <button className="wishwell-page7-btn">
              CHROME WEB STORE
            </button>
          </div>
          <img src={laptopimg} alt="Extension" />
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <section className="wishwell-footer">
        <div className="wishwell-footer-container">
          <img src={icon2} alt="Icon" className="wishwell-footer-icon" />

          <div className="wishwell-footer-links">
            <div>
              <h4>Customer Service</h4>
              <p>mail@wishwell.com</p>
            </div>
            <div>
              <h4>Inspirations</h4>
              <p>Brands</p>
              <p>Gift cards</p>
              <p>Events</p>
            </div>
          </div>

          <div className="wishwell-footer-buttons">
            <img src={getinapple} alt="App Store" />
            <img src={getingoogle} alt="Google Play" />
          </div>

          <img src={footerimg} alt="App Preview" />
          
        </div>
      </section>

      {/* ================= AUTH MODALS ================= */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      />

      <SignupModal
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        openLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />

      <button className="ai-bulb">💡</button>
    </>
  );
}
