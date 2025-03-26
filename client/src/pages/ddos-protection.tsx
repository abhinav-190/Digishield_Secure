import React from 'react';
import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { TrafficVisualization } from '@/components/visualization/traffic-visualization';
import { NetworkMap } from '@/components/visualization/network-map';
import { Shield, Server, AlertTriangle } from 'lucide-react';

export default function DdosProtectionPage() {
  const { data: trafficStats } = useQuery({
    queryKey: ['/api/traffic/stats'],
  });

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-white">DDoS Protection</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
            <CardHeader className="p-4 border-b border-[#414868]">
              <CardTitle className="text-white font-medium text-base flex items-center">
                <Shield className="w-5 h-5 mr-2 text-[#9ECE6A]" />
                Protection Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex flex-col items-center p-4">
                <div className="w-16 h-16 rounded-full bg-[#9ECE6A]/20 flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-[#9ECE6A]" />
                </div>
                <div className="text-xl font-bold text-[#9ECE6A] mb-1">Active</div>
                <div className="text-sm text-[#A9B1D6] mb-4">All protections enabled</div>
                <div className="w-full bg-[#414868] h-1.5 rounded-full mb-2">
                  <div className="bg-[#9ECE6A] h-1.5 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <div className="text-xs text-[#A9B1D6]">Last updated: 2 minutes ago</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
            <CardHeader className="p-4 border-b border-[#414868]">
              <CardTitle className="text-white font-medium text-base flex items-center">
                <Server className="w-5 h-5 mr-2 text-[#7AA2F7]" />
                Traffic Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Traffic Filtered</span>
                  <span className="font-medium">{trafficStats?.trafficFiltered || '87.2 GB'}</span>
                </div>
                <div className="h-1.5 bg-[#414868] rounded mb-4">
                  <div className="h-1.5 bg-[#7AA2F7] rounded" style={{ width: '65%' }} />
                </div>
                
                <div className="flex justify-between text-sm mb-1">
                  <span>Blocked Attacks</span>
                  <span className="font-medium text-[#F7768E]">{trafficStats?.blockedRequests || '1,457'}</span>
                </div>
                <div className="h-1.5 bg-[#414868] rounded mb-4">
                  <div className="h-1.5 bg-[#F7768E] rounded" style={{ width: '45%' }} />
                </div>
                
                <div className="flex justify-between text-sm mb-1">
                  <span>Clean Traffic</span>
                  <span className="font-medium text-[#9ECE6A]">{trafficStats?.cleanRequests || '8,293'}</span>
                </div>
                <div className="h-1.5 bg-[#414868] rounded">
                  <div className="h-1.5 bg-[#9ECE6A] rounded" style={{ width: '85%' }} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
            <CardHeader className="p-4 border-b border-[#414868]">
              <CardTitle className="text-white font-medium text-base flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-amber-400" />
                Recent Threats
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {[
                  { time: '11:23', threat: 'SYN Flood', source: '103.41.5.xx', level: 'High' },
                  { time: '10:47', threat: 'UDP Flood', source: '195.54.160.xx', level: 'Medium' },
                  { time: '09:15', threat: 'HTTP Flood', source: '185.220.101.xx', level: 'Critical' },
                  { time: '08:32', threat: 'DNS Amplification', source: '45.142.120.xx', level: 'High' },
                ].map((threat, i) => (
                  <div key={i} className="flex justify-between items-center p-2 rounded border border-[#414868] bg-[#1A1B26]">
                    <div>
                      <div className="text-white text-sm">{threat.threat}</div>
                      <div className="text-[#A9B1D6] text-xs">{threat.source}</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className={`text-xs px-2 py-0.5 rounded-full ${
                        threat.level === 'Critical' ? 'bg-[#F7768E]/20 text-[#F7768E]' :
                        threat.level === 'High' ? 'bg-amber-400/20 text-amber-400' :
                        'bg-blue-400/20 text-blue-400'
                      }`}>
                        {threat.level}
                      </div>
                      <div className="text-[#A9B1D6] text-xs mt-1">{threat.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
            <CardHeader className="p-4 border-b border-[#414868]">
              <CardTitle className="text-white font-medium text-base">Live Traffic Visualization</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="bg-[#1A1B26] rounded p-2 h-[300px] relative overflow-hidden">
                <TrafficVisualization height="300px" />
              </div>
              <div className="mt-4 flex justify-between text-xs">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-[#7AA2F7] rounded-full mr-1"></span>
                  <span>Legitimate Traffic</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-[#F7768E] rounded-full mr-1"></span>
                  <span>Blocked Traffic</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
            <CardHeader className="p-4 border-b border-[#414868]">
              <CardTitle className="text-white font-medium text-base">Attack Source Map</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="bg-[#1A1B26] rounded p-2 h-[300px] relative overflow-hidden">
                <NetworkMap height="300px" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="flex flex-col">
                  <div className="font-medium mb-1 text-white">Top Attack Countries</div>
                  <div className="space-y-1">
                    {Object.entries(trafficStats?.countryStats || {
                      "China": 35,
                      "Russia": 28,
                      "United States": 15,
                      "Brazil": 12
                    }).slice(0, 4).map(([country, count], i) => (
                      <div key={i} className="flex justify-between">
                        <span>{country}</span>
                        <span>{count}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="font-medium mb-1 text-white">Attack Types</div>
                  <div className="space-y-1">
                    {Object.entries(trafficStats?.attackTypes || {
                      "SYN Flood": 42,
                      "HTTP Flood": 35,
                      "UDP Flood": 15,
                      "DNS Amplification": 8
                    }).slice(0, 4).map(([type, percent], i) => (
                      <div key={i} className="flex justify-between">
                        <span>{type}</span>
                        <span>{percent}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
          <CardHeader className="p-4 border-b border-[#414868]">
            <CardTitle className="text-white font-medium text-base">Protection Configuration</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Layer 3/4 DDoS Protection", status: true, description: "Protects against volumetric attacks including SYN floods, UDP floods" },
                { name: "Layer 7 DDoS Protection", status: true, description: "Protects against application-layer attacks like HTTP floods, slow requests" },
                { name: "Bot Management", status: true, description: "Advanced bot detection and mitigation" },
                { name: "Rate Limiting", status: true, description: "Limits request rates to API endpoints and critical pages" },
                { name: "Managed Rules", status: true, description: "Pre-configured rulesets that address common attack vectors" },
                { name: "Custom Rules", status: false, description: "Create your own rules to address specific threats to your application" },
                { name: "HTTP DDoS Protection", status: true, description: "Protection against HTTP/S floods and request-based attacks" },
                { name: "DNS Flood Protection", status: true, description: "Protection against DNS amplification attacks" }
              ].map((feature, i) => (
                <div key={i} className="border border-[#414868] rounded p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-white font-medium">{feature.name}</div>
                    <div className={`px-2 py-0.5 rounded-full text-xs ${
                      feature.status ? 'bg-[#9ECE6A]/20 text-[#9ECE6A]' : 'bg-[#A9B1D6]/20 text-[#A9B1D6]'
                    }`}>
                      {feature.status ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>
                  <div className="text-xs text-[#A9B1D6]">{feature.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}