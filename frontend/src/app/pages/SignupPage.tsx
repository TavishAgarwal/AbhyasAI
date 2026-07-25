import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { supabase } from '../../lib/supabase';
import { Brain, AlertCircle, Loader2 } from 'lucide-react';

export function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Typically signUp with email confirmation enabled requires verifying email.
      // Assuming auto-confirm for now or they will be directed to login.
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md glass-panel p-8">
        <div className="flex flex-col items-center mb-8">
          <Brain className="w-12 h-12 text-[#4f46e5] mb-4" />
          <h1 className="text-2xl font-bold text-[#0b1c30]">Create an account</h1>
          <p className="text-[#464555] text-sm mt-2">Start your journey to cognitive mastery</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-rose-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-[#0b1c30] mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4f46e5]/20 focus:border-[#4f46e5] outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0b1c30] mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4f46e5]/20 focus:border-[#4f46e5] outline-none transition-all"
              placeholder="Min. 6 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="primary-btn w-full mt-2 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-[#464555] mt-8">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[#4f46e5] hover:text-[#4338ca]">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
