import React, { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../components/auth/AuthProvider';
import { User, MessageCircle, LogOut, Loader2, Save } from 'lucide-react';

export function SettingsPage() {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState(user?.is_anonymous ? 'Guest User' : (user?.user_metadata?.full_name || 'Test User'));
  const [email, setEmail] = useState(user?.email || '');

  const handleSave = async () => {
    setLoading(true);
    // ⚠️ STUB: Fake save
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-[#0b1c30] mb-2">Settings</h1>
      <p className="text-[#464555] mb-8">Manage your account preferences and integrations.</p>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="glass-panel p-2 flex flex-col gap-1">
            <button className="flex items-center gap-3 w-full px-4 py-3 text-left rounded-lg bg-[#4f46e5]/10 text-[#4f46e5] font-semibold">
              <User className="w-5 h-5" /> Profile
            </button>
            
            <div className="my-2 border-t border-slate-100"></div>
            
            <Link to="/settings/whatsapp" className="flex items-center gap-3 w-full px-4 py-3 text-left rounded-lg text-emerald-600 hover:bg-emerald-50 font-medium transition-colors">
              <MessageCircle className="w-5 h-5" /> WhatsApp Sync
            </Link>
            
            <div className="my-2 border-t border-slate-100"></div>
            
            <button 
              onClick={() => signOut()}
              className="flex items-center gap-3 w-full px-4 py-3 text-left rounded-lg text-rose-600 hover:bg-rose-50 font-medium transition-colors"
            >
              <LogOut className="w-5 h-5" /> Log Out
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="glass-panel p-8">
            <h2 className="text-xl font-bold text-[#0b1c30] mb-6">Profile Information</h2>
            
            <div className="flex flex-col gap-6 max-w-md">
              <div>
                <label className="block text-sm font-medium text-[#0b1c30] mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4f46e5]/20 focus:border-[#4f46e5] outline-none transition-all text-[#0b1c30]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#0b1c30] mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50 text-slate-500 outline-none"
                />
                <p className="text-xs text-[#718096] mt-2">Email address cannot be changed currently.</p>
              </div>

              <button 
                onClick={handleSave}
                disabled={loading}
                className="primary-btn w-fit mt-4 flex items-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-4 h-4" />}
                {success ? 'Saved Successfully' : 'Save Changes'}
              </button>
            </div>
            

          </div>
        </div>
      </div>
    </div>
  );
}
