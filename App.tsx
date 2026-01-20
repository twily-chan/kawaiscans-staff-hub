import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';

export default function App() {
  // We use BrowserRouter for clean URLs (e.g., /alog instead of #/alog).
  // Note: On GitHub Pages, refreshing a subpath like /alog might cause a 404 unless a 404.html redirect hack is used,
  // or the user navigates from the root.
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alog" element={<Admin />} />
        {/* Fallback for any other route to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}