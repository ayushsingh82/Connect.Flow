"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Placeholder Logo component
const Logo = () => (
  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-bold text-white">CF</div>
);

// Placeholder ConnectButton
const ConnectButton = () => (
  <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">Connect Wallet</button>
);

// Extend Window interface for TradingView
declare global {
  interface Window {
    TradingView: any;
  }
}

const NOUNS_IMAGE_BASE = "https://noun.pics/";

const Buy = () => {
  const searchParams = useSearchParams();
  const [selectedMinutes, setSelectedMinutes] = useState(15);
  const [showChart, setShowChart] = useState(false);
  const basePrice = 50; // Base price for 1 minute

  // Get creator data from URL parameters
  const creatorName = searchParams.get('name') || "Alex Thompson";
  const creatorTwitter = searchParams.get('twitter') || "alexdev";
  const creatorTitle = searchParams.get('title') || "Senior Blockchain Developer";
  const creatorBio = searchParams.get('bio') || "Senior Blockchain Developer | Expert in Solidity and Web3 Development";
  const creatorTokenSymbol = searchParams.get('tokenSymbol') || "FLOW";
  const creatorFlowRate = searchParams.get('flowRate') || "50 FLOW/min";
  const creatorId = searchParams.get('id') || "1290";
  const creatorTags = searchParams.get('tags') ? searchParams.get('tags')!.split(',') : ["Blockchain", "Web3", "Solidity"];

  // Extract flow rate number for calculations
  const flowRateNumber = parseInt(creatorFlowRate.split(' ')[0]) || basePrice;

  const [selectedCreator, setSelectedCreator] = useState({
    name: creatorName,
    username: creatorTwitter.replace('@', ''),
    rate: flowRateNumber,
    growth: "-14.48%",
    responseRate: "100%",
    bio: creatorBio,
    tags: creatorTags,
    nounId: parseInt(creatorId) || 1290
  });

  // Update selectedCreator when URL params change
  useEffect(() => {
    setSelectedCreator({
      name: creatorName,
      username: creatorTwitter.replace('@', ''),
      rate: flowRateNumber,
      growth: "-14.48%",
      responseRate: "100%",
      bio: creatorBio,
      tags: creatorTags,
      nounId: parseInt(creatorId) || 1290
    });
  }, [creatorName, creatorTwitter, creatorTitle, creatorBio, creatorTokenSymbol, creatorFlowRate, creatorId, creatorTags, flowRateNumber]);

  useEffect(() => {
    if (showChart) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.TradingView) {
          new window.TradingView.widget({
            "width": "100%",
            "height": 400,
            "symbol": "BINANCE:FLOWUSDT",
            "interval": "15",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "toolbar_bg": "#1a1a1a",
            "enable_publishing": false,
            "allow_symbol_change": true,
            "container_id": "tradingview_chart",
            "studies": []
          });
        }
      };

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [showChart]);

  const calculateTotalPrice = (minutes: number) => {
    return (selectedCreator.rate * minutes).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Nav bar with Link */}
   

      {/* Main content - split into two columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column */}
          <div className="w-full md:w-1/2">
            {/* Profile section - outside of box */}
            <div className="mb-8">
              <div className="flex items-start gap-6 mb-8">
                <img 
                  src={`${NOUNS_IMAGE_BASE}${selectedCreator.nounId}.png`}
                  alt={selectedCreator.name}
                  className="w-24 h-24 rounded-full border-2 border-green-500/50"
                />
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{selectedCreator.name}</h1>
                  <p className="text-green-400 text-sm mb-4">{creatorTwitter}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 font-bold text-xl">{selectedCreator.rate} FLOW</span>
                      <span className="text-white/60">/ min</span>
                    </div>
                    <span className="text-green-500">{selectedCreator.growth}</span>
                    <span className="text-green-400">{selectedCreator.responseRate} response rate</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-center mb-8">
                <button className="px-6 py-2 border border-green-500/50 text-green-400 rounded-lg hover:bg-green-500/10 text-sm">
                  Add to watchlist
                </button>
                <button className="p-2 border border-green-500/50 text-green-400 rounded-lg hover:bg-green-500/10">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
              </div>

              <div className="flex gap-6 mb-8">
                <button className="text-white/80 hover:text-green-400">About Me</button>
                <button className="text-white/80 hover:text-green-400">Market</button>
                <button className="text-white/80 hover:text-green-400">Activity</button>
              </div>

              {/* Enhanced horizontal line */}
              <div className="w-full h-px bg-gradient-to-r from-green-500/0 via-green-500 to-green-500/0 mb-8 shadow-lg shadow-green-500/50"></div>

              <p className="text-white/80 mb-6">{selectedCreator.bio}</p>

              <div className="flex flex-wrap items-center gap-2 mb-12">
                {selectedCreator.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Access title moved outside box */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-2">Get access to {selectedCreator.name}</h2>
                <p className="text-white/80">Use your purchased minutes to connect with this creator</p>
              </div>

              {/* Access section - in box */}
              <div className="bg-black/60 backdrop-blur-md border border-green-500/50 rounded-xl p-8">
                {/* Direct Message option */}
                <div className="bg-black/40 border border-green-500/30 rounded-lg p-6 mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-white">Direct Message</h3>
                  </div>
                  <p className="text-white/60 mb-4">Chat directly with the creator through our messaging system</p>
                </div>

                {/* Voice Call option */}
                <div className="bg-black/40 border border-green-500/30 rounded-lg p-6 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-white">Voice Call</h3>
                  </div>
                  <p className="text-white/60 mb-4">Schedule a voice call with the creator</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/2">
            <div className="bg-black/60 backdrop-blur-md border border-green-500/50 rounded-xl p-8">
              <div className="flex gap-4 mb-8">
                <button className="flex-1 py-2 bg-green-500 text-white rounded-lg font-semibold">Buy</button>
                <button className="flex-1 py-2 border border-green-500/50 text-green-400 rounded-lg">Sell</button>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-semibold text-white mb-4">Buy Minutes</h2>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-green-400">{selectedCreator.rate} FLOW</span>
                  <span className="text-green-500">{selectedCreator.growth}</span>
                </div>
                <button 
                  className="w-full py-2 bg-green-500/10 text-green-400 rounded-lg mb-4"
                  onClick={() => setShowChart(true)}
                >
                  View on Geckoterminal
                </button>
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white">{calculateTotalPrice(selectedMinutes)}</span>
                  <div className="flex gap-2">
                    <button className="px-4 py-1 bg-green-500/10 text-green-400 rounded-lg">Minutes</button>
                    <button className="px-4 py-1 bg-green-500/10 text-green-400 rounded-lg">FLOW</button>
                  </div>
                </div>

                <button className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold mb-4">
                  Pay {calculateTotalPrice(selectedMinutes)} FLOW
                </button>

                <div className="flex gap-2 mb-4">
                  <button 
                    className={`flex-1 py-2 border ${selectedMinutes === 15 ? 'border-green-500 bg-green-500/10' : 'border-green-500/50'} text-green-400 rounded-lg`}
                    onClick={() => setSelectedMinutes(15)}
                  >
                    15 min
                  </button>
                  <button 
                    className={`flex-1 py-2 border ${selectedMinutes === 30 ? 'border-green-500 bg-green-500/10' : 'border-green-500/50'} text-green-400 rounded-lg`}
                    onClick={() => setSelectedMinutes(30)}
                  >
                    30 min
                  </button>
                  <button 
                    className={`flex-1 py-2 border ${selectedMinutes === 60 ? 'border-green-500 bg-green-500/10' : 'border-green-500/50'} text-green-400 rounded-lg`}
                    onClick={() => setSelectedMinutes(60)}
                  >
                    60 min
                  </button>
                </div>

                <div className="bg-black/40 border border-green-500/30 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white">Available Balance</span>
                    <span className="text-green-400">0 FLOW</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Chart Modal */}
      {showChart && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black/90 border border-green-500/50 rounded-xl p-6 w-[90%] max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">FLOW Price Chart</h3>
              <button 
                className="text-green-400 hover:text-green-300"
                onClick={() => setShowChart(false)}
              >
                ✕
              </button>
            </div>
            <div id="tradingview_chart" className="w-full h-96"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buy;