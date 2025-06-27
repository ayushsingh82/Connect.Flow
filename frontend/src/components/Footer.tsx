import React from 'react';


const Footer = () => {
  return (
    <footer className="py-12 border-t border-green-500/20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8">
              
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Connect.Flow
              </span>
            </div>
            <p className="text-white/60 text-sm">
              The future of creator economy on Flow blockchain. Connect with experts and monetize your time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
            
              <li><a href="#" className="text-white/60 hover:text-green-400 transition-colors">Leaderboard</a></li>
              <li><a href="#" className="text-white/60 hover:text-green-400 transition-colors">Dashboard</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 hover:text-green-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-white/60 hover:text-green-400 transition-colors">API Reference</a></li>

            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-semibold mb-4">Join Our Community</h3>
            <div className="flex flex-col space-y-3">
              <a href="#" className="flex items-center gap-2 text-white/60 hover:text-green-400 transition-colors">
                <span className="text-xl">🐦</span>
                <span>Twitter</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-white/60 hover:text-green-400 transition-colors">
                <span className="text-xl">💬</span>
                <span>Discord</span>
              </a>
            
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-green-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">© 2025 Connect.Flow. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-white/60 hover:text-green-400 text-sm">Privacy Policy</a>
              <a href="#" className="text-white/60 hover:text-green-400 text-sm">Terms of Service</a>
              <a href="#" className="text-white/60 hover:text-green-400 text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 