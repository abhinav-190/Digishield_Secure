import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShieldAlert, Settings, Bell } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="px-4 py-2 bg-[#24283B] border-b border-[#414868]">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-[#7AA2F7] font-mono font-bold text-xl flex items-center">
            <ShieldAlert className="mr-2" />
            DigiShield
          </div>
          <div className="ml-2 bg-[#7AA2F7]/10 text-[#7AA2F7] text-xs px-2 py-0.5 rounded font-mono">
            v1.2.0
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="mr-4 flex items-center text-xs text-[#9ECE6A]">
            <span className="inline-block w-2 h-2 bg-[#9ECE6A] rounded-full mr-2 animate-pulse"></span>
            System Active
          </div>
          
          <Button variant="ghost" size="icon" className="text-[#A9B1D6] hover:text-[#7AA2F7] mr-3">
            <Settings className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-[#A9B1D6] hover:text-[#7AA2F7] mr-3">
            <Bell className="h-5 w-5" />
          </Button>
          
          <div className="w-8 h-8 rounded-full bg-[#7AA2F7] flex items-center justify-center text-[#1A1B26] font-bold">
            AD
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
