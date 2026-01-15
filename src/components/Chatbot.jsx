

import { useState, useEffect, useRef } from "react";
import "./chat.css";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  const initialMessage = {
    sender: "ai",
    text: "👋 Hi! I’m your <b>WishWell Assistant</b> 💙<br/>I can help you manage and organize your wishes.",
  };

  const [messages, setMessages] = useState([initialMessage]);

  /* Auto scroll */
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  /* Toggle body class to control bulb */
  useEffect(() => {
    document.body.classList.toggle("chat-open", isOpen);
  }, [isOpen]);

  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  /* 🔹 YOUR EXISTING QUESTIONS (UNCHANGED) */
    const qaData = [
    { q: "who created you", a: "I was created by Sindhu Sri Gavini! 💡" },
    { q: "who made you", a: "I was made by Sindhu Sri Gavini 😊" },
    { q: "your creator", a: "Sindhu Sri Gavini built me 🤖" },
    { q: "hello", a: "Hello! 😊 How can I help you with your wishes?" },
    { q: "hi", a: "Hi there! 👋 What would you like to add to your wishlist?" },
    { q: "hey", a: "Hey! 😊 How can I assist you today?" },
    { q: "thank you", a: "You're welcome! 😊" },
    { q: "bye", a: "Goodbye! 👋 Come back anytime!" },

    { q: "what is wishwell", a: "WishWell helps you save and organize all your wishes in one place 💙." },
    { q: "what does wishwell do", a: "WishWell lets you create wishlists and manage the things you want ✨." },
    { q: "who created wishwell", a: "WishWell was created by Sindhu Sri Gavini 💡." },
    { q: "who made wishwell", a: "WishWell was built by Sindhu Sri Gavini 😊." },

    { q: "add wish", a: "You can add a wish by clicking the ADD WISH button ➕." },
    { q: "create wish", a: "Click ADD WISH to create a new wish easily ✍️." },
    { q: "delete wish", a: "Open a wish and click Delete to remove it 🗑️." },
    { q: "edit wish", a: "You can edit a wish anytime by opening and updating it ✏️." },
    { q: "most wanted", a: "Most Wanted highlights the wishes you really want ⭐." },
    { q: "quantity", a: "You can set quantity if you want more than one item 🔢." },
    { q: "price", a: "Adding a price helps you track the cost of your wish 💰." },

    { q: "wishlist", a: "A wishlist stores all your saved wishes 📋." },
    { q: "my wishlist", a: "Your wishlist shows everything you’ve saved so far 💾." },

    { q: "save wish", a: "Your wishes are saved automatically 💾." },
    { q: "refresh", a: "No worries! Your wishes stay safe after refresh 🔄." },

    { q: "inspiration", a: "Inspiration shows trending ideas you may want to save 🔥." },
    { q: "brands", a: "Brands help you discover items for your wishlist 🏷️." },

    { q: "profile", a: "Your profile shows your account and wishlist activity 👤." },
    { q: "logout", a: "You can log out safely from the profile menu 🚪." },

    { q: "good morning", a: "Good morning ☀️ Ready to organize your wishes?" },
    { q: "good evening", a: "Good evening 🌙 Let’s manage your wishlist!" },
    { q: "help", a: "I can help you add wishes, manage wishlists, and understand features 😊." },
    { q: "exit", a: "See you soon 👋 Keep your wishes organized!" },
  ];

  const handleBotReply = (text) => {
    const lower = text.toLowerCase();
    const match = qaData.find((item) => lower.includes(item.q));

    if (match) {
      addMessage("ai", match.a);
    } else {
      addMessage(
        "ai",
        "🤍 I can help you with adding wishes, managing wishlists, and app features."
      );
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    addMessage("user", userText);
    setInput("");
    setTimeout(() => handleBotReply(userText), 300);
  };

  const refreshChat = () => {
    setMessages([initialMessage]);
    setInput("");
  };

  return (
    <>
      {/* Floating Bulb – ONLY when chat is closed */}
      {!isOpen && (
        <div className="floating-bulb" onClick={() => setIsOpen(true)}>
          💡
        </div>
      )}

      {/* Chat Box */}
      {isOpen && (
        <div id="chat-container">
          <div id="chat-box">
            {/* HEADER */}
            <div id="chat-header">
              <span>WishWell Assistant</span>
              <div className="chat-actions">
                <span className="chat-refresh" onClick={refreshChat}>↻</span>
                <span className="chat-close" onClick={() => setIsOpen(false)}>✕</span>
              </div>
            </div>

            {/* BODY */}
            <div id="chat-body" ref={chatRef}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`chat-msg ${msg.sender}`}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              ))}
            </div>

            {/* INPUT */}
            <div id="chat-input-area">
              <input
                type="text"
                placeholder="Ask something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button onClick={sendMessage}>➤</button>
            </div>

            <div id="chat-footer">Powered by WishWell</div>
          </div>
        </div>
      )}
    </>
  );
}
