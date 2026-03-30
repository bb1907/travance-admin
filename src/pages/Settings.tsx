import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../components/Toast';
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Puzzle,
  Globe,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Key,
  Smartphone,
  Save,
  Eye,
  EyeOff,
  Check,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

type SettingsTab = 'general' | 'notifications' | 'security' | 'integrations';

const tabs: { key: SettingsTab; icon: React.ComponentType<any>; labelKey: string }[] = [
  { key: 'general', icon: SettingsIcon, labelKey: 'settings.general' },
  { key: 'notifications', icon: Bell, labelKey: 'settings.notifications' },
  { key: 'security', icon: Shield, labelKey: 'settings.security' },
  { key: 'integrations', icon: Puzzle, labelKey: 'settings.integrations' },
];

export function Settings() {
  const { t, language, setLanguage } = useLanguage();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [showApiKey, setShowApiKey] = useState(false);

  const [general, setGeneral] = useState({
    companyName: 'Travance AI Tourism',
    email: 'admin@travance.ai',
    phone: '+90 212 555 0000',
    address: 'Levent, İstanbul, Türkiye',
    timezone: 'Europe/Istanbul',
    currency: 'USD',
  });

  const [notifications, setNotifications] = useState({
    emailBookings: true,
    emailPayments: true,
    emailMarketing: false,
    pushBookings: true,
    pushSupport: true,
    pushReports: false,
    smsAlerts: false,
  });

  const handleSave = () => {
    addToast('Ayarlar başarıyla kaydedildi!', 'success');
  };

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-slate-900">{t('settings.title')}</h2>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Sidebar */}
        <div className="w-full lg:w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200/60 p-2 flex lg:flex-col gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
              >
                <tab.icon className="w-4 h-4 flex-shrink-0" />
                {t(tab.labelKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'general' && (
            <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-6">
              <div>
                <h3 className="text-base font-semibold text-slate-800 mb-1">Şirket Bilgileri</h3>
                <p className="text-sm text-slate-400">İşletme temel bilgilerinizi güncelleyin.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Şirket Adı</label>
                  <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2.5">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    <input type="text" value={general.companyName} onChange={(e) => setGeneral({ ...general, companyName: e.target.value })} className="bg-transparent text-sm outline-none w-full" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">E-posta</label>
                  <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2.5">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <input type="email" value={general.email} onChange={(e) => setGeneral({ ...general, email: e.target.value })} className="bg-transparent text-sm outline-none w-full" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Telefon</label>
                  <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2.5">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <input type="tel" value={general.phone} onChange={(e) => setGeneral({ ...general, phone: e.target.value })} className="bg-transparent text-sm outline-none w-full" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Adres</label>
                  <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2.5">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <input type="text" value={general.address} onChange={(e) => setGeneral({ ...general, address: e.target.value })} className="bg-transparent text-sm outline-none w-full" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Dil</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as 'en' | 'tr')}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none bg-white"
                  >
                    <option value="tr">Türkçe</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Zaman Dilimi</label>
                  <select value={general.timezone} onChange={(e) => setGeneral({ ...general, timezone: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none bg-white">
                    <option value="Europe/Istanbul">Istanbul (UTC+3)</option>
                    <option value="Europe/London">London (UTC+0)</option>
                    <option value="America/New_York">New York (UTC-5)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Para Birimi</label>
                  <select value={general.currency} onChange={(e) => setGeneral({ ...general, currency: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none bg-white">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="TRY">TRY (₺)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-sm font-medium rounded-xl shadow-lg shadow-teal-500/20">
                  <Save className="w-4 h-4" />
                  {t('settings.save')}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-6">
              <div>
                <h3 className="text-base font-semibold text-slate-800 mb-1">Bildirim Tercihleri</h3>
                <p className="text-sm text-slate-400">Hangi bildirimleri almak istediğinizi seçin.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <Mail className="w-4 h-4" /> E-posta Bildirimleri
                  </h4>
                  <div className="space-y-3">
                    {[
                      { key: 'emailBookings', label: 'Yeni rezervasyonlar' },
                      { key: 'emailPayments', label: 'Ödeme bildirimleri' },
                      { key: 'emailMarketing', label: 'Pazarlama raporları' },
                    ].map((item) => (
                      <label key={item.key} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer">
                        <span className="text-sm text-slate-700">{item.label}</span>
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={notifications[item.key as keyof typeof notifications]}
                            onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-5 bg-slate-200 peer-checked:bg-teal-500 rounded-full transition-colors" />
                          <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm peer-checked:translate-x-5 transition-transform" />
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <Bell className="w-4 h-4" /> Push Bildirimleri
                  </h4>
                  <div className="space-y-3">
                    {[
                      { key: 'pushBookings', label: 'Rezervasyon güncellemeleri' },
                      { key: 'pushSupport', label: 'Destek talepleri' },
                      { key: 'pushReports', label: 'Haftalık raporlar' },
                    ].map((item) => (
                      <label key={item.key} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer">
                        <span className="text-sm text-slate-700">{item.label}</span>
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={notifications[item.key as keyof typeof notifications]}
                            onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-5 bg-slate-200 peer-checked:bg-teal-500 rounded-full transition-colors" />
                          <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm peer-checked:translate-x-5 transition-transform" />
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-sm font-medium rounded-xl shadow-lg shadow-teal-500/20">
                  <Save className="w-4 h-4" />
                  {t('settings.save')}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-6">
              <div>
                <h3 className="text-base font-semibold text-slate-800 mb-1">Güvenlik Ayarları</h3>
                <p className="text-sm text-slate-400">Hesap güvenliğinizi yönetin.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">API Anahtarı</label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2.5">
                      <Key className="w-4 h-4 text-slate-400" />
                      <input
                        type={showApiKey ? 'text' : 'password'}
                        value="sk-trav-xxxxxxxxxxxxxxxxxxxx"
                        readOnly
                        className="bg-transparent text-sm outline-none w-full font-mono"
                      />
                    </div>
                    <button onClick={() => setShowApiKey(!showApiKey)} className="p-2.5 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50">
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-teal-50">
                        <Shield className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">İki Faktörlü Doğrulama</p>
                        <p className="text-xs text-slate-400">Hesabınıza ekstra güvenlik ekleyin</p>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium">Aktif</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-50">
                        <Smartphone className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">Oturum Yönetimi</p>
                        <p className="text-xs text-slate-400">2 aktif oturum</p>
                      </div>
                    </div>
                    <button className="text-xs text-teal-600 font-medium hover:text-teal-700">Yönet</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-6">
              <div>
                <h3 className="text-base font-semibold text-slate-800 mb-1">Entegrasyonlar</h3>
                <p className="text-sm text-slate-400">Üçüncü parti hizmetleri bağlayın.</p>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Google Analytics', desc: 'Web trafiği ve kullanıcı analitikleri', connected: true, emoji: '📊' },
                  { name: 'Stripe', desc: 'Ödeme işlemleri', connected: true, emoji: '💳' },
                  { name: 'Mailchimp', desc: 'E-posta pazarlama', connected: true, emoji: '📧' },
                  { name: 'Slack', desc: 'Takım bildirimleri', connected: false, emoji: '💬' },
                  { name: 'HubSpot', desc: 'CRM ve müşteri yönetimi', connected: false, emoji: '🤝' },
                  { name: 'Gemini AI', desc: 'AI destekli içerik ve öneri motoru', connected: true, emoji: '✨' },
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{integration.emoji}</span>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{integration.name}</p>
                        <p className="text-xs text-slate-400">{integration.desc}</p>
                      </div>
                    </div>
                    {integration.connected ? (
                      <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                        <Check className="w-3 h-3" /> Bağlı
                      </span>
                    ) : (
                      <button className="text-xs font-medium text-teal-600 border border-teal-200 px-3 py-1.5 rounded-lg hover:bg-teal-50 transition-colors">
                        Bağla
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
