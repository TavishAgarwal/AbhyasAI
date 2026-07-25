import React from 'react';
import { Link } from 'react-router';
import { MessageCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export function WhatsAppComingSoonPage() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-6 pt-20">
      <div className="max-w-2xl w-full text-center">
        <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
          <MessageCircle className="w-10 h-10 text-emerald-500" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0b1c30] tracking-tight mb-6">
          WhatsApp Integration <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-400">is Coming Soon!</span>
        </h1>
        
        <p className="text-lg text-[#464555] mb-12 max-w-lg mx-auto leading-relaxed">
          We're working hard to bring AbhyasAI's elite cognitive coaching engine directly to your WhatsApp. Soon, you'll be able to practice via text or voice note anywhere.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-12 text-left">
          <div className="glass-panel p-6 border-emerald-500/10 hover:border-emerald-500/30 transition-colors">
            <Zap className="w-6 h-6 text-emerald-500 mb-4" />
            <h3 className="font-bold text-[#0b1c30] mb-2">Instant Feedback</h3>
            <p className="text-sm text-[#464555]">Submit answers via text or voice note and receive immediate AI evaluation.</p>
          </div>
          <div className="glass-panel p-6 border-emerald-500/10 hover:border-emerald-500/30 transition-colors">
            <ShieldCheck className="w-6 h-6 text-emerald-500 mb-4" />
            <h3 className="font-bold text-[#0b1c30] mb-2">Secure Sync</h3>
            <p className="text-sm text-[#464555]">Your progress will sync perfectly with your web dashboard in real-time.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button disabled className="primary-btn w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-300 text-slate-500 cursor-not-allowed border-none shadow-none">
            In Development
          </button>
          <Link to="/settings" className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-[#464555] hover:text-[#0b1c30] hover:bg-white/50 transition-colors flex items-center justify-center gap-2">
            Back to Settings <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
