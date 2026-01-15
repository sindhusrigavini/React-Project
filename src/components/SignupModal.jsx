import React, { useState } from "react";
import "./loginModal.css";
import "./SignupModal.css";
import iconimg from "../assets/iconimg.png";

import {
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

import { auth } from "../firebase";

export default function SignupModal({ isOpen, onClose, openLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Enter name, email & password");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Create account
      const userCredential =
        await createUserWithEmailAndPassword(auth, email, password);

      // 2️⃣ Save name in Firebase profile
      await updateProfile(userCredential.user, {
        displayName: name
      });

      setLoading(false);
      alert("Account created. Please log in.");
      onClose();
      openLogin(); // 🔁 switch to login

    } catch (error) {
      setLoading(false);

      if (error.code === "auth/email-already-in-use") {
        alert("Account already exists. Please log in.");
        onClose();
        openLogin();
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-modal">
        <span className="login-close" onClick={onClose}>×</span>

        <img src={iconimg} alt="Logo" className="login-logo" />
        <h2>Create Account</h2>

        {/* 👤 NAME */}
        <input
          className="login-input"
          type="text"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

        {/* 📧 EMAIL */}
        <input
          className="login-input"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* 🔑 PASSWORD */}
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="login-btn email"
          onClick={handleSignup}
          disabled={loading}
        >0
          {loading ? "CREATING..." : "CREATE ACCOUNT"}
        </button>
      </div>
    </div>
  );
}
