"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';





const Navbar = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="bg-black border-b border-green-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Logo section */}
            <div className="flex items-center gap-3">
           
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
               <Link href="/">Connect.Flow</Link>
              </span>
            </div>
            {/* Search bar */}
            <div className="relative w-64 md:w-80">
              <input
                type="text"
                placeholder="Search creators..."
                className="w-full bg-black/40 border border-green-500/30 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-green-500/70 focus:ring-1 focus:ring-green-500/50 placeholder-gray-400"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
          {/* Connect button and Dashboard button */}
          <div className="flex items-center gap-4">
            {mounted ? (
              <ConnectButton />
            ) : (
              <div className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold">
                Connect Wallet
              </div>
            )}
            
            <Link 
              href="/dashboard" 
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl border border-green-500/50 hover:bg-green-500/10 transition-all duration-300 group"
            >
              <span className="text-xl">📊</span>
              <span className="text-white font-medium">Your Dashboard</span>
              <svg className="w-5 h-5 text-green-400 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;