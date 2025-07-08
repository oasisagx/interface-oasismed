import React from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Top Bar - Unified with Sidebar */}
      <TopBar />
      
      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        {/* Content Area - OpenAI Style elevated layer */}
        <div className="flex-1 p-2">
          <main className="h-full overflow-auto bg-white rounded-lg border border-slate-200/60 shadow-sm">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;