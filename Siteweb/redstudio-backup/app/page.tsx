'use client';

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Artists from "./pages/Artists";
import Contact from "./pages/Contact";
import "./App.css";

type PageType = "home" | "events" | "artists" | "contact";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home setCurrentPage={setCurrentPage} />;
      case "events":
        return <Events setCurrentPage={setCurrentPage} />;
      case "artists":
        return <Artists setCurrentPage={setCurrentPage} />;
      case "contact":
        return <Contact setCurrentPage={setCurrentPage} />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="app">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="page-content">
        {renderPage()}
      </main>
    </div>
  );
}
