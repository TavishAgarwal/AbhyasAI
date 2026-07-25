import { BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router';

export function SimpleNavbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isGenerate = location.pathname === '/generate';
  const isWhatsApp = location.pathname === '/whatsapp';

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="bg-white border-b border-[#E2E8F0] sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2D9B87] to-[#52B788] flex items-center justify-center shadow-sm">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-[#2B3440] font-bold text-lg">AbhyasAI</div>
            </div>
          </Link>

          <div className="flex items-center gap-4 lg:gap-6">
            {isHome ? (
              <>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-[#4A5568] hover:text-[#2D9B87] transition-colors font-medium hidden md:block"
                >
                  How it Works
                </button>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-[#4A5568] hover:text-[#2D9B87] transition-colors font-medium hidden md:block"
                >
                  Features
                </button>
              </>
            ) : (
              <Link
                to="/"
                className="text-[#4A5568] hover:text-[#2D9B87] transition-colors font-medium hidden md:block"
              >
                Home
              </Link>
            )}
            {!isWhatsApp && (
              <Link
                to="/whatsapp"
                className="text-[#4A5568] hover:text-[#2D9B87] transition-colors font-medium hidden sm:block"
              >
                WhatsApp
              </Link>
            )}
            {!isGenerate && (
              <Link
                to="/generate"
                className="px-4 lg:px-6 py-2 lg:py-2.5 bg-gradient-to-r from-[#2D9B87] to-[#52B788] text-white rounded-xl hover:shadow-lg hover:shadow-teal-500/30 transition-all font-medium text-sm lg:text-base whitespace-nowrap"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
