import React from 'react';
import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { ScanForm } from '@/components/dash/scan-form';
import { ScanResults } from '@/components/dash/scan-results';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Terminal } from '@/components/ui/terminal';
import { useQuery } from '@tanstack/react-query';

export default function ScanPage() {
  const { data: latestScan } = useQuery({
    queryKey: ['/api/scan/latest'],
  });

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-white">Website Security Scanner</h1>
        
        <ScanForm />
        
        {latestScan ? (
          <>
            <ScanResults scan={latestScan} />
            
            <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all mt-6">
              <CardHeader className="p-4 border-b border-[#414868]">
                <CardTitle className="text-white font-medium text-base">Scan Terminal Output</CardTitle>
              </CardHeader>
              <CardContent className="p-0 bg-[#1A1B26]">
                <div className="p-4 font-mono text-sm overflow-auto max-h-[500px]">
                  <Terminal 
                    lines={latestScan.results.terminalOutput || []} 
                    height="auto"
                  />
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="bg-[#24283B] border-[#414868] p-6 text-center">
            <div className="py-12">
              <div className="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto text-[#7AA2F7]">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No Scans Yet</h3>
              <p className="text-[#A9B1D6] mb-6">Run your first security scan using the form above.</p>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}