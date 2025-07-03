import Link from 'next/link';

// Placeholder Logo component
const Logo = () => (
  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-bold text-white">CF</div>
);

// Placeholder ConnectButton
const ConnectButton = () => (
  <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">Connect Wallet</button>
);

const NOUNS_IMAGE_BASE = "https://noun.pics/";

const topCreators = [
  {
    name: "Alex Thompson",
    username: "alexdev",
    rate: 50,
    growth: "+245%",
    responseRate: "100%",
    bio: "Senior Blockchain Developer |  Expert",
    tags: ["Blockchain"]
  },
  {
    name: "Sarah Chen",
    username: "sarahc",
    rate: 90,
    growth: "+187%",
    responseRate: "98%",
    bio: "Digital Artist | NFT Specialist |  Designer",
    tags: ["NFT", "Design"]
  },
  {
    name: "Mike Roberts",
    username: "mikero",
    rate: 120,
    growth: "+120%",
    responseRate: "99%",
    bio: "Tech Consultant |  Developer | Web3 Expert",
    tags: ["Web3", "Tech"]
  },
  {
    name: "Lisa Wong",
    username: "lisa",
    rate: 160,
    growth: "+160%",
    responseRate: "97%",
    bio: "Business Mentor |  Ambassador | Startup Advisor",
    tags: ["Business", "Startup"]
  },
  {
    name: "John Smith",
    username: "johndev",
    rate: 150,
    growth: "+132%",
    responseRate: "100%",
    bio: "Financial Advisor |  Token Economics | DeFi Expert",
    tags: ["DeFi", "Finance"]
  },
  {
    name: "Emma Davis",
    username: "emmadev",
    rate: 110,
    growth: "+178%",
    responseRate: "99%",
    bio: "Web Developer | Move Language Specialist |  Builder",
    tags: ["Move", "Development"]
  }
];

const floatingCards = [
  { name: "Sarah Chen", role: "Digital Artist", rate: "90" },
  { name: "Mike Roberts", role: "Tech Consultant", rate: "120" },
  { name: "Lisa Wong", role: "Business Mentor", rate: "160" },
  { name: "John Smith", role: "Financial Advisor", rate: "150" },
  { name: "Emma Davis", role: "Web Developer", rate: "110" },
  { name: "David Kim", role: "Marketing Expert", rate: "130" },
];

const categories = [
  { icon: "🌟", name: "All Creators" },
  { icon: "⭐", name: "Top Creators" },
  { icon: "🎥", name: "Influencers" },
  { icon: "🚀", name: "Founders" },
  { icon: "💰", name: "DeFi Experts" },
  { icon: "🎨", name: "NFT Experts" },
  { icon: "💻", name: "Developers" },
  { icon: "📊", name: "Analysts" }
];

const animationStyles = `
  @keyframes floatDown {
    0%, 100% { transform: translateY(-10px); }
    50% { transform: translateY(10px); }
  }
  @keyframes floatUp {
    0%, 100% { transform: translateY(10px); }
    50% { transform: translateY(-10px); }
  }
`;

