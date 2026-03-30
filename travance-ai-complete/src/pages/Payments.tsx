import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { Payment } from '../types';
import {
  Search,
  Download,
  CreditCard,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const mockPayments: Payment[] = [
  { id: 'PAY-3001', customer: { name: 'Ahmet Yılmaz', initials: 'AY', color: 'bg-teal-500' }, description: 'Kapadokya Balon Turu', bookingId: 'BK-1001', date: '2026-03-28', amount: '$1,250', currency: 'USD', status: 'Succeeded' },
  { id: 'PAY-3002', customer: { name: 'Maria Schmidt', initials: 'MS', color: 'bg-violet-500' }, description: 'İstanbul Kültür Turu', bookingId: 'BK-1002', date: '2026-03-27', amount: '$890', currency: 'EUR', status: 'Pending' },
  { id: 'PAY-3003', customer: { name: 'John Davies', initials: 'JD', color: 'bg-blue-500' }, description: 'Antalya Beach Resort', bookingId: 'BK-1003', date: '2026-03-26', amount: '$2,100', currency: 'USD', status: 'Succeeded' },
  { id: 'PAY-3004', customer: { name: 'Elif Kaya', initials: 'EK', color: 'bg-amber-500' }, description: 'Pamukkale Termal', bookingId: 'BK-1004', date: '2026-03-25', amount: '$750', currency: 'TRY', status: 'Failed' },
  { id: 'PAY-3005', customer: { name: 'Hans Müller', initials: 'HM', color: 'bg-rose-500' }, description: 'Efes Antik Şehir', bookingId: 'BK-1005', date: '2026-03-24', amount: '$560', currency: 'EUR', status: 'Succeeded' },
  { id: 'PAY-3006', customer: { name: 'Sophie Laurent', initials: 'SL', color: 'bg-cyan-500' }, description: 'Bodrum Tekne Turu', bookingId: 'BK-1006', date: '2026-03-23', amount: '$1,800', currency: 'USD', status: 'Pending' },
  { id: 'PAY-3007', customer: { name: 'Can Demir', initials: 'CD', color: 'bg-indigo-500' }, description: 'Trabzon Doğa Turu', bookingId: 'BK-1007', date: '2026-03-22', amount: '$680', currency: 'TRY', status: 'Succeeded' },
];

const statusConfig = {
  Succeeded: { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle },
  Pending: { color: 'bg-amber-50 text-amber-700 border-amber-200', icon: Clock },
  Failed: { color: 'bg-red-50 text-red-700 border-red-200', icon: XCircle },
};

export function Payments() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'All' | 'Succeeded' | 'Pending' | 'Failed'>('All');
  const [search, setSearch] = useState('');

  const filtered = mockPayments.filter((p) => {
    const matchesFilter = filter === 'All' || p.status === filter;
    const matchesSearch =
      p.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalSucceeded = mockPayments.filter((p) => p.status === 'Succeeded').reduce((sum, p) => sum + parseFloat(p.amount.replace('$', '').replace(',', '')), 0);
  const totalPending = mockPayments.filter((p) => p.status === 'Pending').reduce((sum, p) => sum + parseFloat(p.amount.replace('$', '').replace(',', '')), 0);
  const totalFailed = mockPayments.filter((p) => p.status === 'Failed').reduce((sum, p) => sum + parseFloat(p.amount.replace('$', '').replace(',', '')), 0);

  const stats = [
    { label: 'Toplam İşlem', value: `$${(totalSucceeded + totalPending + totalFailed).toLocaleString()}`, icon: DollarSign, color: 'from-teal-500 to-emerald-600' },
    { label: t('payments.succeeded'), value: `$${totalSucceeded.toLocaleString()}`, icon: CheckCircle, color: 'from-emerald-500 to-green-600' },
    { label: t('bookings.pending'), value: `$${totalPending.toLocaleString()}`, icon: Clock, color: 'from-amber-500 to-orange-600' },
    { label: t('payments.failed'), value: `$${totalFailed.toLocaleString()}`, icon: AlertCircle, color: 'from-red-500 to-rose-600' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-900">{t('payments.title')}</h2>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
          <Download className="w-4 h-4" />
          {t('common.export')}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-slate-200/60 p-5">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
          {(['All', 'Succeeded', 'Pending', 'Failed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filter === f ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {f === 'All' ? t('bookings.all') : f}
            </button>
          ))}
        </div>
        <div className="flex-1 flex items-center gap-2 bg-white border border-slate-200/80 rounded-xl px-3 py-2">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('common.search')}
            className="bg-transparent text-sm outline-none w-full text-slate-700 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">ID</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">{t('common.customer')}</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Açıklama</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">{t('common.date')}</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">{t('common.amount')}</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">{t('common.status')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((payment) => {
                const StatusIcon = statusConfig[payment.status].icon;
                return (
                  <tr key={payment.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-mono text-slate-500">{payment.id}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${payment.customer.color} flex items-center justify-center text-white text-xs font-bold`}>
                          {payment.customer.initials}
                        </div>
                        <span className="text-sm font-medium text-slate-800">{payment.customer.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="text-sm text-slate-700">{payment.description}</div>
                      <div className="text-xs text-slate-400">{payment.bookingId}</div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-600">{payment.date}</td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-slate-800">{payment.amount}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${statusConfig[payment.status].color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100">
          <span className="text-sm text-slate-500">1-{filtered.length} / {filtered.length}</span>
          <div className="flex gap-1">
            <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><ChevronLeft className="w-4 h-4" /></button>
            <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
