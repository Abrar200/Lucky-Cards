import React from 'react';
import { useAppContext } from '@/contexts/AppContext';

interface HeaderProps {
  userName: string;
  userRole: string;
}

const Header: React.FC<HeaderProps> = ({ userName, userRole }) => {
  const { sidebarOpen, toggleSidebar } = useAppContext();

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-[#BC2036] border-b border-[#D9A441]/20 flex items-center justify-between px-4 sm:px-6 z-30">
      {/* Mobile Hamburger Menu - Larger touch target */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden text-[#D9A441] hover:text-[#E4C98F] transition-colors p-2 -ml-2"
        aria-label="Toggle menu"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Desktop Spacer */}
      <div className="hidden lg:block" />

      <div className="flex items-center gap-3 sm:gap-6">
        {/* Base Currency - Hidden on very small screens */}
        <div className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#0D0D0D]/50 rounded-lg border border-[#D9A441]/30">
          <span className="text-xs text-white/80">Base Currency:</span>
          <span className="text-sm font-semibold text-[#D9A441]">USD</span>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">{userName}</p>
            <p className="text-xs text-[#D9A441]">{userRole}</p>
          </div>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#D9A441] via-[#E4C98F] to-[#D9A441] flex items-center justify-center text-[#0D0D0D] font-bold text-sm sm:text-base">
            {userName.charAt(0)}
          </div>
        </div>
      </div>


    </header>
  );
};

export default Header;

