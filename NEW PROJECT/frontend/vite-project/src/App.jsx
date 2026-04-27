import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

import { Routes, Route } from "react-router-dom";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import { Toaster } from "react-hot-toast";
import { THEMES } from "./constants";

const VALID_THEMES = new Set(THEMES.map((themeOption) => themeOption.name));

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    const nextTheme = VALID_THEMES.has(theme) ? theme : "forest";
    document.documentElement.setAttribute("data-theme", nextTheme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;