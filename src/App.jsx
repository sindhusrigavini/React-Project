import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./components/Landing";
import Chatbot from "./components/Chatbot";

export default function App() {
  return (
    <BrowserRouter>
      <Chatbot />

      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}
