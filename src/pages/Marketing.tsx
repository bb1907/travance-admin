import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../components/Toast';
import {
  Plus,
  Mail,
  Instagram,
  Globe,
  TrendingUp,
  Eye,
  MousePointer,
  Users,
  BarChart3,
  Pause,
  Play,
  Edit3,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Campaign {
  id: string;
  name: string;
  type: 'Email' | 'Social' | 'Google Ads' | 'Content';
  status: 'Active' | 'Paused' | 'Completed' | 'Draft';
  impressions: string;
  clicks: string;
  conversions: number;
  budget: string;
  spent: string;
  roi: string;
  startDate: string;
}

const mockCampaigns: Campaign[] = [
  { id: 'MC-001', name: 'Yaz Erken Rezervasyon', type: 'Email', status: 'Active', impressions: '45,200', clicks: '3,820', conversions: 128, budget: '$5,000', spent: '$3,240', roi: '+186%', startDate: '2026-03-01' },
  { id: 'MC-002', name: 'Kapadokya Instagram', type: 'Social', status: 'Active', impressions: '128,500', clicks: '12,340', conversions: 89, budget: '$3,000', spent: '$2,100', roi: '+245%', startDate: '2026-03-10' },
  { id: 'MC-003', name: 'Google Ads - Beach', type: 'Google Ads', status: 'Paused', impressions: '67,800', clicks: '4,560', conversions: 67, budget: '$8,000', spent: '$6,500', roi: '+92%', startDate: '2026-02-15' },
  { id: 'MC-004', name: 'Blog - Türkiye Rehberi', type: 'Content', status: 'Completed', impressions: '23,400', clicks: '2,890', conversions: 34, budget: '$1,500', spent: '$1,500', roi: '+320%', startDate: '2026-01-20' },
  { id: 'MC-005', name: 'Bayram Kampanyası', type: 'Email', status: 'Draft', impressions: '—', clicks: '—', conversions: 0, budget: '$4,000', spent: '$0', roi: '—', startDate: '2026-04-10' },
];

const channelData = [
  { channel: 'Email', leads: 342, conversion: 4.2 },
  { channel: 'Social', leads: 567, conversion: 2.8 },
  { channel: 'Google', leads: 234, conversion: 5.1 },
  { channel: 'SEO', leads: 456, conversion: 3.5 },
  { channel: 'Referral', leads: 189, conversion: 6.8 },
];

const statusColors: Record<string, string> = {
  Active: 'bg-emerald-50 text-emerald-700',
  Paused: 'bg-amber-50 text-amber-700',
  Completed: 'bg-blue-50 text-blue-700',
  Draft: 'bg-slate-100 text-slate-600',
};

const typeIcons: Record<string, React.ReactNode> = {
  Email: <Mail className="w-4 h-4" />,
  Social: <Instagram className="w-4 h-4" />,
  'Google Ads': <Globe className="w-4 h-4" />,
  Content: <Edit3 className="w-4 h-4" />,
};

export function Marketing() {
  const { t } = useLanguage();
  const { addToast } = useToast();

  const stats = [
    { label: 'Toplam Gösterim', value: '264,900', change: '+18%', icon: Eye, color: 'from-blue-500 to-indigo-600' },
    { label: 'Tıklama', value: '23,610', change: '+12%', icon: MousePointer, color: 'from-violet-500 to-purple-600' },
    { label: 'Dönüşüm', value: '318', change: '+24%', icon: Users, color: 'from-teal-500 to-emerald-600' },
    { label: 'Ortalama ROI', value: '+211%', change: '+15%', icon: TrendingUp, color: 'from-amber-500 to-orange-600' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-900">{t('marketing.title')}</h2>
        <button
          onClick={() => addToast('Yeni kampanya oluşturucu açılıyor...', 'info')}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-sm font-medium rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-xl transition-all"
        >
          <Plus className="w-4 h-4" />
          {t('marketing.createCampaign')}
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
            <div className="mt-2">
              <span className="text-xs text-emerald-600 font-semibold">{stat.change}</span>
              <span className="text-xs text-slate-400 ml-1">bu ay</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Channel Performance Chart */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
          <h3 className="text-base font-semibold text-slate-800 mb-4">Kanal Performansı</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={channelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="channel" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
              <Bar dataKey="leads" fill="#14b8a6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Marketing Suggestions */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-teal-500/20">
              <Sparkles className="w-4 h-4 text-teal-400" />
            </div>
            <h3 className="text-base font-semibold">AI Pazarlama Önerileri</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: 'Email A/B Testi', desc: 'Yaz kampanyasında konu başlığı A/B testi ile %15 daha fazla açılma oranı elde edebilirsiniz.', emoji: '📧' },
              { title: 'Instagram Reels', desc: 'Kapadokya balon videoları ile Reels paylaşımı yapın. Tahmini erişim: 50K+', emoji: '📱' },
              { title: 'Retargeting', desc: 'Sepeti terk eden kullanıcılara retargeting kampanyası başlatın. Potansiyel ROI: %180', emoji: '🎯' },
              { title: 'Influencer', desc: 'Seyahat influencer\'ları ile işbirliği yapın. Bütçe/Getiri oranı: 1:4.5', emoji: '⭐' },
            ].map((item, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-start gap-2">
                  <span className="text-lg">{item.emoji}</span>
                  <div>
                    <p className="text-sm font-medium text-white/90">{item.title}</p>
                    <p className="text-xs text-white/50 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-base font-semibold text-slate-800">{t('marketing.campaigns')}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Kampanya</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Tür</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">{t('common.status')}</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Gösterim</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Tıklama</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Dönüşüm</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Bütçe</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">ROI</th>
              </tr>
            </thead>
            <tbody>
              {mockCampaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-medium text-slate-800">{campaign.name}</p>
                    <p className="text-xs text-slate-400">{campaign.id}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      {typeIcons[campaign.type]}
                      {campaign.type}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[campaign.status]}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-700">{campaign.impressions}</td>
                  <td className="px-5 py-3.5 text-sm text-slate-700">{campaign.clicks}</td>
                  <td className="px-5 py-3.5 text-sm font-medium text-slate-800">{campaign.conversions}</td>
                  <td className="px-5 py-3.5">
                    <div className="text-sm text-slate-700">{campaign.spent}</div>
                    <div className="text-xs text-slate-400">/ {campaign.budget}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-sm font-semibold ${campaign.roi.startsWith('+') ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {campaign.roi}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
