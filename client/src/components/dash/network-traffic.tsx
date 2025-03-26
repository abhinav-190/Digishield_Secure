import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TrafficGraph } from '@/components/visualization/traffic-graph';
import { NetworkMap } from '@/components/visualization/network-map';
import { useQuery } from '@tanstack/react-query';

const NetworkTraffic: React.FC = () => {
  const { data: trafficStats, isLoading } = useQuery({
    queryKey: ['/api/traffic/stats'],
  });

  return (
    <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
      <CardHeader className="p-4 border-b border-[#414868]">
        <div className="flex justify-between items-center">
          <CardTitle className="font-medium text-white text-base">Network Traffic Analysis</CardTitle>
          <div className="text-xs text-[#9ECE6A]">
            <span className="inline-block w-2 h-2 bg-[#9ECE6A] rounded-full mr-1 animate-pulse"></span>
            Live Monitoring
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <div>Current Traffic</div>
            <div className="font-mono">{trafficStats?.currentTraffic || '3.7 Mbps'}</div>
          </div>
          <TrafficGraph height="h-40" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Top Countries */}
          <div className="bg-[#1A1B26] p-3 rounded border border-[#414868]">
            <div className="text-xs text-[#A9B1D6] mb-1">Top Countries</div>
            <div className="text-xs">
              {isLoading ? (
                <div className="space-y-1 py-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex justify-between mb-1">
                      <div className="h-3 w-20 bg-[#414868] rounded animate-pulse"></div>
                      <div className="h-3 w-8 bg-[#414868] rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  {trafficStats?.countryStats ? (
                    Object.entries(trafficStats.countryStats).slice(0, 4).map(([country, percentage], index) => (
                      <div key={index} className="flex justify-between mb-1">
                        <span>{country}</span>
                        <span>{percentage}%</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex justify-between mb-1">
                        <span>United States</span>
                        <span>42%</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>China</span>
                        <span>18%</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Russia</span>
                        <span>12%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Germany</span>
                        <span>8%</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Request Types */}
          <div className="bg-[#1A1B26] p-3 rounded border border-[#414868]">
            <div className="text-xs text-[#A9B1D6] mb-1">Request Types</div>
            <div className="text-xs">
              {isLoading ? (
                <div className="space-y-1 py-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex justify-between mb-1">
                      <div className="h-3 w-10 bg-[#414868] rounded animate-pulse"></div>
                      <div className="h-3 w-8 bg-[#414868] rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  {trafficStats?.requestTypeStats ? (
                    Object.entries(trafficStats.requestTypeStats).map(([type, percentage], index) => (
                      <div key={index} className="flex justify-between mb-1">
                        <span>{type}</span>
                        <span>{percentage}%</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex justify-between mb-1">
                        <span>GET</span>
                        <span>65%</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>POST</span>
                        <span>20%</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>PUT</span>
                        <span>8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>DELETE</span>
                        <span>7%</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="text-xs text-[#A9B1D6] mb-2">Network Map</div>
          <NetworkMap height="h-48" />
        </div>
      </CardContent>
    </Card>
  );
};

export { NetworkTraffic };
