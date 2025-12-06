import { useState, useEffect, useRef } from "react";
import "./chat.css";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "<b>I am Gifty AI😊</b><br><br>Ask me any occasion and I'll suggest gifts!",
    },
  ]);

  const [input, setInput] = useState("");
  const [hasSuggested, setHasSuggested] = useState(false);
  const chatRef = useRef(null);

  // ⭐ NEW: Toggle chatbot from Navbar
  useEffect(() => {
    function toggleAssistant() {
      setIsOpen(prev => !prev);
    }
    window.addEventListener("toggle-gifty-ai", toggleAssistant);
    return () => window.removeEventListener("toggle-gifty-ai", toggleAssistant);
  }, []);

  function format(text) {
    return text.replace(/\n/g, "<br>");
  }

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  function addUserMessage(text) {
    setMessages((prev) => [...prev, { sender: "user", text: format(text) }]);
  }

  function addBotMessage(text) {
    setMessages((prev) => [...prev, { sender: "ai", text: format(text) }]);
  }

  function sendMessage() {
    if (!input.trim()) return;
    const text = input.trim();
    addUserMessage(text);
    setInput("");

    setTimeout(() => handleUserMessage(text), 400);
  }

  const qaData = [
    { q: "what is gifty", a: "Gifty helps you find perfect gifts 🎁." },
    { q: "who created you", a: "I was created by Sindhu Sri Gavini! 💡" },
    { q: "who made you", a: "I was made by Sindhu Sri Gavini 😊" },
    { q: "your creator", a: "Sindhu Sri Gavini built me 🤖" },
    { q: "hello", a: "Hello! 😊 How can I help you?" },
    { q: "hi", a: "Hi there! 👋 What occasion are you planning?" },
    { q: "hey", a: "Hey! 😊 How can I assist?" },
    { q: "thank you", a: "You're welcome! 😊" },
    { q: "bye", a: "Goodbye! 👋 Come back anytime!" },
  ];

  function handleUserMessage(text) {
    const lower = text.toLowerCase();

    const match = qaData.find((item) => lower.includes(item.q));
    if (match) return addBotMessage(match.a);

    const giftWords = ["birthday", "anniversary", "valentine", "farewell", "annual", "gift"];

    if (giftWords.some((w) => lower.includes(w))) {
      if (!hasSuggested) {
        setHasSuggested(true);
        addBotMessage("Great! Let me suggest some gifts 💡");
        return showButtons();
      } else {
        return showGiftSuggestions(text);
      }
    }

    addBotMessage("Tell me the occasion & I'll suggest gifts 🎁");
  }

  function showButtons() {
    addBotMessage(`
      <b>Choose an occasion 🎁</b><br><br>
      <button class="occ-btn" data-occ="birthday">🎂 Birthday</button>
      <button class="occ-btn" data-occ="anniversary">💖 Anniversary</button>
      <button class="occ-btn" data-occ="valentine">❤️ Valentine's Day</button>
      <button class="occ-btn" data-occ="farewell">👋 Farewell</button>
      <button class="occ-btn" data-occ="annual">🏆 Annual Day</button>
    `);
  }

  function showGiftSuggestions(text) {
    const lower = text.toLowerCase();
    let occasion = "";
    let links = [];

    if (lower.includes("birthday")) {
      occasion = "Birthday";
      links = [
        { label: "🎂 Birthday Explosion Box – Amazon", url: "https://www.amazon.in/s?k=birthday+explosion+box" },
        { label: "🎁 Personalized Birthday Mug – Amazon", url: "https://www.amazon.in/s?k=personalized+birthday+mug" },
        { label: "🎉 Birthday Gift Combo – Flipkart", url: "https://www.flipkart.com/search?q=birthday+gift+combo" },
        { label: "🎈 Birthday Greeting Card – Flipkart", url: "https://www.flipkart.com/search?q=birthday+greeting+card" },
      ];
    }

    else if (lower.includes("anniversary")) {
      occasion = "Anniversary";
      links = [
        { label: "💞 Couple Photo Frame – Amazon", url: "https://www.amazon.in/s?k=couple+photo+frame+anniversary" },
        { label: "💖 Heart LED Lamp – Amazon", url: "https://www.amazon.in/s?k=heart+led+lamp+anniversary" },
        { label: "💝 Romantic Gift Box – Flipkart", url: "https://www.flipkart.com/search?q=anniversary+gift+box" },
        { label: "🕯️ Love Candle Set – Flipkart", url: "https://www.flipkart.com/search?q=romantic+candle+set" },
      ];
    }

    else if (lower.includes("valentine")) {
      occasion = "Valentine's Day";
      links = [
        { label: "❤️ Valentine Hamper – Amazon", url: "https://www.amazon.in/s?k=valentine+gift+hamper" },
        { label: "💌 Love Explosion Box – Amazon", url: "https://www.amazon.in/s?k=love+explosion+box" },
        { label: "💖 Valentine Gift Combo – Flipkart", url: "https://www.flipkart.com/search?q=valentine+gift+combo" },
        { label: "🌹 Rose Teddy Gift – Flipkart", url: "https://www.flipkart.com/search?q=rose+teddy+gift" },
      ];
    }

    else if (lower.includes("farewell")) {
      occasion = "Farewell";
      links = [
        { label: "👋 Farewell Mug – Amazon", url: "https://www.amazon.in/s?k=farewell+mug" },
        { label: "📘 Farewell Diary – Amazon", url: "https://www.amazon.in/s?k=farewell+diary" },
        { label: "🎁 Farewell Gift Combo – Flipkart", url: "https://www.flipkart.com/search?q=farewell+gift+combo" },
        { label: "🖊️ Pen Gift Set – Flipkart", url: "https://www.flipkart.com/search?q=pen+set+gift" },
      ];
    }

    else if (lower.includes("annual")) {
      occasion = "Annual Day";
      links = [
        { label: "🏆 Corporate Trophy – Amazon", url: "https://www.amazon.in/s?k=corporate+trophy+gift" },
        { label: "🎖️ Appreciation Plaque – Amazon", url: "https://www.amazon.in/s?k=appreciation+plaque+award" },
        { label: "🎁 Employee Gift Set – Flipkart", url: "https://www.flipkart.com/search?q=employee+gift+set" },
        { label: "🕯️ Office Desk Decor – Flipkart", url: "https://www.flipkart.com/search?q=office+desk+decor+gift" },
      ];
    }

    const html = `
      <b>Here are some ${occasion} ideas 🎁:</b><br><br>
      ${links
        .map(
          (l) =>
            `<a href="${l.url}" target="_blank" style="color:#1976D2; text-decoration:none; font-weight:500;">${l.label}</a>`
        )
        .join("<br>")}
    `;

    addBotMessage(html);
  }

  function handleBotClick(e) {
    if (e.target.classList.contains("occ-btn")) {
      const occ = e.target.dataset.occ;
      addUserMessage(occ);
      showGiftSuggestions(occ);
    }
  }

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "25px",
            right: "25px",
            background: "#1976D2",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "22px",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
          }}
          onClick={() => setIsOpen(true)}
        >
          💡
        </div>
      )}

      {/* Chatbox */}
      {isOpen && (
        <div id="chat-container">
          <div id="chat-box">
            <div id="chat-header">
              AI Assistant
              <span className="chat-close" onClick={() => setIsOpen(false)}>✕</span>
            </div>

            <div id="chat-body" ref={chatRef} onClick={handleBotClick}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`chat-msg ${msg.sender}`}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              ))}
            </div>

            <div id="chat-input-area">
              <input
                type="text"
                placeholder="Ask for help..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button id="send-btn" onClick={sendMessage}>➤</button>
            </div>

            <div id="chat-footer">Powered by Gifty (Beta)</div>
          </div>
        </div>
      )}
    </>
  );
}
