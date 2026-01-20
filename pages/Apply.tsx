import React from 'react';
import { FunkyHeader } from '../components/FunkyHeader';
import { AnimatedText } from '../components/AnimatedText';

export default function Apply() {
  return (
    <div className="min-h-screen font-body text-kawai-dark pb-20 overflow-x-hidden bg-gray-50 selection:bg-kawai-pink selection:text-white">
      <FunkyHeader />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white border-4 border-black shadow-funky p-8 md:p-12 relative overflow-hidden">
          
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-kawai-yellow opacity-20 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-kawai-cyan opacity-20 rounded-tr-full"></div>

          <div className="relative z-10 space-y-8">
            <h1 className="text-5xl md:text-7xl font-display text-center mb-8 text-kawai-pink kawai-text-effect">
              ✨ Join Kawai Scanlation!
            </h1>

            <div className="prose prose-lg max-w-none font-body border-l-4 border-kawai-purple pl-6">
              <p className="text-xl font-bold">Hey there!</p>
              <p>
                Do you love our series and want to be part of helping us to bring those amazing stories to life? 📖
              </p>
              <p>We’re currently recruiting for the following positions:</p>
            </div>

            <div className="space-y-8">
              {/* Proofreader */}
              <div className="bg-gray-50 p-6 border-2 border-dashed border-black rounded-lg">
                <h2 className="text-2xl font-display text-kawai-purple mb-2">📝 Proofreader</h2>
                <p className="mb-4 text-sm font-bold">Mainly checks the whole dialogue scripts so that everything is fine.</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Applicant must be fluent in English. Natives are more preferred.</li>
                  <li>Applicant must have read novels at least 1 in their whole life.</li>
                  <li>Applicant must know how to understand a speaker's tone by just reading the texts/description or the manga panels.</li>
                  <li>Applicant must have basic common sense to make sure the speeches don't end up too big that they barely fit in a bubble. In this case, if an applicant know how to TS, that applicant will be preferred more</li>
                  <li className="font-bold text-red-500">Using any kind of AI's for this position is a liable act.</li>
                </ul>
              </div>

              {/* Redrawer */}
              <div className="bg-gray-50 p-6 border-2 border-dashed border-black rounded-lg">
                <h2 className="text-2xl font-display text-kawai-pink mb-2">🎨 Redrawer</h2>
                <p className="mb-4 text-sm font-bold">Clean and redraw manga pages.</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Applicant must have clear sense in drawing.</li>
                  <li>Applicant must have previous experience. Users new to drawing will be going through an harsh test.</li>
                  <li className="font-bold text-red-500">Using any kind of AI's for this position is a liable act.</li>
                </ul>
              </div>

              {/* Translator */}
              <div className="bg-gray-50 p-6 border-2 border-dashed border-black rounded-lg">
                <h2 className="text-2xl font-display text-kawai-cyan mb-2">🌐 Translator (Japanese)</h2>
                <p className="mb-4 text-sm font-bold">Translate raw text to English.</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Applicant's Japanese must be at least N5 or above</li>
                  <li>Applicant with proficiency at English will be preferred more</li>
                  <li>Applicant can join without any experience but then the applicant must at least know how a manga can be translated.</li>
                  <li className="font-bold text-red-500">Using any kind of AI's for this position is a liable act.</li>
                </ul>
              </div>

              {/* Quality Checker */}
              <div className="bg-gray-50 p-6 border-2 border-dashed border-black rounded-lg">
                <h2 className="text-2xl font-display text-kawai-yellow mb-2">🧩 Quality Checker</h2>
                <p className="mb-4 text-sm font-bold">Final check before release.</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Applicant must have all the skills (TS, RD, PR) mentioned above in possession.</li>
                  <li>Applicant who is not a translator but knows how to TS, RD or PR can join but a jack-of-all trade is more preferred</li>
                  <li className="font-bold text-red-500">Using any kind of AI's for this position is a liable act.</li>
                </ul>
              </div>
            </div>

            <div className="text-center pt-8">
              <a 
                href="https://discord.gg/GXTyX3pDas" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-12 py-4 bg-kawai-pink text-white font-display text-3xl border-4 border-black shadow-[8px_8px_0px_#000] hover:translate-y-1 hover:shadow-[4px_4px_0px_#000] hover:bg-kawai-dark transition-all transform hover:-rotate-2"
              >
                APPLY NOW!
              </a>
            </div>

          </div>
        </div>
      </main>

      <footer className="bg-black text-white py-12 border-t-8 border-kawai-pink relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-kawai-pink via-kawai-cyan to-kawai-yellow animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h2 className="font-display text-6xl mb-4 text-kawai-yellow kawai-text-effect">
            <AnimatedText text="KAWAISCANS" />
          </h2>
          <p className="font-bold mb-8 text-xl">Made with <span className="text-red-500 animate-pulse inline-block">♥</span> and too much caffeine.</p>
          <div className="flex justify-center gap-6">
             <a href="https://discord.gg/xsFP9VBp7e" className="hover:text-kawai-cyan transition-colors font-bold uppercase underline decoration-wavy hover:scale-110 transform duration-200">Discord</a>
             <a href="/apply" className="hover:text-kawai-cyan transition-colors font-bold uppercase underline decoration-wavy hover:scale-110 transform duration-200">Recruitment</a>
          </div>
          <p className="mt-8 text-gray-500 text-sm">© 2024 Kawaiscans. Kubo-san is watching you.</p>
        </div>
      </footer>
    </div>
  );
}