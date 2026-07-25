import { Link, useLocation } from 'react-router';
import { Home, Sparkles, MessageCircle, Brain } from 'lucide-react';

export function TopBar() {
  const location = useLocation();

  return (
    <header className="bg-white border-b border-[#E2E8F0] px-8 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-[#2B3440] hover:text-[#2D9B87] transition-colors flex items-center gap-2">
        <Brain className="w-6 h-6 text-[#2D9B87]" />
        AbhyasAI
      </Link>
      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/practice" className={\`text-sm font-medium transition-colors \${location.pathname === '/practice' ? 'text-[#2D9B87]' : 'text-[#718096] hover:text-[#2D9B87]'}\`}>
            Practice
          </Link>
          <Link to="/generate" className={\`text-sm font-medium transition-colors \${location.pathname === '/generate' ? 'text-[#2D9B87]' : 'text-[#718096] hover:text-[#2D9B87]'}\`}>
            Generate
          </Link>
          <div className="relative group">
            <span className="text-sm font-medium text-slate-300 cursor-not-allowed">WhatsApp AI</span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">Coming Soon</div>
          </div>
        </nav>
      </div>
    </header>
  );
}
