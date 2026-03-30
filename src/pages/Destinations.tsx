import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../components/Toast';
import {
  Plus,
  Search,
  MapPin,
  Star,
  Users,
  TrendingUp,
  Edit3,
  Trash2,
  Eye,
  Grid3X3,
  List,
  Calendar,
} from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  region: string;
  description: string;
  rating: number;
  bookings: number;
  revenue: string;
  status: 'Active' | 'Draft' | 'Archived';
  image: string;
  tags: string[];
}

const mockDestinations: Destination[] = [
  { id: '1', name: 'Kapadokya', region: 'Nevşehir', description: 'Peri bacaları ve balon turları ile ünlü eşsiz doğa harikası.', rating: 4.9, bookings: 342, revenue: '$128,400', status: 'Active', image: '🎈', tags: ['Adventure', 'Nature', 'Culture'] },
  { id: '2', name: 'İstanbul', region: 'İstanbul', description: 'Doğu ile batının buluştuğu, tarih kokan megaşehir.', rating: 4.8, bookings: 298, revenue: '$112,500', status: 'Active', image: '🕌', tags: ['Culture', 'History', 'Food'] },
  { id: '3', name: 'Antalya', region: 'Antalya', description: 'Turkuaz sahilleri ve lüks tatil köyleriyle Türk Rivierası.', rating: 4.7, bookings: 256, revenue: '$96,200', status: 'Active', image: '🏖️', tags: ['Beach', 'Luxury', 'Family'] },
  { id: '4', name: 'Pamukkale', region: 'Denizli', description: 'Beyaz travertenleri ve antik Hierapolis şehri.', rating: 4.6, bookings: 189, revenue: '$71,800', status: 'Active', image: '♨️', tags: ['Nature', 'Wellness', 'History'] },
  { id: '5', name: 'Efes', region: 'İzmir', description: 'Antik dünyanın en iyi korunmuş şehirlerinden biri.', rating: 4.5, bookings: 145, revenue: '$54,200', status: 'Active', image: '🏛️', tags: ['History', 'Culture'] },
  { id: '6', name: 'Bodrum', region: 'Muğla', description: 'Ege\'nin incisi, tekne turları ve gece hayatı.', rating: 4.4, bookings: 198, revenue: '$87,600', status: 'Active', image: '⛵', tags: ['Beach', 'Nightlife', 'Cruise'] },
  { id: '7', name: 'Trabzon', region: 'Trabzon', description: 'Sümela Manastırı ve yemyeşil yaylalar diyarı.', rating: 4.3, bookings: 87, revenue: '$32,100', status: 'Draft', image: '🏔️', tags: ['Nature', 'Culture', 'Trekking'] },
  { id: '8', name: 'Mardin', region: 'Mardin', description: 'Taş evleri ve Mezopotamya manzarasıyla tarihi şehir.', rating: 4.5, bookings: 65, revenue: '$24,800', status: 'Draft', image: '🏰', tags: ['History', 'Culture', 'Architecture'] },
];

const statusColors: Record<string, string> = {
  Active: 'bg-emerald-50 text-emerald-700',
  Draft: 'bg-slate-100 text-slate-600',
  Archived: 'bg-red-50 text-red-600',
};

export function Destinations() {
  const { t } = useLanguage();
  const { addToast } = useToast();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');

  const filtered = mockDestinations.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.region.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{t('destinations.title')}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{filtered.length} destinasyon</p>
        </div>
        <button
          onClick={() => addToast('Yeni destinasyon formu yakında aktif olacak.', 'info')}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-sm font-medium rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-xl transition-all"
        >
          <Plus className="w-4 h-4" />
          {t('destinations.addNew')}
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 bg-white border border-slate-200/80 rounded-xl px-3 py-2">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Destinasyon ara..."
            className="bg-transparent text-sm outline-none w-full text-slate-700 placeholder-slate-400"
          />
        </div>
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-white shadow-sm' : 'text-slate-400'}`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-white shadow-sm' : 'text-slate-400'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 group"
            >
              <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center text-5xl relative">
                {dest.image}
                <span className={`absolute top-3 right-3 text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColors[dest.status]}`}>
                  {dest.status}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">{dest.name}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {dest.region}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-xs font-semibold">{dest.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">{dest.description}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {dest.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Users className="w-3 h-3" /> {dest.bookings}
                    </span>
                    <span className="text-xs font-semibold text-slate-700">{dest.revenue}</span>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 rounded-md hover:bg-slate-100 text-slate-400"><Eye className="w-3.5 h-3.5" /></button>
                    <button className="p-1 rounded-md hover:bg-slate-100 text-slate-400"><Edit3 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Destinasyon</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Bölge</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Puan</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Rezervasyonlar</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Gelir</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">{t('common.status')}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((dest) => (
                  <tr key={dest.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{dest.image}</span>
                        <span className="text-sm font-medium text-slate-800">{dest.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-600">{dest.region}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-sm font-medium">{dest.rating}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-700">{dest.bookings}</td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-slate-800">{dest.revenue}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[dest.status]}`}>
                        {dest.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
