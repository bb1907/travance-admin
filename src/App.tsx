/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Payments } from './pages/Payments';
import { Support } from './pages/Support';
import { Destinations } from './pages/Destinations';
import { Settings } from './pages/Settings';
import { Bookings } from './pages/Bookings';
import { Marketing } from './pages/Marketing';
import { Reports } from './pages/Reports';
import { Affiliates } from './pages/Affiliates';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './components/Toast';

export default function App() {
  return (
    <LanguageProvider>
      <ToastProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/support" element={<Support />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/marketing" element={<Marketing />} />
              <Route path="/affiliates" element={<Affiliates />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </Layout>
        </Router>
      </ToastProvider>
    </LanguageProvider>
  );
}
