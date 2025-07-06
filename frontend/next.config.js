/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable SSR for pages that use browser APIs
  serverExternalPackages: ['@rainbow-me/rainbowkit', 'wagmi'],
  
  // Handle webpack configuration for client-side only packages
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude client-side only packages from server bundle
      config.externals = config.externals || [];
      config.externals.push({
        'indexeddb': 'commonjs indexeddb',
      });
    }
    
    return config;
  },
  

  
  // Optimize images
  images: {
    domains: ['noun.pics', 'api.dicebear.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'noun.pics',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig; 