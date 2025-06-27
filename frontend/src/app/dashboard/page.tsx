import Link from 'next/link';

export default function Dashboard() {
  // Sample data - in a real app, this would come from your backend
  const transactions = [
    {
      id: 1,
      walletAddress: "0x1234...5678",
      timePurchased: "15 min",
      amountPaid: "15 FLOW",
      date: "2024-03-20",
      status: "Active"
    },
    {
      id: 2,
      walletAddress: "0x8765...4321",
      timePurchased: "30 min",
      amountPaid: "30 FLOW",
      date: "2024-03-19",
      status: "Active"
    },
    {
      id: 3,
      walletAddress: "0x2468...1357",
      timePurchased: "60 min",
      amountPaid: "60 FLOW",
      date: "2024-03-18",
      status: "Completed"
    },
    {
      id: 4,
      walletAddress: "0x1357...2468",
      timePurchased: "15 min",
      amountPaid: "15 FLOW",
      date: "2024-03-17",
      status: "Completed"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Dashboard header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Your Dashboard</h1>
          <p className="text-white/60">Manage your time sales and connections</p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-black/60 backdrop-blur-md border border-green-500/50 rounded-xl p-6">
            <h3 className="text-white/60 text-sm mb-2">Total Time Sold</h3>
            <p className="text-2xl font-bold text-green-400">120 min</p>
          </div>
          <div className="bg-black/60 backdrop-blur-md border border-green-500/50 rounded-xl p-6">
            <h3 className="text-white/60 text-sm mb-2">Total Earnings</h3>
            <p className="text-2xl font-bold text-green-400">120 FLOW</p>
          </div>
          <div className="bg-black/60 backdrop-blur-md border border-green-500/50 rounded-xl p-6">
            <h3 className="text-white/60 text-sm mb-2">Active Sessions</h3>
            <p className="text-2xl font-bold text-green-400">2</p>
          </div>
        </div>

        {/* Transactions table */}
        <div className="bg-black/60 backdrop-blur-md border border-green-500/50 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-green-500/20">
            <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-green-500/20">
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Wallet Address</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Time Purchased</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Amount Paid</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-green-500/20 last:border-0 hover:bg-green-500/5 transition-colors">
                    <td className="px-6 py-4 text-sm text-white">{transaction.walletAddress}</td>
                    <td className="px-6 py-4 text-sm text-white">{transaction.timePurchased}</td>
                    <td className="px-6 py-4 text-sm text-green-400">{transaction.amountPaid}</td>
                    <td className="px-6 py-4 text-sm text-white/60">{transaction.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status === 'Active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-white/10 text-white/60'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors"
                        onClick={() => {/* Handle chat action */}}
                      >
                        Chat
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional stats section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black/60 backdrop-blur-md border border-green-500/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-sm">New time purchase</span>
                <span className="text-green-400 text-sm">+15 FLOW</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-sm">Session completed</span>
                <span className="text-green-400 text-sm">+30 FLOW</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-sm">New connection</span>
                <span className="text-blue-400 text-sm">+1</span>
              </div>
            </div>
          </div>
          
          <div className="bg-black/60 backdrop-blur-md border border-green-500/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors text-left">
                Set Availability
              </button>
              <button className="w-full px-4 py-2 border border-green-500 text-green-400 rounded-lg font-semibold hover:bg-green-500/10 transition-colors text-left">
                View Analytics
              </button>
              <button className="w-full px-4 py-2 border border-green-500 text-green-400 rounded-lg font-semibold hover:bg-green-500/10 transition-colors text-left">
                Manage Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}