import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../components/Toast';
import {
  Download,
  Calendar,
  TrendingUp,
  BarChart3,
  PieChart,
  DollarSign,
  Users,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

const monthlyRevenue = [
  { month: 'Oca', current: 42000, previous: 35000 },
  { month: 'Şub', current: 38000, previous: 32000 },
  { month: 'Mar', current: 55000, previous: 41000 },
  { month: 'Nis', current: 47000, previous: 45000 },
  { month: 'May', current: 63000, previous: 52000 },
  { month: 'Haz', current: 78000, previous: 61000 },
  { month: 'Tem', current: 92000, previous: 75000 },
  { month: 'Ağu', current: 86000, previous: 82000 },
  { month: 'Eyl', current: 71000, previous: 58000 },
  { month: 'Eki', current: 68000, previous: 53000 },
  { month: 'Kas', current: 59000, previous: 47000 },
  { month: 'Ara', current: 84000, previous: 69000 },
];

const categoryData = [
  { name: 'Adventure', value: 35, color: '#14b8a6' },
  { name: 'Beach', value: 25, color: '#3b82f6' },
  { name: 'Culture', value: 20, color: '#8b5cf6' },
  { name: 'Wellness', value: 12, color: '#f59e0b' },
  { name: 'Food', value: 8, color: '#ef4444' },
];

const regionData = [
  { region: 'Kapadokya', bookings: 342, revenue: 128400 },
  { region: 'İstanbul', bookings: 298, revenue: 112500 },
  { region: 'Antalya', bookings: 256, revenue: 96200 },
  { region: 'Bodrum', bookings: 198, revenue: 87600 },
  { region: 'Pamukkale', bookings: 189, revenue: 71800 },
];

const kpiCards = [
  { label: 'Toplam Gelir', value: '$783,000', change: '+12.5%', up: true, icon: DollarSign },
  { label: 'Toplam Müşteri', value: '4,238', change: '+18.2%', up: true, icon: Users },
  { label: 'Ort. Sipariş Değeri', value: '$346', change: '+5.1%', up: true, icon: TrendingUp },
  { label: 'İptal Oranı', value: '8.3%', change: '-2.1%', up: false, icon: BarChart3 },
];

export function Reports() {
  const { t } = useLanguage();
  const { addToast } = useToast();
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

  const handleExport = () => {
    addToast('Rapor PDF olarak indiriliyor...', 'success');
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-900">{t('reports.title')}</h2>
        <div className="flex gap-2">
          <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
            {(['weekly', 'monthly', 'yearly'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  period === p ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'
                }`}
              >
                {p === 'weekly' ? 'Haftalık' : p === 'monthly' ? 'Aylık' : 'Yıllık'}
              </button>
            ))}
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-sm font-medium rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-xl transition-all"
          >
            <Download className="w-4 h-4" />
            {t('common.export')}
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-2xl border border-slate-200/60 p-5">
            <div className="flex items-center justify-between">
              <kpi.icon className="w-5 h-5 text-slate-400" />
              <span className={`flex items-center gap-0.5 text-xs font-semibold ${kpi.up ? 'text-emerald-600' : 'text-red-500'}`}>
                {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {kpi.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-3">{kpi.value}</p>
            <p className="text-sm text-slate-500 mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Comparison */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 p-6">
          <h3 className="text-base font-semibold text-slate-800 mb-1">Gelir Karşılaştırması</h3>
          <p className="text-xs text-slate-400 mb-4">Bu yıl vs. geçen yıl</p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="currentGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="prevGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#94a3b8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
              <Area type="monotone" dataKey="previous" stroke="#cbd5e1" strokeWidth={1.5} fill="url(#prevGrad)" strokeDasharray="4 4" />
              <Area type="monotone" dataKey="current" stroke="#14b8a6" strokeWidth={2.5} fill="url(#currentGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
          <h3 className="text-base font-semibold text-slate-800 mb-4">Kategori Dağılımı</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsPie>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                {categoryData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
            </RechartsPie>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-xs text-slate-600">{cat.name}</span>
                </div>
                <span className="text-xs font-semibold text-slate-800">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Region Performance */}
      <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
        <h3 className="text-base font-semibold text-slate-800 mb-4">Bölge Performansı</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={regionData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <YAxis type="category" dataKey="region" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} width={85} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
            <Bar dataKey="revenue" fill="#14b8a6" radius={[0, 6, 6, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
