'use client';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/frontend/components/Navbar';
import Home from '@/frontend/pages/Home';
import Events from '@/frontend/pages/Events';
import Artists from '@/frontend/pages/Artists';
import Contact from '@/frontend/pages/Contact';
import '@/frontend/App.css';
import '@/frontend/index.css';

export default function ClientApp() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
