import React, { useState } from 'react';
import { Sparkles, Eye, EyeOff, Lock, Mail, ArrowRight, Shield } from 'lucide-react';

interface LoginProps {
  onLogin: (user: { email: string; role: string; name: string }) => void;
}

// Demo credentials — Gerçek projede bunları backend/database'den kontrol edin
const ADMIN_USERS = [
  { email: 'admin@tatilfinans.com', password: 'TatilFinans2026!', role: 'super_admin', name: 'Super Admin' },
  { email: 'manager@tatilfinans.com', password: 'Manager2026!', role: 'manager', name: 'Manager' },
];

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const user = ADMIN_USERS.find(
      (u) => u.email === email.toLowerCase() && u.password === password
    );

    if (user) {
      // Store session
      const session = {
        email: user.email,
        role: user.role,
        name: user.name,
        token: btoa(`${user.email}:${Date.now()}`),
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      };

      if (rememberMe) {
        localStorage.setItem('travance_session', JSON.stringify(session));
      } else {
        sessionStorage.setItem('travance_session', JSON.stringify(session));
      }

      onLogin({ email: user.email, role: user.role, name: user.name });
    } else {
      setError('E-posta veya şifre hatalı.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shadow-xl shadow-teal-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Travance AI</h1>
              <p className="text-xs text-teal-400/80 font-medium tracking-widest uppercase">
                Tourism Orchestration Platform
              </p>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Turizmin geleceğini
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
              AI ile yönetin.
            </span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-md">
            Rezervasyonlar, ödemeler, müşteri desteği ve pazarlama — hepsi tek bir platformda, yapay zeka destekli.
          </p>

          {/* Features */}
          <div className="mt-12 space-y-4">
            {[
              { emoji: '🎯', text: 'AI destekli müşteri öngörüleri' },
              { emoji: '📊', text: 'Gerçek zamanlı analitik dashboard' },
              { emoji: '🌍', text: 'Çoklu dil ve para birimi desteği' },
              { emoji: '🔒', text: 'Kurumsal düzey güvenlik' },
            ].map((feature) => (
              <div key={feature.text} className="flex items-center gap-3">
                <span className="text-xl">{feature.emoji}</span>
                <span className="text-sm text-slate-300">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Bottom info */}
          <div className="mt-16 pt-8 border-t border-white/5">
            <p className="text-xs text-slate-500">
              © 2026 TatilFinans / Travance AI. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Travance AI</h1>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/20 p-8">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-teal-600" />
              <h3 className="text-lg font-bold text-slate-900">Admin Girişi</h3>
            </div>
            <p className="text-sm text-slate-500 mb-8">
              Yönetim paneline erişmek için giriş yapın.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  E-posta
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@tatilfinans.com"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Şifre
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm text-slate-600">Beni hatırla</span>
                </label>
                <button type="button" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                  Şifremi unuttum
                </button>
              </div>

              {/* Error */}
              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 flex items-center gap-2">
                  <span>⚠️</span>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Giriş yapılıyor...
                  </>
                ) : (
                  <>
                    Giriş Yap
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Demo Giriş Bilgileri
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Super Admin:</span>
                  <code className="text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200 font-mono">
                    admin@tatilfinans.com / TatilFinans2026!
                  </code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Manager:</span>
                  <code className="text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200 font-mono">
                    manager@tatilfinans.com / Manager2026!
                  </code>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            Güvenli bağlantı ile korunmaktadır 🔒
          </p>
        </div>
      </div>
    </div>
  );
}
