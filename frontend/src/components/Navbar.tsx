import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 lg:px-8">
      <nav className="max-w-7xl mx-auto bg-black/90 backdrop-blur-md rounded-2xl border border-gray-800">
        <div className="px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                DynaFi
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-10">
              <Link href="/features" className="text-gray-300 hover:text-blue-400 transition-colors">
                Features
              </Link>
              <Link href="/docs" className="text-gray-300 hover:text-blue-400 transition-colors">
                Documentation
              </Link>
              <Link href="/governance" className="text-gray-300 hover:text-blue-400 transition-colors">
                Governance
              </Link>
              <Link 
                href="/launch"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-colors"
              >
                Launch App
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-300 hover:text-blue-400 p-2">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar; 