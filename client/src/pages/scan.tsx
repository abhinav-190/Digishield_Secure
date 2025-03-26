import React from 'react';
import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScanForm } from '@/components/dash/scan-form';
import { ScanResults } from '@/components/dash/scan-results';
import { useQuery } from '@tanstack/react-query';
import { Search, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function ScanPage() {
  const { data: latestScan, isLoading } = useQuery({
    queryKey: ['/api/scan/latest'],
    refetchInterval: 10000, // Refetch every 10 seconds to check for updates
  });

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-white">Website Security Scanner</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
              <CardHeader className="p-4 border-b border-[#414868]">
                <CardTitle className="text-white font-medium text-base">Scan Website</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ScanForm />
              </CardContent>
            </Card>
            
            <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
              <CardHeader className="p-4 border-b border-[#414868]">
                <CardTitle className="text-white font-medium text-base flex items-center">
                  <ShieldCheck className="w-5 h-5 mr-2 text-[#9ECE6A]" />
                  Protection Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3 text-sm">
                  <div className="p-2 border border-[#414868] rounded bg-[#1A1B26]/40 hover:bg-[#1A1B26]/60 transition-colors">
                    <div className="font-medium text-white mb-1">Keep Software Updated</div>
                    <div className="text-[#A9B1D6]">Regularly update your CMS, plugins, and dependencies to patch security vulnerabilities.</div>
                  </div>
                  <div className="p-2 border border-[#414868] rounded bg-[#1A1B26]/40 hover:bg-[#1A1B26]/60 transition-colors">
                    <div className="font-medium text-white mb-1">Implement Strong WAF</div>
                    <div className="text-[#A9B1D6]">Use a Web Application Firewall to filter and monitor HTTP traffic between web applications and the Internet.</div>
                  </div>
                  <div className="p-2 border border-[#414868] rounded bg-[#1A1B26]/40 hover:bg-[#1A1B26]/60 transition-colors">
                    <div className="font-medium text-white mb-1">Enforce HTTPS</div>
                    <div className="text-[#A9B1D6]">Configure your site to use HTTPS exclusively with HSTS to encrypt all data in transit.</div>
                  </div>
                  <div className="p-2 border border-[#414868] rounded bg-[#1A1B26]/40 hover:bg-[#1A1B26]/60 transition-colors">
                    <div className="font-medium text-white mb-1">Implement Security Headers</div>
                    <div className="text-[#A9B1D6]">Add security headers like Content-Security-Policy, X-XSS-Protection, and X-Frame-Options.</div>
                  </div>
                  <div className="p-2 border border-[#414868] rounded bg-[#1A1B26]/40 hover:bg-[#1A1B26]/60 transition-colors">
                    <div className="font-medium text-white mb-1">Regular Backups</div>
                    <div className="text-[#A9B1D6]">Maintain regular backups of your website to recover quickly from security incidents.</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
              <CardHeader className="p-4 border-b border-[#414868]">
                <CardTitle className="text-white font-medium text-base flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  Scan Results
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="p-6 text-center">
                    <div className="inline-block w-8 h-8 border-4 border-[#7AA2F7] border-t-transparent rounded-full animate-spin mb-2"></div>
                    <p className="text-[#A9B1D6]">Loading latest scan results...</p>
                  </div>
                ) : !latestScan ? (
                  <div className="p-6 text-center">
                    <AlertTriangle className="w-12 h-12 mx-auto text-[#414868] mb-2" />
                    <h3 className="text-lg font-medium text-white mb-1">No Scan Results Available</h3>
                    <p className="text-[#A9B1D6] mb-4">Run a security scan to see detailed results.</p>
                  </div>
                ) : (
                  <ScanResults scan={latestScan} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}