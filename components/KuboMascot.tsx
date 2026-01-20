import React, { useState, useEffect } from 'react';
import { getMascotData } from '../utils/storage';
import { MascotData } from '../types';

export const KuboMascot: React.FC = () => {
  const [data, setData] = useState<MascotData | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>(''); 
  const [quote, setQuote] = useState('');

  // Load data and start rotation
  useEffect(() => {
    const loaded = getMascotData();
    setData(loaded);
    
    // Initial setup
    if (loaded && loaded.gifs.length > 0) {
      setImgSrc(loaded.gifs[Math.floor(Math.random() * loaded.gifs.length)]);
      setQuote(loaded.quotes[Math.floor(Math.random() * loaded.quotes.length)]);
    }

    // Auto rotate every 10 seconds
    const intervalId = setInterval(() => {
      if (loaded && loaded.gifs.length > 0) {
        setImgSrc(loaded.gifs[Math.floor(Math.random() * loaded.gifs.length)]);
        setQuote(loaded.quotes[Math.floor(Math.random() * loaded.quotes.length)]);
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  // Listen for storage changes (if admin updates while this tab is open)
  useEffect(() => {
    const handleStorageChange = () => {
      const newData = getMascotData();
      setData(newData);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);


  const updateRandom = () => {
    if (!data) return;
    const randomGif = data.gifs[Math.floor(Math.random() * data.gifs.length)];
    const randomQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];
    setImgSrc(randomGif);
    setQuote(randomQuote);
  };

  const handleHover = () => {
    if (!data) return;
    setIsHovered(true);
    setQuote(data.quotes[Math.floor(Math.random() * data.quotes.length)]);
  };

  const handleError = () => {
    if (data) {
      setImgSrc(data.fallbackImage);
    }
  };

  if (!data || !imgSrc) return null;

  return (
    <div className="fixed bottom-0 right-4 z-50 hidden md:block group">
      {/* Speech Bubble */}
      <div 
        className={`absolute -top-24 right-10 bg-white border-4 border-black p-4 rounded-xl shadow-funky transition-all duration-300 origin-bottom-right ${
          isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        <p className="font-display text-xl text-black min-w-[150px] text-center leading-tight">{quote}</p>
        <div className="absolute -bottom-4 right-4 w-6 h-6 bg-white border-r-4 border-b-4 border-black rotate-45"></div>
      </div>

      {/* Kubo Character Image */}
      <div 
        className="relative w-48 h-56 transition-transform duration-300 cursor-pointer hover:-translate-y-4 active:scale-95"
        onMouseEnter={handleHover}
        onMouseLeave={() => setIsHovered(false)}
        onClick={updateRandom}
        title="Click me!"
      >
        <img 
          src={imgSrc}
          alt="Kubo Nagisa Mascot"
          onError={handleError}
          className="w-full h-full object-contain drop-shadow-[5px_5px_0px_rgba(0,0,0,0.5)]"
        />
        
        {/* Sparkles on hover */}
        {isHovered && (
          <>
            <div className="absolute top-0 right-0 animate-bounce text-2xl">✨</div>
            <div className="absolute top-10 left-0 animate-spin-slow text-2xl">🌸</div>
          </>
        )}
      </div>
    </div>
  );
};