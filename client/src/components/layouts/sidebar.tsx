import React from 'react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';

const Sidebar: React.FC = () => {
  const [location] = useLocation();

  const navItems = [
    { 
      icon: 'fas fa-tachometer-alt', 
      label: 'Dashboard', 
      path: '/',
      iconComponent: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
          <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
          <path d="M3 9h2" />
          <path d="M19 9h2" />
          <circle cx="12" cy="15" r="2" />
          <path d="M12 13v-2" />
        </svg>
      )
    },
    { 
      icon: 'fas fa-search', 
      label: 'Scan', 
      path: '/scan',
      iconComponent: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      ) 
    },
    { 
      icon: 'fas fa-shield-virus', 
      label: 'DDoS Protection', 
      path: '/ddos-protection',
      iconComponent: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
      )
    },
    { 
      icon: 'fas fa-network-wired', 
      label: 'Network Analysis', 
      path: '/network',
      iconComponent: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <rect x="2" y="2" width="6" height="6" rx="1" />
          <rect x="16" y="16" width="6" height="6" rx="1" />
          <rect x="2" y="16" width="6" height="6" rx="1" />
          <rect x="16" y="2" width="6" height="6" rx="1" />
          <path d="M5 8v8" />
          <path d="M19 8v8" />
          <path d="M8 5h8" />
          <path d="M8 19h8" />
        </svg>
      )
    },
    { 
      icon: 'fas fa-history', 
      label: 'Scan History', 
      path: '/history',
      iconComponent: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      )
    },
    { 
      icon: 'fas fa-file-alt', 
      label: 'Reports', 
      path: '/reports',
      iconComponent: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" x2="8" y1="13" y2="13" />
          <line x1="16" x2="8" y1="17" y2="17" />
          <line x1="10" x2="8" y1="9" y2="9" />
        </svg>
      )
    },
  ];

  return (
    <aside className="w-16 md:w-56 bg-[#24283B] border-r border-[#414868] flex flex-col">
      <div className="p-3">
        <div className="flex flex-col space-y-1">
          {navItems.map((item, index) => (
            <Link key={index} href={item.path}>
              <a className={cn(
                "flex items-center py-2 px-3 rounded transition-colors",
                location === item.path 
                  ? "text-[#7AA2F7] bg-[#7AA2F7]/10" 
                  : "text-[#A9B1D6] hover:text-[#7AA2F7] hover:bg-[#7AA2F7]/10"
              )}>
                <div className="w-6">
                  {item.iconComponent}
                </div>
                <span className="ml-2 hidden md:inline">{item.label}</span>
              </a>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="mt-auto p-3 hidden md:block">
        <div className="p-3 bg-[#24283B] border border-[#414868] rounded">
          <div className="text-xs font-medium">System Status</div>
          <div className="mt-2 flex items-center">
            <span className="w-2 h-2 bg-[#9ECE6A] rounded-full animate-pulse"></span>
            <span className="ml-2 text-xs">All systems operational</span>
          </div>
          <div className="mt-2 text-xs flex justify-between">
            <span>CPU</span>
            <span>32%</span>
          </div>
          <div className="mt-1 h-1.5 bg-[#414868] rounded">
            <div className="h-1.5 rounded bg-[#7AA2F7]" style={{ width: '32%' }}></div>
          </div>
          <div className="mt-2 text-xs flex justify-between">
            <span>Memory</span>
            <span>47%</span>
          </div>
          <div className="mt-1 h-1.5 bg-[#414868] rounded">
            <div className="h-1.5 rounded bg-[#7AA2F7]" style={{ width: '47%' }}></div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export { Sidebar };
