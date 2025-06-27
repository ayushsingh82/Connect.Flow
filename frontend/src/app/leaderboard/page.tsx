import Link from 'next/link';

const NOUNS_IMAGE_BASE = "https://noun.pics/";

// Placeholder Logo component
const Logo = () => (
  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-bold text-white">CF</div>
);

// Placeholder ConnectButton
const ConnectButton = () => (
  <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">Connect Wallet</button>
);

export default function Leaderboard() {
  const rankings = [
    {
      username: "toly",
      nounId: 1290,
      price: "50 FLOW",
      marketCap: "5,000,000 FLOW"
    },
    {
      username: "Ansem",
      nounId: 1291,
      price: "45 FLOW",
      marketCap: "4,500,000 FLOW"
    },
    {
      username: "Kawz",
      nounId: 1292,
      price: "40 FLOW",
      marketCap: "4,000,000 FLOW"
    },
    {
      username: "mert",
      nounId: 1293,
      price: "35 FLOW",
      marketCap: "3,500,000 FLOW"
    },
    {
      username: "raj",
      nounId: 1294,
      price: "30 FLOW",
      marketCap: "3,000,000 FLOW"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Leaderboard header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Leaderboard</h1>
          <p className="text-white/60">Top creators by market cap</p>
        </div>

        {/* Rankings table */}
        <div className="bg-black/60 backdrop-blur-md border border-green-500/50 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-green-500/20">
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">User</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Price / min</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Market Cap</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Action</th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((rank, index) => (
                  <tr 
                    key={rank.username} 
                    className="border-b border-green-500/20 last:border-0 hover:bg-green-500/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {index === 0 && <span className="text-yellow-400">🥇</span>}
                        {index === 1 && <span className="text-gray-400">🥈</span>}
                        {index === 2 && <span className="text-amber-600">🥉</span>}
                        <span className="text-white/60 text-sm font-medium">#{index + 1}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={`${NOUNS_IMAGE_BASE}${rank.nounId}.png`}
                          alt={`NOUN ${rank.nounId}`}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="text-sm text-white font-medium">@{rank.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-green-400 font-medium">{rank.price}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-green-400 font-medium">{rank.marketCap}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">
                        Buy Time
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

    
      </div>
    </div>
  );
}