import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  TrendingUp,
  TrendingDown,
  CalendarCheck,
  Users,
  DollarSign,
  ArrowUpRight,
  Sparkles,
  MapPin,
  Plane,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// ─── Currency System ───
type Currency = 'USD' | 'EUR' | 'TRY';

const currencyConfig: Record<Currency, { symbol: string; label: string; flag: string; rate: number }> = {
  USD: { symbol: '$', label: 'USD', flag: '🇺🇸', rate: 1 },
  EUR: { symbol: '€', label: 'EUR', flag: '🇪🇺', rate: 0.92 },
  TRY: { symbol: '₺', label: 'TRY', flag: '🇹🇷', rate: 38.5 },
};

function formatCurrency(amountUSD: number, currency: Currency): string {
  const { symbol, rate } = currencyConfig[currency];
  const converted = amountUSD * rate;
  if (converted >= 1000000) return `${symbol}${(converted / 1000000).toFixed(1)}M`;
  if (converted >= 1000) return `${symbol}${converted.toLocaleString(currency === 'TRY' ? 'tr-TR' : 'en-US', { maximumFractionDigits: 0 })}`;
  return `${symbol}${converted.toLocaleString(currency === 'TRY' ? 'tr-TR' : 'en-US', { maximumFractionDigits: 0 })}`;
}

function formatChartAxis(value: number, currency: Currency): string {
  const { symbol } = currencyConfig[currency];
  if (value >= 1000000) return `${symbol}${(value / 1000000).toFixed(1)}M`;
  return `${symbol}${(value / 1000).toFixed(0)}k`;
}

// ─── Data (base values in USD) ───
const revenueDataUSD = [
  { month: 'Oca', revenue: 42000 },
  { month: 'Şub', revenue: 38000 },
  { month: 'Mar', revenue: 55000 },
  { month: 'Nis', revenue: 47000 },
  { month: 'May', revenue: 63000 },
  { month: 'Haz', revenue: 78000 },
  { month: 'Tem', revenue: 92000 },
  { month: 'Ağu', revenue: 86000 },
  { month: 'Eyl', revenue: 71000 },
  { month: 'Eki', revenue: 68000 },
  { month: 'Kas', revenue: 59000 },
  { month: 'Ara', revenue: 84000 },
];

const topDestinationsUSD = [
  { name: 'Kapadokya', bookings: 342, revenueUSD: 128400, trend: '+12%', emoji: '🎈' },
  { name: 'İstanbul', bookings: 298, revenueUSD: 112500, trend: '+8%', emoji: '🕌' },
  { name: 'Antalya', bookings: 256, revenueUSD: 96200, trend: '+15%', emoji: '🏖️' },
  { name: 'Pamukkale', bookings: 189, revenueUSD: 71800, trend: '+5%', emoji: '♨️' },
  { name: 'Efes', bookings: 145, revenueUSD: 54200, trend: '+3%', emoji: '🏛️' },
];

const recentBookingsUSD = [
  { id: 'BK-001', customer: 'Ahmet Y.', trip: 'Kapadokya Turu', status: 'Confirmed', amountUSD: 1250, color: 'bg-teal-500' },
  { id: 'BK-002', customer: 'Maria S.', trip: 'İstanbul City', status: 'Pending', amountUSD: 890, color: 'bg-violet-500' },
  { id: 'BK-003', customer: 'John D.', trip: 'Antalya Beach', status: 'Confirmed', amountUSD: 2100, color: 'bg-blue-500' },
  { id: 'BK-004', customer: 'Elif K.', trip: 'Pamukkale Spa', status: 'Cancelled', amountUSD: 750, color: 'bg-amber-500' },
  { id: 'BK-005', customer: 'Hans M.', trip: 'Efes Antik', status: 'Confirmed', amountUSD: 560, color: 'bg-rose-500' },
];

const aiInsights = [
  { title: 'Kapadokya talep artışı', desc: 'Balon turları için %23 artış bekleniyor. Kapasiteyi artırın.', type: 'opportunity' },
  { title: 'Antalya erken rezervasyon', desc: 'Yaz sezonu için erken rezervasyon kampanyası başlatma zamanı.', type: 'action' },
  { title: 'Müşteri memnuniyeti', desc: 'Son 30 günde NPS skoru 72\'den 78\'e yükseldi.', type: 'positive' },
];

const statusColors: Record<string, string> = {
  Confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Cancelled: 'bg-red-50 text-red-700 border-red-200',
};

