import { MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router';

export function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#D0D8E4]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1B5E8B] flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-[#1B5E8B] font-bold text-lg">AbhyasAI</span>
        </Link>

        <div className="flex items-center gap-3 lg:gap-6">
          {isHome ? (
            <a href="#how-it-works" className="hidden md:block text-[#444455] hover:text-[#1B5E8B] transition-colors text-sm lg:text-base">
              How it works
            </a>
          ) : (
            <Link to="/" className="hidden md:block text-[#444455] hover:text-[#1B5E8B] transition-colors text-sm lg:text-base">
              Home
            </Link>
          )}
          <Link to="/whatsapp" className="hidden sm:flex items-center gap-2 text-[#444455] hover:text-[#1B5E8B] transition-colors text-sm lg:text-base">
            <MessageCircle className="w-4 lg:w-5 h-4 lg:h-5 text-[#25D366]" />
            <span className="hidden md:inline">WhatsApp Bot</span>
          </Link>
          <Link
            to="/generator"
            className="px-4 lg:px-6 py-2 lg:py-2.5 bg-[#E67E22] text-white rounded-lg hover:bg-[#d67118] transition-colors font-medium text-sm lg:text-base"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
