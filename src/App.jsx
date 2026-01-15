import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/landing";
import Chatbot from "./components/Chatbot";
import Home from "./components/Home";
import WishlistPage from "./components/wishlistPage";
import Activity from "./components/Activity";        // ✅ ADD
import Inspiration from "./components/Inspiration";  // ✅ ADD

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LANDING */}
        <Route
          path="/"
          element={
            <>
              <Landing />
              <Chatbot />
            </>
          }
        />

        {/* LOGGED-IN PAGES */}
        <Route path="/home" element={<Home />} />
        <Route path="/wishlists" element={<WishlistPage />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/inspiration" element={<Inspiration />} />
      </Routes>
    </BrowserRouter>
  );
}
