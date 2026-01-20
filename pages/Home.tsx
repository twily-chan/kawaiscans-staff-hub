import React, { useState, useEffect } from 'react';
import { getStaffData, getMascotData } from '../utils/storage';
import { StaffMember, MascotData } from '../types';
import { FunkyHeader } from '../components/FunkyHeader';
import { StaffCard } from '../components/StaffCard';
import { ChartsSection } from '../components/ChartsSection';
import { AnimatedText } from '../components/AnimatedText';
import { KuboMascot } from '../components/KuboMascot';
import { Sparkles, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [staffData, setStaffData] = useState<StaffMember[]>([]);
  const [mascotData, setMascotData] = useState<MascotData | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [heroImage, setHeroImage] = useState("");

  useEffect(() => {
    const loadedStaff = getStaffData();
    const loadedMascot = getMascotData();
    setStaffData(loadedStaff);
    setMascotData(loadedMascot);
    
    if (loadedMascot && loadedMascot.gifs.length > 0) {
       setHeroImage(loadedMascot.gifs[Math.floor(Math.random() * loadedMascot.gifs.length)]);
    }

    // Auto rotate hero image every 6 seconds
    const interval = setInterval(() => {
      if (loadedMascot && loadedMascot.gifs.length > 0) {
         // Ensure we pick a new image different from the current one
         setHeroImage(prev => {
           let next = prev;
           let attempts = 0;
           while (next === prev && attempts < 5) {
             next = loadedMascot.gifs[Math.floor(Math.random() * loadedMascot.gifs.length)];
             attempts++;
           }
           return next;
         });
      }
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const roles = staffData.length > 0 
    ? ['All', ...Array.from(new Set(staffData.flatMap(s => s.roles)))] 
    : ['All'];

  const filteredStaff = filter === 'All' 
    ? staffData 
    : staffData.filter(s => s.roles.includes(filter as any));

  const randomizeHero = () => {
    if (mascotData && mascotData.gifs.length > 0) {
      setHeroImage(mascotData.gifs[Math.floor(Math.random() * mascotData.gifs.length)]);
    }
  };

  if (!mascotData) return <div className="min-h-screen flex items-center justify-center font-display text-4xl animate-pulse">LOADING...</div>;

  return (
    <div className="min-h-screen font-body text-kawai-dark pb-20 overflow-x-hidden selection:bg-kawai-pink selection:text-white">
      <FunkyHeader />
      
      {/* Fixed Mascot (Bottom Right) */}
      <KuboMascot />

      {/* Hero Section */}
      <section className="relative py-16 md:py-32 px-4 overflow-hidden bg-white/50 backdrop-blur-sm">
        
        {/* Background Splatter */}
        <div className="absolute top-0 right-0 w-[50%] h-full bg-kawai-yellow/30 skew-x-12 border-l-4 border-black -z-10"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-kawai-pink rounded-full blur-2xl opacity-40 animate-pulse"></div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          
          {/* Text Side */}
          <div className="md:w-1/2 text-center md:text-left space-y-8">
            <div className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 shadow-[8px_8px_0px_#FF69B4] hover:shadow-[4px_4px_0px_#FF69B4] hover:translate-x-1 hover:translate-y-1 transition-all transform -rotate-2">
               <Crown className="w-6 h-6 text-kawai-yellow" />
               <span className="font-glitch text-2xl tracking-widest">OFFICIAL SCANLATION HUB</span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-lego text-white stroke-black drop-shadow-[6px_6px_0px_#000] leading-[0.85]" style={{ WebkitTextStroke: '4px black', textShadow: '6px 6px 0px #000' }}>
              <span className="text-kawai-cyan">MEET</span> <br/> 
              <span className="text-kawai-pink">THE TEAM</span>
            </h1>
            
            <div className="relative inline-block max-w-lg mx-auto md:mx-0 p-6">
               <div className="absolute inset-0 bg-white border-4 border-black rotate-1 shadow-funky"></div>
               <div className="relative z-10">
                  <p className="text-2xl font-bold leading-relaxed">
                    <span className="text-kawai-purple font-manga text-4xl mr-2">Kubo says:</span> 
                    "We translate manga so you don't have to learn Japanese! Check out our staff's weird hobbies!"
                  </p>
               </div>
            </div>
          </div>

          {/* Anime Character Hero Image - Funky Spotlight */}
          <div className="md:w-1/2 w-full flex justify-center relative mt-10 md:mt-0">
             
             {/* Big Circle Backing */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-kawai-cyan/20 rounded-full border-4 border-black border-dashed animate-spin-slow -z-10"></div>
             
             <div 
                className="relative w-full max-w-[500px] aspect-square group cursor-pointer"
                onClick={randomizeHero}
                title="Click me to swap Kubo!"
             >
                {/* Manga Panel Frame */}
                <div className="absolute inset-0 bg-white border-8 border-black shadow-[12px_12px_0px_#FFD700] rotate-2 group-hover:rotate-0 transition-transform duration-500 overflow-hidden flex items-center justify-center">
                   
                   {/* Background Pattern */}
                   <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_black_2px,_transparent_2px)] bg-[length:20px_20px]"></div>
                   
                   {/* Rays */}
                   <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_transparent_0deg,_transparent_20deg,_rgba(255,105,180,0.2)_20deg,_rgba(255,105,180,0.2)_40deg,_transparent_40deg)] animate-[spin_20s_linear_infinite]"></div>

                   {/* Hero Image - Added key prop to force re-animation on change */}
                   <img 
                     key={heroImage}
                     src={heroImage || mascotData.fallbackImage} 
                     alt="Mascot Spotlight"
                     className="w-[110%] h-[110%] object-cover transform hover:scale-105 transition-transform duration-700 animate-pop-in"
                     onError={(e) => {
                       (e.target as HTMLImageElement).src = mascotData.fallbackImage; 
                     }}
                   />
                </div>

                {/* Decorations */}
                <div className="absolute -top-6 -right-6 bg-kawai-pink border-4 border-black p-4 text-white font-urban text-2xl shadow-funky rotate-12 animate-wiggle">
                  MASCOT <br/> <span className="text-black">KUBO</span>
                </div>
                
                <div className="absolute -bottom-8 -left-4 bg-kawai-yellow border-4 border-black px-6 py-2 text-black font-manga text-3xl shadow-funky -rotate-6">
                   SUGOI!
                </div>
             </div>
          </div>

        </div>

        {/* Floating background elements */}
        <Sparkles className="absolute top-20 left-10 w-16 h-16 text-kawai-cyan animate-spin-slow duration-3000 opacity-50" />
        <Sparkles className="absolute bottom-20 right-1/2 w-12 h-12 text-kawai-purple animate-bounce opacity-50" />
      </section>

      {/* Combined Staff & Hobbies Section for Navigation */}
      <div id="staff">
        {/* Stats Section */}
        <ChartsSection staffList={staffData} />

        {/* Staff Grid Section */}
        <main className="max-w-7xl mx-auto px-4 py-20 relative">
          <div className="absolute top-0 right-0 -z-10 opacity-5 pointer-events-none sticky top-20">
             <h2 className="text-[12rem] leading-none font-display text-black writing-vertical">KUBO</h2>
          </div>
          
          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {roles.map((role, idx) => (
              <button
                key={role}
                onClick={() => setFilter(role)}
                className={`
                  px-6 py-2 font-urban text-xl border-4 border-black transition-all duration-300
                  ${filter === role 
                    ? 'bg-kawai-pink text-white shadow-[2px_2px_0px_0px_#000] translate-y-1 scale-110' 
                    : 'bg-white text-black shadow-funky hover:-translate-y-1 hover:bg-kawai-cyan hover:rotate-2'}
                `}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {role.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
            {filteredStaff.map((staff, idx) => (
              <div key={staff.id} className="animate-pop-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <StaffCard staff={staff} />
              </div>
            ))}
          </div>

          {filteredStaff.length === 0 && (
            <div className="text-center py-20 bg-white border-4 border-black shadow-funky mx-auto max-w-lg">
              <h3 className="font-manga text-4xl text-black mb-4">Shiraishi is hiding...</h3>
              <p className="font-body text-xl">We can't find anyone with that role!</p>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t-8 border-kawai-pink relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-kawai-pink via-kawai-cyan to-kawai-yellow animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h2 className="font-lego text-6xl mb-4 text-kawai-yellow kawai-text-effect">
            <AnimatedText text="KAWAISCANS" />
          </h2>
          <p className="font-bold mb-8 text-xl">Made with <span className="text-red-500 animate-pulse inline-block">♥</span> and too much caffeine.</p>
          <div className="flex justify-center gap-6">
             <a href="https://discord.gg/xsFP9VBp7e" target="_blank" rel="noopener noreferrer" className="hover:text-kawai-cyan transition-colors font-urban uppercase underline decoration-wavy hover:scale-110 transform duration-200">Discord</a>
             <Link to="/apply" className="hover:text-kawai-cyan transition-colors font-urban uppercase underline decoration-wavy hover:scale-110 transform duration-200">Recruitment</Link>
          </div>
          <p className="mt-8 text-gray-500 text-sm">© 2024 Kawaiscans. Kubo-san is watching you.</p>
        </div>
      </footer>
    </div>
  );
}