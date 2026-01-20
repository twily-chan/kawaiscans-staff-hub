import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Apply from './pages/Apply';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

export default function App() {
  // We use BrowserRouter now for clean URLs.
  // The 'basename' is automatically set from vite.config.ts (which reads your repo name).
  const baseUrl = import.meta.env.BASE_URL;

  // Clean "random" URL parameters injected by email scanners or trackers
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const paramsToRemove = ['_sm_pdc', '_sm_rid', '_sm_au', 'fbclid', 'utm_source', 'utm_medium', 'utm_campaign'];
      let changed = false;
      
      paramsToRemove.forEach(p => {
        if (url.searchParams.has(p)) {
          url.searchParams.delete(p);
          changed = true;
        }
      });

      if (changed) {
        window.history.replaceState({}, document.title, url.toString());
      }
    }
  }, []);

  return (
    <BrowserRouter basename={baseUrl}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/adlog" element={<Admin />} />
        
        {/* 404 Handler - Catches any other path */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}