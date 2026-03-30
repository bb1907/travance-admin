import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../components/Toast';
import type { Affiliate, Referral } from '../types';
import {
  Plus,
  Search,
  Users,
  DollarSign,
  TrendingUp,
  Link2,
  Copy,
  Eye,
  Edit3,
  ChevronLeft,
  ChevronRight,
  Award,
} from 'lucide-react';

const mockAffiliates: Affiliate[] = [
  { id: 'AF-001', name: 'Seyahat Blog TR', email: 'info@seyahatblog.tr', referralCode: 'BLOG2026', totalEarnings: '$12,450', balance: '$3,200', status: 'Active', joinedDate: '2025-06-15' },
  { id: 'AF-002', name: 'Travel Vlogger EU', email: 'contact@travelvlog.eu', referralCode: 'VLOG2026', totalEarnings: '$8,900', balance: '$1,500', status: 'Active', joinedDate: '2025-08-20' },
  { id: 'AF-003', name: 'Türkiye Rehberi', email: 'admin@turkiyerehberi.com', referralCode: 'REHBER26', totalEarnings: '$6,200', balance: '$890', status: 'Active', joinedDate: '2025-09-10' },
  { id: 'AF-004', name: 'Nomad Digital', email: 'hello@nomaddigital.co', referralCode: 'NOMAD26', totalEarnings: '$4,100', balance: '$2,100', status: 'Pending', joinedDate: '2026-01-05' },
  { id: 'AF-005', name: 'Backpacker World', email: 'team@backpackerworld.com', referralCode: 'BPWRLD', totalEarnings: '$1,800', balance: '$1,800', status: 'Suspended', joinedDate: '2025-11-20' },
];

const mockReferrals: Referral[] = [
  { id: 'RF-001', affiliateId: 'AF-001', affiliateName: 'Seyahat Blog TR', customerName: 'Ahmet Y.', bookingId: 'BK-1001', bookingAmount: '$1,250', commissionAmount: '$250', date: '2026-03-28', status: 'Paid' },
  { id: 'RF-002', affiliateId: 'AF-002', affiliateName: 'Travel Vlogger EU', customerName: 'Hans M.', bookingId: 'BK-1005', bookingAmount: '$560', commissionAmount: '$112', date: '2026-03-26', status: 'Approved' },
  { id: 'RF-003', affiliateId: 'AF-001', affiliateName: 'Seyahat Blog TR', customerName: 'Sophie L.', bookingId: 'BK-1006', bookingAmount: '$1,800', commissionAmount: '$360', date: '2026-03-24', status: 'Pending' },
  { id: 'RF-004', affiliateId: 'AF-003', affiliateName: 'Türkiye Rehberi', customerName: 'Can D.', bookingId: 'BK-1007', bookingAmount: '$680', commissionAmount: '$136', date: '2026-03-22', status: 'Paid' },
];

const affiliateStatusColors: Record<string, string> = {
  Active: 'bg-emerald-50 text-emerald-700',
  Pending: 'bg-amber-50 text-amber-700',
  Suspended: 'bg-red-50 text-red-700',
};

const referralStatusColors: Record<string, string> = {
  Paid: 'bg-emerald-50 text-emerald-700',
  Approved: 'bg-blue-50 text-blue-700',
  Pending: 'bg-amber-50 text-amber-700',
  Rejected: 'bg-red-50 text-red-700',
};

export function Affiliates() {
  const { t } = useLanguage();
  const { addToast } = useToast();
  const [tab, setTab] = useState<'affiliates' | 'referrals'>('affiliates');
  const [search, setSearch] = useState('');

  const totalEarnings = '$33,450';
  const totalPending = '$5,590';
  const activeAffiliates = mockAffiliates.filter((a) => a.status === 'Active').length;

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    addToast(`Referral kodu kopyalandı: ${code}`, 'success');
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-900">{t('affiliates.title')}</h2>
        <button
          onClick={() => addToast('Yeni iş ortağı davet formu açılıyor...', 'info')}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-sm font-medium rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-xl transition-all"
        >
          <Plus className="w-4 h-4" />
          {t('affiliates.addNew')}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/60 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 shadow-lg">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900">{totalEarnings}</p>
              <p className="text-xs text-slate-500">Toplam Komisyon</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/60 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900">{totalPending}</p>
              <p className="text-xs text-slate-500">Bekleyen Ödeme</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/60 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900">{activeAffiliates}</p>
              <p className="text-xs text-slate-500">Aktif İş Ortağı</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit">
        <button
          onClick={() => setTab('affiliates')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${tab === 'affiliates' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
        >
          İş Ortakları
        </button>
        <button
          onClick={() => setTab('referrals')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${tab === 'referrals' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
        >
          Referanslar
        </button>
      </div>

      {tab === 'affiliates' ? (
        <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">İş Ortağı</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Referral Kodu</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Toplam Kazanç</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Bakiye</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">{t('common.status')}</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">{t('common.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {mockAffiliates.map((affiliate) => (
                  <tr key={affiliate.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{affiliate.name}</p>
                          <p className="text-xs text-slate-400">{affiliate.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-slate-100 px-2 py-1 rounded-md font-mono text-slate-700">{affiliate.referralCode}</code>
                        <button onClick={() => copyCode(affiliate.referralCode)} className="p-1 text-slate-400 hover:text-slate-600">
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-slate-800">{affiliate.totalEarnings}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-700">{affiliate.balance}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${affiliateStatusColors[affiliate.status]}`}>
                        {affiliate.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><Eye className="w-4 h-4" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><Edit3 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">İş Ortağı</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Müşteri</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Rezervasyon</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Komisyon</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">{t('common.date')}</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">{t('common.status')}</th>
                </tr>
              </thead>
              <tbody>
                {mockReferrals.map((referral) => (
                  <tr key={referral.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-medium text-slate-800">{referral.affiliateName}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-700">{referral.customerName}</td>
                    <td className="px-5 py-3.5">
                      <div className="text-sm text-slate-700">{referral.bookingAmount}</div>
                      <div className="text-xs text-slate-400">{referral.bookingId}</div>
                    </td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-emerald-600">{referral.commissionAmount}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-600">{referral.date}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${referralStatusColors[referral.status]}`}>
                        {referral.status}
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
