import React, { createContext, useContext, useState, useCallback } from 'react';

type Language = 'en' | 'tr';

interface Translations {
  [key: string]: { en: string; tr: string };
}

const translations: Translations = {
  // Navigation
  'nav.dashboard': { en: 'Dashboard', tr: 'Gösterge Paneli' },
  'nav.destinations': { en: 'Destinations', tr: 'Destinasyonlar' },
  'nav.bookings': { en: 'Bookings', tr: 'Rezervasyonlar' },
  'nav.payments': { en: 'Payments', tr: 'Ödemeler' },
  'nav.support': { en: 'Support', tr: 'Destek' },
  'nav.marketing': { en: 'Marketing', tr: 'Pazarlama' },
  'nav.affiliates': { en: 'Affiliates', tr: 'İş Ortakları' },
  'nav.reports': { en: 'Reports', tr: 'Raporlar' },
  'nav.settings': { en: 'Settings', tr: 'Ayarlar' },

  // Dashboard
  'dashboard.title': { en: 'Dashboard Overview', tr: 'Genel Bakış' },
  'dashboard.totalRevenue': { en: 'Total Revenue', tr: 'Toplam Gelir' },
  'dashboard.activeBookings': { en: 'Active Bookings', tr: 'Aktif Rezervasyonlar' },
  'dashboard.newCustomers': { en: 'New Customers', tr: 'Yeni Müşteriler' },
  'dashboard.conversionRate': { en: 'Conversion Rate', tr: 'Dönüşüm Oranı' },
  'dashboard.recentBookings': { en: 'Recent Bookings', tr: 'Son Rezervasyonlar' },
  'dashboard.revenueChart': { en: 'Revenue Overview', tr: 'Gelir Özeti' },
  'dashboard.topDestinations': { en: 'Top Destinations', tr: 'Popüler Destinasyonlar' },
  'dashboard.aiInsights': { en: 'AI Insights', tr: 'AI Öngörüleri' },

  // Bookings
  'bookings.title': { en: 'Booking Management', tr: 'Rezervasyon Yönetimi' },
  'bookings.all': { en: 'All', tr: 'Tümü' },
  'bookings.confirmed': { en: 'Confirmed', tr: 'Onaylandı' },
  'bookings.pending': { en: 'Pending', tr: 'Beklemede' },
  'bookings.cancelled': { en: 'Cancelled', tr: 'İptal Edildi' },
  'bookings.search': { en: 'Search bookings...', tr: 'Rezervasyon ara...' },
  'bookings.newBooking': { en: 'New Booking', tr: 'Yeni Rezervasyon' },

  // Payments
  'payments.title': { en: 'Payment Management', tr: 'Ödeme Yönetimi' },
  'payments.succeeded': { en: 'Succeeded', tr: 'Başarılı' },
  'payments.failed': { en: 'Failed', tr: 'Başarısız' },

  // Support
  'support.title': { en: 'Customer Support', tr: 'Müşteri Desteği' },
  'support.conversations': { en: 'Conversations', tr: 'Görüşmeler' },
  'support.aiAssistant': { en: 'AI Assistant', tr: 'AI Asistan' },

  // Destinations
  'destinations.title': { en: 'Destination Manager', tr: 'Destinasyon Yöneticisi' },
  'destinations.addNew': { en: 'Add Destination', tr: 'Destinasyon Ekle' },

  // Marketing
  'marketing.title': { en: 'Marketing Hub', tr: 'Pazarlama Merkezi' },
  'marketing.campaigns': { en: 'Campaigns', tr: 'Kampanyalar' },
  'marketing.createCampaign': { en: 'Create Campaign', tr: 'Kampanya Oluştur' },

  // Affiliates
  'affiliates.title': { en: 'Affiliate Program', tr: 'İş Ortaklığı Programı' },
  'affiliates.addNew': { en: 'Add Affiliate', tr: 'İş Ortağı Ekle' },

  // Reports
  'reports.title': { en: 'Analytics & Reports', tr: 'Analitik & Raporlar' },
  'reports.generate': { en: 'Generate Report', tr: 'Rapor Oluştur' },

  // Settings
  'settings.title': { en: 'Settings', tr: 'Ayarlar' },
  'settings.general': { en: 'General', tr: 'Genel' },
  'settings.notifications': { en: 'Notifications', tr: 'Bildirimler' },
  'settings.security': { en: 'Security', tr: 'Güvenlik' },
  'settings.integrations': { en: 'Integrations', tr: 'Entegrasyonlar' },
  'settings.save': { en: 'Save Changes', tr: 'Değişiklikleri Kaydet' },

  // Common
  'common.search': { en: 'Search...', tr: 'Ara...' },
  'common.filter': { en: 'Filter', tr: 'Filtrele' },
  'common.export': { en: 'Export', tr: 'Dışa Aktar' },
  'common.view': { en: 'View', tr: 'Görüntüle' },
  'common.edit': { en: 'Edit', tr: 'Düzenle' },
  'common.delete': { en: 'Delete', tr: 'Sil' },
  'common.cancel': { en: 'Cancel', tr: 'İptal' },
  'common.save': { en: 'Save', tr: 'Kaydet' },
  'common.loading': { en: 'Loading...', tr: 'Yükleniyor...' },
  'common.noData': { en: 'No data available', tr: 'Veri bulunamadı' },
  'common.status': { en: 'Status', tr: 'Durum' },
  'common.date': { en: 'Date', tr: 'Tarih' },
  'common.amount': { en: 'Amount', tr: 'Tutar' },
  'common.customer': { en: 'Customer', tr: 'Müşteri' },
  'common.actions': { en: 'Actions', tr: 'İşlemler' },
  'common.total': { en: 'Total', tr: 'Toplam' },
  'common.vsLastMonth': { en: 'vs last month', tr: 'geçen aya göre' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('tr');

  const t = useCallback(
    (key: string): string => {
      return translations[key]?.[language] || key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