export function Dashboard() {
  const { t } = useLanguage();
  const [currency, setCurrency] = useState<Currency>('USD');

  const revenueData = revenueDataUSD.map((d) => ({
    ...d,
    revenue: Math.round(d.revenue * currencyConfig[currency].rate),
  }));

  const stats = [
    {
      label: t('dashboard.totalRevenue'),
      value: formatCurrency(783000, currency),
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-teal-500 to-emerald-600',
    },
    {
      label: t('dashboard.activeBookings'),
      value: '2,260',
      change: '+8.2%',
      trend: 'up',
      icon: CalendarCheck,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      label: t('dashboard.newCustomers'),
      value: '1,847',
      change: '+23.1%',
      trend: 'up',
      icon: Users,
      color: 'from-violet-500 to-purple-600',
    },
    {
      label: t('dashboard.conversionRate'),
      value: '18.4%',
      change: '-2.3%',
      trend: 'down',
      icon: TrendingUp,
      color: 'from-amber-500 to-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Currency Selector */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl font-bold text-slate-900">{t('dashboard.title')}</h2>
        <div className="flex items-center gap-1 bg-white border border-slate-200/80 rounded-xl p-1 shadow-sm">
          {(Object.keys(currencyConfig) as Currency[]).map((cur) => (
            <button
              key={cur}
              onClick={() => setCurrency(cur)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currency === cur
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-md shadow-teal-500/20'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="text-sm">{currencyConfig[cur].flag}</span>
              <span>{currencyConfig[cur].label}</span>
              <span className="text-[10px] opacity-70">({currencyConfig[cur].symbol})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-slate-200/60 p-5 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span
                className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full ${
                  stat.trend === 'up'
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-red-700 bg-red-50'
                }`}
              >
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-slate-800">
                {t('dashboard.revenueChart')}
              </h3>
              <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                {currencyConfig[currency].flag} {currencyConfig[currency].label}
              </span>
            </div>
            <div className="flex gap-1 bg-slate-100 rounded-lg p-0.5">
              {['Haftalık', 'Aylık', 'Yıllık'].map((period) => (
                <button
                  key={period}
                  className="px-3 py-1.5 text-xs font-medium rounded-md text-slate-600 hover:bg-white hover:shadow-sm transition-all first:bg-white first:shadow-sm first:text-slate-900"
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => formatChartAxis(v, currency)}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '13px',
                }}
                formatter={(value: number) => [
                  `${currencyConfig[currency].symbol}${value.toLocaleString()}`,
                  'Gelir',
                ]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#14b8a6"
                strokeWidth={2.5}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-5">
            <div className="p-1.5 rounded-lg bg-teal-500/20">
              <Sparkles className="w-4 h-4 text-teal-400" />
            </div>
            <h3 className="text-base font-semibold">{t('dashboard.aiInsights')}</h3>
          </div>
          <div className="space-y-4">
            {aiInsights.map((insight, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <span className="text-lg mt-0.5">
                    {insight.type === 'opportunity' ? '💡' : insight.type === 'action' ? '🎯' : '✅'}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white/90">{insight.title}</p>
                    <p className="text-xs text-white/50 mt-1 leading-relaxed">{insight.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-semibold text-slate-800">
              {t('dashboard.recentBookings')}
            </h3>
            <button className="text-xs font-medium text-teal-600 hover:text-teal-700 flex items-center gap-1">
              {t('common.view')} <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-3">
            {recentBookingsUSD.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div
                  className={`w-9 h-9 rounded-lg ${booking.color} flex items-center justify-center text-white text-xs font-bold`}
                >
                  {booking.customer.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{booking.customer}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Plane className="w-3 h-3" /> {booking.trip}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-800">
                    {formatCurrency(booking.amountUSD, currency)}
                  </p>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${statusColors[booking.status]}`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Destinations */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-semibold text-slate-800">
              {t('dashboard.topDestinations')}
            </h3>
            <button className="text-xs font-medium text-teal-600 hover:text-teal-700 flex items-center gap-1">
              {t('common.view')} <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-3">
            {topDestinationsUSD.map((dest) => (
              <div
                key={dest.name}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <span className="text-xl w-8 text-center">{dest.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800">{dest.name}</p>
                  <p className="text-xs text-slate-500">{dest.bookings} rezervasyon</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-800">
                    {formatCurrency(dest.revenueUSD, currency)}
                  </p>
                  <span className="text-xs text-emerald-600 font-medium">{dest.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
