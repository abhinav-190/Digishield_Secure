import React from 'react';
import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { formatDate, timeAgo } from '@/lib/utils';
import { Search, Clock, AlertTriangle, CheckCircle, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ScanHistoryPage() {
  const { data: scans = [], isLoading } = useQuery({
    queryKey: ['/api/scans'],
  });

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-white">Scan History</h1>
        
        <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all mb-6">
          <CardHeader className="p-4 border-b border-[#414868]">
            <CardTitle className="text-white font-medium text-base flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Recent Scans
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6 text-center">
                <div className="inline-block w-8 h-8 border-4 border-[#7AA2F7] border-t-transparent rounded-full animate-spin mb-2"></div>
                <p className="text-[#A9B1D6]">Loading scan history...</p>
              </div>
            ) : scans.length === 0 ? (
              <div className="p-6 text-center">
                <Search className="w-12 h-12 mx-auto text-[#414868] mb-2" />
                <h3 className="text-lg font-medium text-white mb-1">No Scans Found</h3>
                <p className="text-[#A9B1D6] mb-4">You haven't performed any security scans yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-[#414868]">
                <div className="grid grid-cols-12 p-3 text-xs font-medium text-[#A9B1D6] bg-[#1A1B26]/40">
                  <div className="col-span-5 md:col-span-6">URL</div>
                  <div className="col-span-3 md:col-span-2">Date</div>
                  <div className="col-span-2 md:col-span-2">Risk Level</div>
                  <div className="col-span-2 md:col-span-2">Status</div>
                </div>
                
                {scans.map((scan: any, index: number) => (
                  <div key={index} className="grid grid-cols-12 p-3 hover:bg-[#1A1B26]/20 transition-colors">
                    <div className="col-span-5 md:col-span-6 font-mono text-white text-sm truncate">
                      {scan.url}
                    </div>
                    <div className="col-span-3 md:col-span-2 text-xs text-[#A9B1D6]">
                      <div>{formatDate(new Date(scan.scanDate))}</div>
                      <div>{timeAgo(new Date(scan.scanDate))}</div>
                    </div>
                    <div className="col-span-2 md:col-span-2">
                      <Badge className={`
                        ${scan.results.securityMetrics.overallRisk === 'High' 
                          ? 'bg-[#F7768E]/20 text-[#F7768E] hover:bg-[#F7768E]/30' 
                          : scan.results.securityMetrics.overallRisk === 'Medium'
                            ? 'bg-amber-400/20 text-amber-400 hover:bg-amber-400/30'
                            : 'bg-[#9ECE6A]/20 text-[#9ECE6A] hover:bg-[#9ECE6A]/30'
                        }
                      `}>
                        {scan.results.securityMetrics.overallRisk}
                      </Badge>
                    </div>
                    <div className="col-span-2 md:col-span-2">
                      <Badge className="bg-[#7AA2F7]/20 text-[#7AA2F7] hover:bg-[#7AA2F7]/30">
                        {scan.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
            <CardContent className="p-4">
              <div className="flex flex-col items-center py-4">
                <div className="w-12 h-12 rounded-full bg-[#7AA2F7]/20 flex items-center justify-center mb-3">
                  <Search className="w-6 h-6 text-[#7AA2F7]" />
                </div>
                <div className="text-2xl font-semibold text-white mb-1">{scans.length}</div>
                <div className="text-sm text-[#A9B1D6] mb-2">Total Scans</div>
                <div className="text-xs text-[#9ECE6A]">Updated just now</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
            <CardContent className="p-4">
              <div className="flex flex-col items-center py-4">
                <div className="w-12 h-12 rounded-full bg-[#F7768E]/20 flex items-center justify-center mb-3">
                  <AlertTriangle className="w-6 h-6 text-[#F7768E]" />
                </div>
                <div className="text-2xl font-semibold text-white mb-1">
                  {scans.reduce((count: number, scan: any) => {
                    return count + (scan.results.securityMetrics.criticalCount || 0);
                  }, 0)}
                </div>
                <div className="text-sm text-[#A9B1D6] mb-2">Critical Issues</div>
                <div className="text-xs text-[#F7768E]">Requires attention</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
            <CardContent className="p-4">
              <div className="flex flex-col items-center py-4">
                <div className="w-12 h-12 rounded-full bg-[#9ECE6A]/20 flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6 text-[#9ECE6A]" />
                </div>
                <div className="text-2xl font-semibold text-white mb-1">
                  {scans.filter((scan: any) => 
                    scan.results.securityMetrics.overallRisk === 'Low'
                  ).length}
                </div>
                <div className="text-sm text-[#A9B1D6] mb-2">Secure Sites</div>
                <div className="text-xs text-[#9ECE6A]">Good protection level</div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
          <CardHeader className="p-4 border-b border-[#414868]">
            <CardTitle className="text-white font-medium text-base">Scan Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex flex-wrap">
              {Array.from({ length: 30 }).map((_, i) => {
                const hasActivity = Math.random() > 0.7;
                const intensity = hasActivity ? Math.floor(Math.random() * 3) + 1 : 0;
                return (
                  <div 
                    key={i}
                    className={`w-6 h-6 m-1 rounded-sm ${
                      intensity === 0 ? 'bg-[#414868]/30' :
                      intensity === 1 ? 'bg-[#7AA2F7]/30' :
                      intensity === 2 ? 'bg-[#7AA2F7]/50' :
                      'bg-[#7AA2F7]/80'
                    }`}
                    title={`${hasActivity ? intensity : 0} scans`}
                  />
                );
              })}
            </div>
            <div className="mt-2 flex justify-end text-xs text-[#A9B1D6]">
              <div className="flex items-center ml-2">
                <span className="w-3 h-3 bg-[#414868]/30 rounded-sm mr-1"></span>
                <span>None</span>
              </div>
              <div className="flex items-center ml-2">
                <span className="w-3 h-3 bg-[#7AA2F7]/30 rounded-sm mr-1"></span>
                <span>Low</span>
              </div>
              <div className="flex items-center ml-2">
                <span className="w-3 h-3 bg-[#7AA2F7]/50 rounded-sm mr-1"></span>
                <span>Medium</span>
              </div>
              <div className="flex items-center ml-2">
                <span className="w-3 h-3 bg-[#7AA2F7]/80 rounded-sm mr-1"></span>
                <span>High</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}