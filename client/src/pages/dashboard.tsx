import React from 'react';
import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { ScanForm } from '@/components/dash/scan-form';
import { SecurityMetrics } from '@/components/dash/security-metrics';
import { ScanResults } from '@/components/dash/scan-results';
import { NetworkTraffic } from '@/components/dash/network-traffic';
import { TrafficVisualization } from '@/components/visualization/traffic-visualization';
import { cn } from '@/lib/utils';

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="mb-4">
        <h1 className="text-xl font-semibold font-sans text-white">Security Dashboard</h1>
        <p className="text-sm text-[#A9B1D6] mt-1">
          Monitor your security posture and scan websites for vulnerabilities
        </p>
      </div>
      
      <ScanForm />
      
      <SecurityMetrics />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScanResults />
        <NetworkTraffic />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
