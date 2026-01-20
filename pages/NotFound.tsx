import React from 'react';
import { Link } from 'react-router-dom';
import { Ghost, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-kawai-dark flex flex-col items-center justify-center text-white p-4 font-body relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
           style={{backgroundImage: 'radial-gradient(#FF69B4 2px, transparent 2px)', backgroundSize: '30px 30px'}}>
      </div>

      <div className="relative z-10 text-center">
        <Ghost className="w-32 h-32 mx-auto mb-6 text-kawai-cyan animate-bounce drop-shadow-[4px_4px_0px_#000]" />
        
        <h1 className="font-display text-9xl text-kawai-pink mb-2 drop-shadow-[5px_5px_0px_#000]" style={{WebkitTextStroke: '2px black'}}>
          404
        </h1>
        
        <div className="bg-white border-4 border-black p-6 shadow-funky rotate-2 mb-8 max-w-md mx-auto">
           <p className="font-bold text-black text-xl uppercase">
             Nani?! This page doesn't exist.
           </p>
           <p className="text-gray-600 text-sm mt-2">
             You might be lost in the void.
           </p>
        </div>

        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-kawai-yellow text-black font-display text-2xl border-4 border-black shadow-[4px_4px_0px_#000] hover:translate-y-1 hover:shadow-none hover:bg-white transition-all"
        >
          <Home size={24} /> GO HOME
        </Link>
      </div>
    </div>
  );
}