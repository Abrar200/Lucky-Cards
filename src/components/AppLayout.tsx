import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import Sidebar from './admin/Sidebar';
import Header from './admin/Header';
import EnhancedDashboard from './admin/EnhancedDashboard';
import DashboardView from './admin/DashboardView';

import EnhancedOperators from './admin/EnhancedOperators';
import OperatorsView from './admin/OperatorsView';

import JackpotsView from './admin/JackpotsView';
import StreaksView from './admin/StreaksView';
import ReportsView from './admin/ReportsView';
import LanguagesView from './admin/LanguagesView';
import AuditView from './admin/AuditView';
import MarketsView from './admin/MarketsView';
import CurrencyView from './admin/CurrencyView';
import GameConfigView from './admin/GameConfigView';
import PlayersView from './admin/PlayersView';
import LoginScreen from './admin/LoginScreen';
import PaytableEditor from './admin/PaytableEditor';
import PlayerSupportView from './admin/PlayerSupportView';
import InfoPanelEditor from './admin/InfoPanelEditor';
import ComplianceReportsView from './admin/ComplianceReportsView';
import PlayerMonitoringView from './admin/PlayerMonitoringView';
import AnalyticsView from './admin/AnalyticsView';
import BetDenominationsView from './admin/BetDenominationsView';
import LiveTablesView from './admin/LiveTablesView';
import DealerManagementView from './admin/DealerManagementView';
import DealerScheduleView from './admin/DealerScheduleView';
import StreamMonitorView from './admin/StreamMonitorView';
import SettingsView from './admin/SettingsView';





const AppLayout: React.FC = () => {
  const { sidebarOpen } = useAppContext();
  const [activeView, setActiveView] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleLogin = (role: string) => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <EnhancedDashboard />;

      case 'operators': return <EnhancedOperators />;

      case 'paytable': return <PaytableEditor />;
      case 'markets': return <MarketsView />;
      case 'languages': return <LanguagesView />;
      case 'currency': return <CurrencyView />;
      case 'betdenominations': return <BetDenominationsView />;
      case 'gameconfig': return <GameConfigView />;
      case 'streaks': return <StreaksView />;
      case 'jackpots': return <JackpotsView />;
      case 'players': return <PlayersView />;
      case 'monitoring': return <PlayerMonitoringView />;
      case 'support': return <PlayerSupportView />;
      case 'livetables': return <LiveTablesView />;
      case 'dealers': return <DealerManagementView />;
      case 'schedule': return <DealerScheduleView />;
      case 'streammonitor': return <StreamMonitorView />;
      case 'analytics': return <AnalyticsView />;
      case 'infopanel': return <InfoPanelEditor />;
      case 'reports': return <ReportsView />;
      case 'compliance': return <ComplianceReportsView />;
      case 'audit': return <AuditView />;
      case 'settings': return <SettingsView />;


      default: return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#111315]" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <Header userName="Admin User" userRole={userRole} />
      
      {/* Main content area - always has left margin on desktop for fixed sidebar */}
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 lg:ml-64">

        {renderView()}
      </main>
    </div>
  );


};

export default AppLayout;
