import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const FunkyHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ['Home', 'Staff', 'Hobbies', 'Apply'];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-kawai-dark border-b-4 border-black p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer z-50">
            {/* Logo container with animated GIF */}
            <div className="relative w-12 h-12 bg-kawai-pink border-2 border-white shadow-[4px_4px_0px_0px_#00FFFF] group-hover:translate-y-1 group-hover:shadow-[2px_2px_0px_0px_#00FFFF] transition-all overflow-hidden">
              <img 
                src="https://media1.tenor.com/m/wr2bCL53YR8AAAAd/kubo-san-anime.gif"
                alt="Kubo Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-3xl font-display text-white tracking-wider kawai-text-effect">
              KAWAISCANS
            </h1>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <button 
                key={item}
                className="font-display text-xl text-white hover:text-kawai-yellow transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-kawai-cyan after:transition-all hover:after:w-full"
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white z-50 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/95 z-40 transition-transform duration-300 md:hidden flex flex-col items-center justify-center gap-8 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-kawai-pink via-kawai-cyan to-kawai-yellow"></div>
        
        {navItems.map((item, idx) => (
          <button 
            key={item}
            onClick={() => setIsMenuOpen(false)}
            className="font-display text-5xl text-white hover:text-kawai-cyan transition-colors transform hover:scale-110 hover:rotate-2"
            style={{ transitionDelay: `${idx * 50}ms` }}
          >
            {item.toUpperCase()}
          </button>
        ))}

        <div className="mt-8 flex gap-4">
           <div className="w-4 h-4 rounded-full bg-kawai-pink animate-bounce"></div>
           <div className="w-4 h-4 rounded-full bg-kawai-yellow animate-bounce delay-100"></div>
           <div className="w-4 h-4 rounded-full bg-kawai-cyan animate-bounce delay-200"></div>
        </div>
      </div>
    </>
  );
};