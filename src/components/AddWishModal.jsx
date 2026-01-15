import React, { useState, useEffect } from "react";
import "./addWishModal.css";
import infoIcon from "../assets/info.svg";
import addImageIcon from "../assets/add-image.svg";

export default function AddWishModal({
  isOpen,
  onClose,
  onAddWish,
  startManual = false
}) {
  const [step, setStep] = useState("link");

  /* 🔹 STATES (LOGIC ONLY – UI SAME) */
  const [productLink, setProductLink] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [mostWanted, setMostWanted] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setStep(startManual ? "manual" : "link");
    }
  }, [isOpen, startManual]);

  if (!isOpen) return null;

  /* ================= PASTE (ONLY PASTE) ================= */
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setProductLink(text);
    } catch {
      alert("Clipboard access denied");
    }
  };

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  /* ================= ADD WISH ================= */
  const handleAddWish = () => {
    onAddWish({
      id: Date.now(),
      name,
      description,
      link: productLink,
      price,
      quantity,
      mostWanted,
      image
    });

    onClose();
  };

  return (
    <div className="wish-overlay">
      <div className="wish-modal">

        {/* HEADER */}
        <div className="wish-modal-header">
          {step === "manual" ? (
            <button className="back-btn" onClick={() => setStep("link")}>
              ←
            </button>
          ) : (
            <img src={infoIcon} alt="Info" className="info-icon" />
          )}

          <h3 className="modal-title">Add wish</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* STEP 1 – LINK */}
        {step === "link" && (
          <div className="wish-link-step">
            <input
              placeholder="Insert product link"
              value={productLink}
              onChange={(e) => setProductLink(e.target.value)}
            />

            <button className="paste-btn" onClick={handlePaste}>
              PASTE
            </button>

            <div className="manual-link-wrapper">
              <button className="manual-btn" onClick={() => setStep("manual")}>
                or create manually <span className="arrow">›</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 – MANUAL (UI IDENTICAL TO COMMENTED CODE) */}
        {step === "manual" && (
          <div className="gowish-layout">

            {/* LEFT */}
            <div className="gowish-left">
              <label>Choose wishlist</label>
              <select className="gowish-input">
                <option>My wishlist</option>
              </select>

              <label>Name wish</label>
              <input
                className="gowish-input"
                placeholder="Enter wish name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <div className="gowish-most-wanted">
                <div>
                  <div className="mw-title">Most Wanted ⭐</div>
                  <div className="mw-desc">
                    Most wanted gifts are marked to let your friends know which gifts you love the most
                  </div>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={mostWanted}
                    onChange={(e) => setMostWanted(e.target.checked)}
                  />
                  <span className="slider" />
                </label>
              </div>

              <label>Description</label>
              <textarea
                className="gowish-textarea"
                placeholder="Enter a description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="gowish-price-qty">
                <div>
                  <label>Price</label>
                  <div className="price-card">
                    <span className="currency">INR</span>
                    <input
                      type="number"
                      className="price-input"
                      placeholder="0"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label>Quantity</label>
                  <div className="qty-card">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="gowish-right">
              <div className="upload-box">
                <input
                  type="file"
                  accept="image/*"
                  id="upload-img"
                  hidden
                  onChange={handleImageUpload}
                />
                <label htmlFor="upload-img">
                  {image ? (
                    <img src={image} alt="Preview" className="upload-preview" />
                  ) : (
                    <>
                      <img src={addImageIcon} alt="Upload" className="upload-img" />
                      <div className="upload-text">Upload product image</div>
                    </>
                  )}
                </label>
              </div>

              <label>Link to product</label>
              <input
                className="gowish-input"
                placeholder="Insert product link"
                value={productLink}
                onChange={(e) => setProductLink(e.target.value)}
              />

              <button className="gowish-btn" onClick={handleAddWish}>
                ADD WISH
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
