import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../components/Toast';
import type { Booking, BookingStatus } from '../types';
import {
  Search,
  Plus,
  Filter,
  Download,
  MoreHorizontal,
  Plane,
  Eye,
  Edit3,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const mockBookings: Booking[] = [
  { id: 'BK-1001', customer: { name: 'Ahmet Yılmaz', initials: 'AY', color: 'bg-teal-500' }, trip: 'Kapadokya Balon Turu', type: 'Adventure', date: '2026-04-15', amount: '$1,250', status: 'Confirmed' },
  { id: 'BK-1002', customer: { name: 'Maria Schmidt', initials: 'MS', color: 'bg-violet-500' }, trip: 'İstanbul Kültür Turu', type: 'Culture', date: '2026-04-18', amount: '$890', status: 'Pending' },
  { id: 'BK-1003', customer: { name: 'John Davies', initials: 'JD', color: 'bg-blue-500' }, trip: 'Antalya Beach Resort', type: 'Beach', date: '2026-05-01', amount: '$2,100', status: 'Confirmed' },
  { id: 'BK-1004', customer: { name: 'Elif Kaya', initials: 'EK', color: 'bg-amber-500' }, trip: 'Pamukkale Termal', type: 'Wellness', date: '2026-04-22', amount: '$750', status: 'Cancelled' },
  { id: 'BK-1005', customer: { name: 'Hans Müller', initials: 'HM', color: 'bg-rose-500' }, trip: 'Efes Antik Şehir', type: 'History', date: '2026-04-25', amount: '$560', status: 'Confirmed' },
  { id: 'BK-1006', customer: { name: 'Sophie Laurent', initials: 'SL', color: 'bg-cyan-500' }, trip: 'Bodrum Tekne Turu', type: 'Cruise', date: '2026-05-10', amount: '$1,800', status: 'Pending' },
  { id: 'BK-1007', customer: { name: 'Can Demir', initials: 'CD', color: 'bg-indigo-500' }, trip: 'Trabzon Doğa Turu', type: 'Nature', date: '2026-05-05', amount: '$680', status: 'Confirmed' },
  { id: 'BK-1008', customer: { name: 'Lisa Park', initials: 'LP', color: 'bg-pink-500' }, trip: 'İstanbul Gastronomi', type: 'Food', date: '2026-04-28', amount: '$450', status: 'Pending' },
];

const statusColors: Record<BookingStatus, string> = {
  Confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Cancelled: 'bg-red-50 text-red-700 border-red-200',
};

export function Bookings() {
  const { t } = useLanguage();
  const { addToast } = useToast();
  const [filter, setFilter] = useState<BookingStatus | 'All'>('All');
  const [search, setSearch] = useState('');

  const filtered = mockBookings.filter((b) => {
    const matchesFilter = filter === 'All' || b.status === filter;
    const matchesSearch =
      b.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      b.trip.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filters: (BookingStatus | 'All')[] = ['All', 'Confirmed', 'Pending', 'Cancelled'];
  const filterLabels: Record<string, string> = {
    All: t('bookings.all'),
    Confirmed: t('bookings.confirmed'),
    Pending: t('bookings.pending'),
    Cancelled: t('bookings.cancelled'),
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{t('bookings.title')}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{filtered.length} kayıt bulundu</p>
        </div>
        <button
          onClick={() => addToast('Yeni rezervasyon formu yakında aktif olacak.', 'info')}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-sm font-medium rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          {t('bookings.newBooking')}
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filter === f
                  ? 'bg-white shadow-sm text-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>
        <div className="flex-1 flex items-center gap-2 bg-white border border-slate-200/80 rounded-xl px-3 py-2">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('bookings.search')}
            className="bg-transparent text-sm outline-none w-full text-slate-700 placeholder-slate-400"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors">
          <Download className="w-4 h-4" />
          {t('common.export')}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">ID</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">{t('common.customer')}</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Tur</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">{t('common.date')}</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">{t('common.amount')}</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">{t('common.status')}</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((booking) => (
                <tr key={booking.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-mono text-slate-500">{booking.id}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${booking.customer.color} flex items-center justify-center text-white text-xs font-bold`}>
                        {booking.customer.initials}
                      </div>
                      <span className="text-sm font-medium text-slate-800">{booking.customer.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 text-sm text-slate-700">
                      <Plane className="w-3.5 h-3.5 text-slate-400" />
                      {booking.trip}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-600">{booking.date}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-slate-800">{booking.amount}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusColors[booking.status]}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