const generateAvatar = (index: number) => {
  const nounId = 1290 + index;
  return (
    <img 
      src={`${NOUNS_IMAGE_BASE}${nounId}.png`}
      alt={`NOUN ${nounId}`}
      className="w-12 h-12 rounded-full object-cover"
    />
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <style>{animationStyles}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero section with improved responsiveness */}
        <section className="flex flex-col md:flex-row items-center justify-between py-8 md:py-12">
          {/* Left side - Text content */}
          <div className="w-full md:w-1/2 text-left mb-12 md:mb-0">
            <div className="relative">
              <div className="absolute -inset-1 bg-green-500/30 rounded-lg blur-xl opacity-70"></div>
              <h1 className="relative text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent leading-tight">
                TIME IS MONEY
              </h1>
            </div>
            <p className="text-xl text-white mb-8 max-w-lg opacity-90">
              Get instant access to and invest in your favorite creators & experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/explore" className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20 text-center">
                Explore Creators
              </Link>
              <Link href="/register" className="px-6 py-3 border-2 border-green-500 text-green-500 rounded-lg font-semibold hover:bg-green-500/10 transition-colors text-center">
                Get Paid for your time
              </Link>
            </div>
            {/* Leaderboard Section */}
            <div className="mt-12">
              <Link 
                href="/leaderboard" 
                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-black/40 text-green-400 rounded-lg hover:bg-green-500/10 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-500/50 to-green-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                <div className="absolute inset-0 rounded-lg border border-green-500/50 group-hover:border-green-400/70 transition-colors duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  <span className="font-semibold group-hover:text-green-300">Leaderboard</span>
                  <svg 
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
          {/* Right side - Updated floating cards with SVG-based avatars */}
          <div className="w-full md:w-1/2 relative h-[600px] hidden md:block">
            <div className="absolute inset-0 flex justify-center gap-8">
              {/* Left column - Moving down */}
              <div className="relative w-64">
                {floatingCards.slice(0, 3).map((card, index) => (
                  <div
                    key={`left-${index}`}
                    className="group absolute bg-black/60 backdrop-blur-md border border-green-500/50 rounded-xl shadow-lg shadow-green-500/20 p-6 w-full transform transition-all duration-1000"
                    style={{
                      top: `${index * 200}px`,
                      animationName: 'floatDown',
                      animationDuration: `${3 + index}s`,
                      animationTimingFunction: 'ease-in-out',
                      animationIterationCount: 'infinite',
                      animationDelay: `${index * 0.5}s`
                    }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {generateAvatar(index)}
                      <div>
                        <h3 className="font-semibold text-white">{card.name}</h3>
                        <p className="text-sm text-green-400">{card.role}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-green-400 font-bold">{card.rate} FLOW<span className="text-white/60 text-sm ml-1">/min</span></span>
                      <button 
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold transform scale-95 group-hover:scale-100 hover:bg-green-600 shadow-lg shadow-green-500/25 z-10"
                      >
                      <Link href="/buy"> Buy Time</Link>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {/* Right column - Moving up */}
              <div className="relative w-64">
                {floatingCards.slice(3).map((card, index) => (
                  <div
                    key={`right-${index}`}
                    className="group absolute bg-black/60 backdrop-blur-md border border-green-500/50 rounded-xl shadow-lg shadow-green-500/20 p-6 w-full transform transition-all duration-1000"
                    style={{
                      bottom: `${index * 200}px`,
                      animationName: 'floatUp',
                      animationDuration: `${3 + index}s`,
                      animationTimingFunction: 'ease-in-out',
                      animationIterationCount: 'infinite',
                      animationDelay: `${index * 0.5}s`
                    }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {generateAvatar(index + 3)}
                      <div>
                        <h3 className="font-semibold text-white">{card.name}</h3>
                        <p className="text-sm text-green-400">{card.role}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-green-400 font-bold">{card.rate} FLOW<span className="text-white/60 text-sm ml-1">/min</span></span>
                      <button 
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold transform scale-95 group-hover:scale-100 hover:bg-green-600 shadow-lg shadow-green-500/25 z-10"
                      >
                        Buy Time
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* IMPROVED Categories section with better visual elements and smaller cards */}
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">Explore Categories</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {categories.map((category, index) => (
              <button 
                key={index}
                className="flex flex-col items-center gap-2 p-3 bg-black/60 backdrop-blur-md border border-green-500/30 rounded-xl hover:bg-green-500/10 transition-all transform hover:scale-105 hover:border-green-500/60 group"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-600 opacity-90 group-hover:opacity-100 text-white">
                  <span className="text-lg">{category.icon}</span>
                </div>
                <span className="text-white font-medium text-xs sm:text-sm">{category.name}</span>
              </button>
            ))}
          </div>
          {/* Enhanced horizontal line with glow effect */}
          <div className="relative py-8 mt-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gradient-to-r from-green-500/0 via-green-500/70 to-green-500/0">
                <div className="absolute inset-0 blur-sm bg-green-500/30"></div>
              </div>
            </div>
          </div>
          {/* Top creators section - Improved  creators cards */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">Top  Creators</h2>
              <button className="text-green-400 hover:text-green-300 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topCreators.map((creator, index) => (
                <div 
                  key={index}
                  className="group bg-black/60 backdrop-blur-md border border-green-500/50 rounded-xl p-6 flex flex-col gap-4 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:border-green-400 hover:translate-y-[-4px] hover:bg-black/80 relative"
                >
                  {/* Move price to left side */}
                  <div className="flex items-end justify-between mt-auto pt-4 border-t border-green-500/20">
                    <div>
                      <span className="text-green-400 text-2xl font-bold">{creator.rate} FLOW</span>
                      <span className="text-white/60 text-sm ml-1">/ min</span>
                    </div>
                    {/* Buy Time button - positioned in bottom right */}
                    <button 
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold transform scale-95 group-hover:scale-100 hover:bg-green-600 shadow-lg shadow-green-500/25 z-10"
                    >
                    <Link href="/buy"> Buy Time</Link>
                    </button>
                  </div>
                  {/* Rest of the card content */}
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      {generateAvatar(index)}
                      <div>
                        <h3 className="text-white font-semibold text-lg">{creator.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-green-400 text-sm font-medium">@{creator.username}</span>
                          <span className="text-green-500 text-xs">{creator.growth}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 items-center text-xs text-green-400">
                      <span>{creator.responseRate}</span>
                      <span className="text-green-500">✓</span>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm">
                    {creator.bio}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {creator.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* How it Works section with improved visuals */}
        <section className="py-16">
          <h2 className="text-3xl font-bold mb-12 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent text-center">How it Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/60 backdrop-blur-md border border-green-500/50 rounded-xl shadow-lg shadow-green-500/20 p-8 transition-transform hover:scale-105">
              <div className="w-16 h-16 flex items-center justify-center bg-green-500/20 rounded-full mx-auto mb-6 text-2xl text-green-400">1</div>
              <h3 className="text-xl font-bold text-green-400 mb-4 text-center">FIND CREATORS</h3>
              <p className="text-white/80 text-center">Discover creators across a variety of specialties</p>
            </div>
            <div className="bg-black/60 backdrop-blur-md border border-green-500/50 rounded-xl shadow-lg shadow-green-500/20 p-8 transition-transform hover:scale-105">
              <div className="w-16 h-16 flex items-center justify-center bg-green-500/20 rounded-full mx-auto mb-6 text-2xl text-green-400">2</div>
              <h3 className="text-xl font-bold text-green-400 mb-4 text-center">BUY THEIR TIME</h3>
              <p className="text-white/80 text-center">Buy minutes of the creators you want to connect with or invest in</p>
            </div>
            <div className="bg-black/60 backdrop-blur-md border border-green-500/50 rounded-xl shadow-lg shadow-green-500/20 p-8 transition-transform hover:scale-105">
              <div className="w-16 h-16 flex items-center justify-center bg-green-500/20 rounded-full mx-auto mb-6 text-2xl text-green-400">3</div>
              <h3 className="text-xl font-bold text-green-400 mb-4 text-center">CONNECT</h3>
              <p className="text-white/80 text-center">Connect with powerful creators through direct messages, API calls, and automated tasks.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}