import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Separator } from '@/components/ui/separator';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TrafficVisualization } from '@/components/visualization/traffic-visualization';

interface SecurityMetric {
  label: string;
  value: number;
  percentage: number;
  color: string;
}

interface MetricsData {
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  overallRisk: string;
  sslGrade: string;
  tlsVersion: string;
  cipherStrength: string;
  hstsEnabled: boolean;
  certValidDays: number;
}

const SecurityMetrics: React.FC = () => {
  const { data: metrics, isLoading } = useQuery<MetricsData>({
    queryKey: ['/api/metrics'],
  });

  const getMetricItems = () => {
    if (!metrics) return [];
    
    return [
      {
        label: 'Critical',
        value: metrics.criticalCount,
        percentage: Math.min(metrics.criticalCount * 10, 100),
        color: 'bg-[#F7768E]',
      },
      {
        label: 'High',
        value: metrics.highCount,
        percentage: Math.min(metrics.highCount * 10, 100),
        color: 'bg-amber-400',
      },
      {
        label: 'Medium',
        value: metrics.mediumCount,
        percentage: Math.min(metrics.mediumCount * 5, 100),
        color: 'bg-blue-400',
      },
      {
        label: 'Low',
        value: metrics.lowCount,
        percentage: Math.min(metrics.lowCount * 4, 100),
        color: 'bg-[#9ECE6A]',
      },
    ];
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'text-[#F7768E]';
      case 'Medium':
        return 'text-amber-400';
      case 'Low':
        return 'text-[#9ECE6A]';
      default:
        return 'text-[#A9B1D6]';
    }
  };

  const { data: trafficStats } = useQuery({
    queryKey: ['/api/traffic/stats'],
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Vulnerability Status */}
      <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
        <CardHeader className="p-4 border-b border-[#414868]">
          <CardTitle className="text-white font-medium text-base">Vulnerability Status</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-[#A9B1D6]">Overall Risk</div>
            <div className={cn("font-medium", getRiskColor(metrics?.overallRisk || 'Medium'))}>
              {metrics?.overallRisk || 'Medium'}
            </div>
          </div>
          
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs mb-1">
                    <div className="h-3 w-16 bg-[#414868] rounded animate-pulse"></div>
                    <div className="h-3 w-6 bg-[#414868] rounded animate-pulse"></div>
                  </div>
                  <div className="h-1.5 bg-[#414868] rounded">
                    <div className="h-1.5 w-1/4 bg-[#414868] rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {getMetricItems().map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span>{item.label}</span>
                    <span className={getRiskColor(item.label === 'Critical' ? 'High' : item.label === 'Low' ? 'Low' : 'Medium')}>
                      {item.value}
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#414868] rounded">
                    <div 
                      className={`h-1.5 rounded ${item.color}`} 
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* DDoS Protection */}
      <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
        <CardHeader className="p-4 border-b border-[#414868]">
          <CardTitle className="text-white font-medium text-base">DDoS Protection</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-[#A9B1D6]">Protection Status</div>
            <div className="text-[#9ECE6A] font-medium">Active</div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Traffic Filtered</span>
              <span>{trafficStats?.trafficFiltered || '87.2 GB'}</span>
            </div>
            <div className="h-1.5 bg-[#414868] rounded">
              <div className="h-1.5 bg-[#7AA2F7] rounded" style={{ width: '65%' }} />
            </div>
          </div>
          
          {/* Traffic Visualization Component */}
          <div className="relative h-20 bg-primary/50 rounded overflow-hidden mb-2">
            <TrafficVisualization />
          </div>
          
          <div className="flex justify-between text-xs">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-[#7AA2F7] rounded-full mr-1"></span>
              <span>Legitimate</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-[#F7768E] rounded-full mr-1"></span>
              <span>Blocked</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Encryption Status */}
      <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
        <CardHeader className="p-4 border-b border-[#414868]">
          <CardTitle className="text-white font-medium text-base">Encryption Status</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-[#9ECE6A]/20 flex items-center justify-center mr-3">
              <Lock className="text-[#9ECE6A]" />
            </div>
            <div>
              <div className="text-sm text-white">SSL/TLS</div>
              <div className="text-xs">{metrics?.tlsVersion || 'TLS 1.3'} ({metrics?.tlsVersion === 'TLS 1.3' ? 'Strong' : 'Good'})</div>
            </div>
            <div className="ml-auto">
              <div className="text-xs bg-[#9ECE6A]/20 text-[#9ECE6A] px-2 py-0.5 rounded-full">
                {metrics?.sslGrade || 'A+'}
              </div>
            </div>
          </div>
          
          <div className="text-xs mb-3 space-y-1">
            <div className="flex justify-between mb-1">
              <span>Certificate Validity</span>
              <span className="text-[#9ECE6A]">{metrics?.certValidDays || '268'} days</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Key Exchange</span>
              <span>ECDHE RSA</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Cipher</span>
              <span>{metrics?.cipherStrength || 'AES 256 GCM'}</span>
            </div>
            <div className="flex justify-between">
              <span>HSTS</span>
              <span className="text-[#9ECE6A]">{metrics?.hstsEnabled ? 'Enabled' : 'Disabled'}</span>
            </div>
          </div>
          
          <div className="text-xs text-white/60">
            Last checked: 2 hours ago
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { SecurityMetrics };
