import {
  Home,
  Sparkles,
  MessageCircle,
  Settings,
  HelpCircle
} from 'lucide-react';
import { Link, useLocation } from 'react-router';

const menuItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Sparkles, label: 'Generate', path: '/generate' },
  { icon: MessageCircle, label: 'WhatsApp Bot', path: '/whatsapp' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-60 bg-white h-screen flex flex-col border-r border-[#E8E8F0]">
      {/* Logo */}
      <div className="p-6 border-b border-[#E8E8F0]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2D9B87] to-[#52B788] flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div>
            <div className="text-[#1A1A2E] font-bold text-base">AbhyasAI</div>
            <div className="text-[#888899] text-xs">Accessible Learning</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#2D9B87] to-[#52B788] text-white shadow-lg shadow-teal-300/50'
                  : 'text-[#888899] hover:bg-[#F8F9FF] hover:text-[#2D9B87]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-[#E8E8F0] space-y-1">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 text-[#888899] hover:bg-[#F8F9FF] hover:text-[#2D9B87] rounded-xl transition-all"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium text-sm">Settings</span>
        </Link>
        <Link
          to="/help"
          className="flex items-center gap-3 px-4 py-3 text-[#888899] hover:bg-[#F8F9FF] hover:text-[#2D9B87] rounded-xl transition-all"
        >
          <HelpCircle className="w-5 h-5" />
          <span className="font-medium text-sm">Help</span>
        </Link>
      </div>
    </div>
  );
}
