import { Link } from 'react-router';

export function SimpleNavbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 py-4 px-6 lg:px-12 transition-all duration-300 bg-white/40 backdrop-blur-md border-b border-white/20">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-sans font-bold text-xl text-[#0b1c30]">AbhyasAI</span>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('curriculum')} className="text-[#464555] hover:text-[#4f46e5] font-medium transition-colors text-sm font-sans">
            Curriculum
          </button>
          <button onClick={() => scrollToSection('interview')} className="text-[#464555] hover:text-[#4f46e5] font-medium transition-colors text-sm font-sans">
            Interview Prep
          </button>
          <button onClick={() => scrollToSection('stories')} className="text-[#464555] hover:text-[#4f46e5] font-medium transition-colors text-sm font-sans">
            Success Stories
          </button>
          <button onClick={() => scrollToSection('pricing')} className="text-[#464555] hover:text-[#4f46e5] font-medium transition-colors text-sm font-sans">
            Pricing
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link to="/whatsapp" className="text-[#464555] hover:text-[#0b1c30] font-medium text-sm font-sans hidden sm:block">
            Log In
          </Link>
          <Link to="/generate" className="glass-button text-sm font-sans">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
