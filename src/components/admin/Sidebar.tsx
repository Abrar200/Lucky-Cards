import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { 
  LayoutDashboard, Building2, Table, Globe, Languages, 
  DollarSign, Settings, Zap, Trophy, Users, Eye, 
  Headphones, BarChart3, Info, FileText, Shield, ScrollText, Coins,
  Video, UserCircle, Calendar, Activity
} from 'lucide-react';



interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'operators', label: 'Operators', icon: <Building2 size={20} /> },
  { id: 'paytable', label: 'Paytable Editor', icon: <Table size={20} /> },
  { id: 'markets', label: 'Markets', icon: <Globe size={20} /> },
  { id: 'languages', label: 'Languages', icon: <Languages size={20} /> },
  { id: 'currency', label: 'Currency & FX', icon: <DollarSign size={20} /> },
  { id: 'betdenominations', label: 'Bet Denominations', icon: <Coins size={20} /> },
  { id: 'gameconfig', label: 'Game Config', icon: <Settings size={20} /> },
  { id: 'streaks', label: 'Streaks', icon: <Zap size={20} /> },
  { id: 'jackpots', label: 'Jackpots', icon: <Trophy size={20} /> },
  { id: 'players', label: 'Player Sessions', icon: <Users size={20} /> },
  { id: 'monitoring', label: 'Player Monitoring', icon: <Eye size={20} /> },
  { id: 'support', label: 'Player Support', icon: <Headphones size={20} /> },
  { id: 'livetables', label: 'Live Tables', icon: <Video size={20} /> },
  { id: 'dealers', label: 'Dealer Management', icon: <UserCircle size={20} /> },
  { id: 'schedule', label: 'Dealer Schedule', icon: <Calendar size={20} /> },
  { id: 'streammonitor', label: 'Stream Monitor', icon: <Activity size={20} /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
  { id: 'infopanel', label: 'INFO Panel', icon: <Info size={20} /> },
  { id: 'reports', label: 'Reports & GGR', icon: <FileText size={20} /> },
  { id: 'compliance', label: 'Compliance Reports', icon: <Shield size={20} /> },
  { id: 'audit', label: 'Audit Logs', icon: <ScrollText size={20} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
];




interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const { sidebarOpen, toggleSidebar } = useAppContext();

  const handleNavClick = (viewId: string) => {
    setActiveView(viewId);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };



  return (
    <>
      {/* Mobile Overlay Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-[#BC2036] border-r border-[#D9A441]/20 z-40 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}`}>
        {/* Logo Section */}
        <div className="p-4 border-b border-[#D9A441]/20 flex items-center justify-center flex-shrink-0">
          <img 
            src="https://d64gsuwffb70l.cloudfront.net/685afce20bfda24fc0f1d36c_1762860287490_25f47fd2.png" 
            alt="Lucky Cards" 
            className="w-40"
          />
        </div>

        {/* Navigation */}
        <nav className="p-4 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-[#D9A441] scrollbar-track-[#BC2036]/50">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}

                className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                  isActive
                    ? 'bg-[#0D0D0D] text-white font-semibold shadow-lg'
                    : 'text-white/90 hover:bg-[#0D0D0D]/50 hover:text-white'
                }`}
              >
                {/* Gold Active Indicator */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D9A441] rounded-r" />
                )}
                <span className={isActive ? 'text-[#D9A441]' : 'text-white/80'}>
                  {item.icon}
                </span>
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};



export default Sidebar;
