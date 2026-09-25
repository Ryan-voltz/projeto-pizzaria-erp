import React, { useState } from 'react';
import Sidebar, { navigationItems } from './Sidebar';
import Header from './Header';
import { initialOrders } from '../../data/mockData';

export default function AppLayout({
  activeNav,
  onSelectNav,
  children,
  onOpenQuickPrint,
  alertCount
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Derive current page title & breadcrumbs
  const currentNav = navigationItems.find((item) => item.id === activeNav);
  const pageTitle = currentNav ? (currentNav.id === 'dashboard' ? 'Dashboard Operacional' : currentNav.label) : 'Sistema ERP';
  const breadcrumbs = ['Início', currentNav ? currentNav.label : 'Dashboard'];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-900">
      {/* Sidebar */}
      <Sidebar
        activeNav={activeNav}
        onSelectNav={onSelectNav}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Wrapper (offset by sidebar width on desktop) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Header */}
        <Header
          pageTitle={pageTitle}
          breadcrumbs={breadcrumbs}
          onToggleMobileMenu={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onOpenQuickPrint={onOpenQuickPrint}
          alertCount={alertCount}
          onOpenAlerts={() => {
            const alertsEl = document.querySelector('#alerts-section');
            if (alertsEl) alertsEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
