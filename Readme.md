# Connect.Flow - Time is Money

A decentralized creator economy platform built on the Flow blockchain where creators can monetize their time and expertise on FLOW blockchain.

## 🚀 Overview

Connect.Flow revolutionizes the creator economy by allowing creators to tokenize their time and expertise. Users can purchase time from creators using FLOW tokens through bonding curve contracts, creating a dynamic pricing mechanism based on supply and demand.

## 🛠 Technology Stack

### Blockchain & Web3
- **Flow Blockchain**: Core blockchain infrastructure for smart contracts and transactions
- **RainbowKit**: Web3 wallet connection and authentication
- **Wagmi**: React hooks for Ethereum/Flow blockchain interactions
- **Viem**: TypeScript interface for blockchain interactions

### Frontend
- **Next.js 15**: React framework with App Router for server-side rendering
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Query**: Data fetching and state management

### Decentralized Storage & Identity
- **IPFS**: Decentralized storage for creator metadata (descriptions, tags, Twitter handles)
- **ENS (Ethereum Name Service)**: Human-readable addresses and reverse lookups
- **Nouns**: NFT-based profile pictures and visual identity

## 🎯 Key Features

### Creator Registration & Profile Management
- **Nouns Integration**: Creators select from Nouns NFT collection for profile pictures
- **IPFS Metadata**: Creator descriptions, tags, and social links stored on IPFS
- **ENS Lookup**: Resolve ENS names to addresses and vice versa
- **Smart Contract Registration**: Creator data stored on Flow blockchain with bonding curve contracts

### Dynamic Pricing & Bonding Curves
- **Bonding Curve Contracts**: Automated pricing mechanism based on supply and demand
- **FLOW Token Integration**: Native token for all transactions
- **Real-time Price Updates**: Live pricing from smart contracts

### User Experience
- **Explore Page**: Discover and browse creators with real-time data
- **Buy/Sell Interface**: Purchase time from creators with slippage protection
- **Dashboard**: Track transactions, earnings, and active sessions
- **Leaderboard**: Top creators ranked by market cap and activity

## 🏗 Architecture

### Smart Contracts
- **TimeFactory.sol**: Main contract for creator registration and management
- **Time.sol**: Individual creator tokens with bonding curve mechanics
- **ERC20Mock.sol**: FLOW token mock for testing and development

### Data Flow
1. **Creator Registration**: 
   - Creator registers on Flow blockchain with name and token symbol
   - Profile metadata (bio, tags, Twitter) uploaded to IPFS
   - Nouns NFT selected for profile picture
   - Bonding curve contract deployed for pricing

2. **User Interaction**:
   - Users browse creators on explore page
   - Purchase time using FLOW tokens through bonding curves
   - Real-time price updates from smart contracts
   - Transaction history tracked on dashboard

3. **ENS Integration**:
   - Lookup ENS names to get wallet addresses
   - Reverse lookup to get ENS names from addresses
   - Enhanced user experience with human-readable addresses

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Flow CLI (for contract deployment)
- WalletConnect Project ID

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd connect-flow
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your configuration:
   ```env
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FLOW_TESTNET_RPC=https://rest-testnet.onflow.org
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

### Contract Deployment

1. **Deploy to Flow Testnet**
   ```bash
   cd contracts
   flow deploy
   ```

2. **Update contract addresses**
   Update `frontend/src/utils/address.ts` with deployed contract addresses

## 📱 Features in Detail

### Creator Profile System
- **Nouns NFT Avatars**: 60+ unique Nouns for profile selection
- **IPFS Metadata Storage**: Decentralized storage for creator information - expertise tags , description , twitter name 
- **ENS Integration**: Human-readable addresses and lookups
- **Dynamic Tags**: Creator-defined tags for categorization

### Bonding Curve Economics
- **Automated Pricing**: Price increases with each purchase
- **Slippage Protection**: User-defined slippage tolerance
- **FLOW Token Integration**: Native token for all transactions
- **Real-time Updates**: Live price feeds from smart contracts

### User Interface
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Theme**: Consistent dark theme throughout the application
- **Loading States**: Smooth loading experiences with skeleton screens
- **Error Handling**: Comprehensive error handling and user feedback

## 🔧 Development

### Project Structure
```
frontend/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # Reusable React components
│   ├── contracts/          # Smart contract ABIs
│   ├── utils/              # Utility functions and configs
│   └── styles/             # Global styles and CSS
├── contracts/              # Smart contract source code
└── public/                 # Static assets
```

### Key Components
- **Web3Providers**: RainbowKit and Wagmi configuration
- **Navbar**: Navigation with wallet connection
- **Explore**: Creator discovery and browsing
- **Buy/Sell**: Trading interface with bonding curves
- **Dashboard**: User transaction history and stats

## 🌐 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy with automatic builds on push

### Environment Variables
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`: WalletConnect project ID
- `NEXT_PUBLIC_FLOW_TESTNET_RPC`: Flow testnet RPC URL
- `NEXT_PUBLIC_CONTRACT_ADDRESSES`: Deployed contract addresses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Nouns DAO**: For the amazing NFT collection used as profile pictures
- **ENS**: For decentralized naming infrastructure
- **IPFS**: For decentralized storage solutions - expertise tags , description , twitter name 
- **Flow Blockchain**: For the scalable blockchain infrastructure & bonding curve contract to fetch the price of creator/min as well as buying and selling the time, name , symbol of token 
- **RainbowKit**: For seamless Web3 wallet integration

---

**Connect.Flow** - Where time meets value on the blockchain ⏰💰