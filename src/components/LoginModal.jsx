import React, { useState } from "react";
import "./loginModal.css";
import iconimg from "../assets/iconimg.png";
import { useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  EmailAuthProvider,
  linkWithCredential
} from "firebase/auth";

import { auth, googleProvider } from "../firebase";

export default function LoginModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // ✅ SAFE LOGIN (NO SPAM, AUTO-LINK)
  const handleLogin = async () => {
    if (loading) return; // ⛔ prevent multiple clicks

    if (!email || !password) {
      alert("Enter email & password");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Normal email/password login
      await signInWithEmailAndPassword(auth, email, password);

      setLoading(false);
      onClose();
      navigate("/home"); // ✅ ALWAYS redirects on success

    } catch (error) {
      setLoading(false);

      // ⏳ Firebase rate limit
      if (error.code === "auth/too-many-requests") {
        alert(
          "Too many attempts. Please wait a few minutes and try again."
        );
        return;
      }

      // 🔗 Google-first account → create password
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/account-exists-with-different-credential"
      ) {
        try {
          const methods = await fetchSignInMethodsForEmail(auth, email);

          if (methods.includes("google.com")) {
            alert(
              "You signed up using Google. Creating password now…"
            );

            const googleResult =
              await signInWithPopup(auth, googleProvider);

            const emailCredential =
              EmailAuthProvider.credential(email, password);

            await linkWithCredential(
              googleResult.user,
              emailCredential
            );

            alert("Password created successfully!");

            onClose();
            navigate("/home");
          }
        } catch (linkError) {
          alert(linkError.message);
        }

      } else if (error.code === "auth/wrong-password") {
        alert("Wrong password");

      } else if (error.code === "auth/user-not-found") {
        alert("No account found. Please sign up.");

      } else {
        alert(error.message);
      }
    }
  };

  // ✅ GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    if (loading) return;

    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      setLoading(false);
      onClose();
      navigate("/home");
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-modal">
        <span className="login-close" onClick={onClose}>×</span>

        <img src={iconimg} alt="Logo" className="login-logo" />
        <h2>Log in</h2>

        <input
          className="login-input"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="login-btn black"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "LOGGING IN..." : "LOGIN"}
        </button>

        <div className="login-or">or</div>

        <button
          className="login-btn white"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
}
