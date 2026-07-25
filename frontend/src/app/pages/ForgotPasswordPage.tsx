import React, { useState } from 'react';
import { Link } from 'react-router';
import { supabase } from '../../lib/supabase';
import { Brain, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/settings`, // usually a reset password page, but settings is fine for now
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md glass-panel p-8">
        <div className="flex flex-col items-center mb-8">
          <Brain className="w-12 h-12 text-[#4f46e5] mb-4" />
          <h1 className="text-2xl font-bold text-[#0b1c30]">Reset Password</h1>
          <p className="text-[#464555] text-sm mt-2 text-center">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-rose-700">{error}</p>
          </div>
        )}

        {success ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-lg font-bold text-[#0b1c30] mb-2">Check your email</h3>
            <p className="text-sm text-[#464555] mb-8">
              We've sent password reset instructions to <br />
              <span className="font-medium text-[#0b1c30]">{email}</span>
            </p>
            <Link to="/login" className="primary-btn w-full block">
              Back to Log In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleReset} className="flex flex-col gap-5">
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

            <button
              type="submit"
              disabled={loading}
              className="primary-btn w-full mt-2 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Reset Link'}
            </button>
          </form>
        )}

        {!success && (
          <p className="text-center text-sm text-[#464555] mt-8">
            Remember your password?{' '}
            <Link to="/login" className="font-medium text-[#4f46e5] hover:text-[#4338ca]">
              Log in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
