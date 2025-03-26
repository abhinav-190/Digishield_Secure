import React from 'react';
import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { NetworkMap } from '@/components/visualization/network-map';
import { TrafficGraph } from '@/components/visualization/traffic-graph';
import { Server, Activity, Globe, Clock } from 'lucide-react';

export default function NetworkAnalysisPage() {
  const { data: trafficStats } = useQuery({
    queryKey: ['/api/traffic/stats'],
  });

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-white">Network Analysis</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
            <CardContent className="p-4">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-[#7AA2F7]/20 flex items-center justify-center mr-3">
                  <Activity className="text-[#7AA2F7]" />
                </div>
                <div>
                  <div className="text-sm text-[#A9B1D6]">Total Traffic</div>
                  <div className="text-2xl font-semibold text-white">147.8 GB</div>
                  <div className="text-xs text-[#9ECE6A]">↑ 12% this week</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
            <CardContent className="p-4">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-[#9ECE6A]/20 flex items-center justify-center mr-3">
                  <Server className="text-[#9ECE6A]" />
                </div>
                <div>
                  <div className="text-sm text-[#A9B1D6]">Request Rate</div>
                  <div className="text-2xl font-semibold text-white">85.3/s</div>
                  <div className="text-xs text-[#9ECE6A]">↑ 5% this week</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
            <CardContent className="p-4">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-[#F7768E]/20 flex items-center justify-center mr-3">
                  <Globe className="text-[#F7768E]" />
                </div>
                <div>
                  <div className="text-sm text-[#A9B1D6]">Global Reach</div>
                  <div className="text-2xl font-semibold text-white">82</div>
                  <div className="text-xs text-[#9ECE6A]">↑ 3 new countries</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
            <CardContent className="p-4">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center mr-3">
                  <Clock className="text-amber-400" />
                </div>
                <div>
                  <div className="text-sm text-[#A9B1D6]">Avg. Response</div>
                  <div className="text-2xl font-semibold text-white">124 ms</div>
                  <div className="text-xs text-[#9ECE6A]">↓ 18ms improvement</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
            <CardHeader className="p-4 border-b border-[#414868]">
              <CardTitle className="text-white font-medium text-base">Traffic Over Time</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[300px]">
                <TrafficGraph height="300px" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
            <CardHeader className="p-4 border-b border-[#414868]">
              <CardTitle className="text-white font-medium text-base">Geographic Distribution</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[300px]">
                <NetworkMap height="300px" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
            <CardHeader className="p-4 border-b border-[#414868]">
              <CardTitle className="text-white font-medium text-base">Traffic by Country</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {Object.entries(trafficStats?.countryStats || {
                  "United States": 42,
                  "China": 18,
                  "India": 12,
                  "Germany": 8,
                  "Brazil": 6,
                  "Japan": 5,
                  "United Kingdom": 5,
                  "Others": 4
                }).map(([country, percentage], i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{country}</span>
                      <span>{percentage}%</span>
                    </div>
                    <div className="h-1.5 bg-[#414868] rounded">
                      <div 
                        className="h-1.5 rounded bg-[#7AA2F7]" 
                        style={{ 
                          width: `${percentage}%`,
                          opacity: 0.5 + percentage/100
                        }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
            <CardHeader className="p-4 border-b border-[#414868]">
              <CardTitle className="text-white font-medium text-base">Request Types</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {Object.entries(trafficStats?.requestTypes || {
                  "GET": 65,
                  "POST": 20,
                  "PUT": 8,
                  "DELETE": 4,
                  "OPTIONS": 3
                }).map(([type, percentage], i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{type}</span>
                      <span>{percentage}%</span>
                    </div>
                    <div className="h-1.5 bg-[#414868] rounded">
                      <div 
                        className={`h-1.5 rounded ${
                          type === 'GET' ? 'bg-[#9ECE6A]' :
                          type === 'POST' ? 'bg-[#7AA2F7]' :
                          type === 'PUT' ? 'bg-amber-400' :
                          type === 'DELETE' ? 'bg-[#F7768E]' : 'bg-purple-400'
                        }`}
                        style={{ width: `${percentage}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}