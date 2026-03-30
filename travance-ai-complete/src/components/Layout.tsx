import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  LayoutDashboard,
  MapPin,
  CalendarCheck,
  CreditCard,
  Headphones,
  Megaphone,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Globe,
  Bell,
  Search,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, labelKey: 'nav.dashboard' },
  { path: '/destinations', icon: MapPin, labelKey: 'nav.destinations' },
  { path: '/bookings', icon: CalendarCheck, labelKey: 'nav.bookings' },
  { path: '/payments', icon: CreditCard, labelKey: 'nav.payments' },
  { path: '/support', icon: Headphones, labelKey: 'nav.support' },
  { path: '/marketing', icon: Megaphone, labelKey: 'nav.marketing' },
  { path: '/affiliates', icon: Users, labelKey: 'nav.affiliates' },
  { path: '/reports', icon: BarChart3, labelKey: 'nav.reports' },
  { path: '/settings', icon: Settings, labelKey: 'nav.settings' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();

  const currentPage = navItems.find(
    (item) => item.path === location.pathname
  ) || navItems[0];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-r border-white/5 transition-all duration-300 ease-in-out ${
          collapsed ? 'w-[72px]' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-white/5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <h1 className="text-base font-bold text-white tracking-tight truncate">
                Travance AI
              </h1>
              <p className="text-[10px] text-teal-400/80 font-medium tracking-widest uppercase">
                Tourism Platform
              </p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-500/20 to-emerald-500/10 text-teal-400 shadow-inner'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                } ${collapsed ? 'justify-center' : ''}`
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="truncate">{t(item.labelKey)}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Collapse toggle */}
        <div className="p-3 border-t border-white/5 hidden lg:block">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span className="text-xs">Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl flex items-center justify-between px-4 lg:px-6 flex-shrink-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-slate-800">
              {t(currentPage.labelKey)}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-slate-100/80 rounded-xl px-3 py-2 w-64">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={t('common.search')}
                className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
              />
            </div>

            {/* Language toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase text-xs">{language}</span>
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
            </button>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white text-sm font-bold shadow-md ml-1">
              TA
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
