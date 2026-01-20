import React from 'react';
import { Link } from 'react-router-dom';

export default function Admin() {
  return (
    <div className="min-h-screen bg-kawai-dark flex items-center justify-center p-4 text-white font-body">
      <div className="bg-white border-4 border-kawai-pink shadow-funky p-8 max-w-md w-full text-center text-black">
        <h1 className="font-display text-4xl mb-4 text-kawai-purple">Admin Panel</h1>
        <p className="mb-6 font-bold">
          The admin panel has been disabled for this preview build to remove external dependencies.
        </p>
        <Link to="/" className="inline-block bg-kawai-yellow border-2 border-black px-6 py-2 font-display text-xl hover:bg-yellow-400 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
          Back to Home
        </Link>
      </div>
    </div>
  );
}