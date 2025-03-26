import React from 'react';
import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  File, 
  FileText, 
  Shield, 
  Printer, 
  Share2, 
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export default function ReportsPage() {
  const { data: scans = [], isLoading } = useQuery({
    queryKey: ['/api/scans'],
  });

  const getSeverityCount = (scan: any, severity: string) => {
    if (severity === 'critical') return scan.results.securityMetrics.criticalCount || 0;
    if (severity === 'high') return scan.results.securityMetrics.highCount || 0;
    if (severity === 'medium') return scan.results.securityMetrics.mediumCount || 0;
    if (severity === 'low') return scan.results.securityMetrics.lowCount || 0;
    return 0;
  };

  const getTotalIssues = (scan: any) => {
    return (
      getSeverityCount(scan, 'critical') +
      getSeverityCount(scan, 'high') +
      getSeverityCount(scan, 'medium') +
      getSeverityCount(scan, 'low')
    );
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-white">Security Reports</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
            <CardHeader className="p-4 border-b border-[#414868]">
              <CardTitle className="text-white font-medium text-base flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Available Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {isLoading ? (
                <div className="p-6 text-center">
                  <div className="inline-block w-8 h-8 border-4 border-[#7AA2F7] border-t-transparent rounded-full animate-spin mb-2"></div>
                  <p className="text-[#A9B1D6]">Loading reports...</p>
                </div>
              ) : scans.length === 0 ? (
                <div className="p-6 text-center">
                  <File className="w-12 h-12 mx-auto text-[#414868] mb-2" />
                  <h3 className="text-lg font-medium text-white mb-1">No Reports Available</h3>
                  <p className="text-[#A9B1D6] mb-4">Run security scans to generate reports.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {scans.map((scan: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-[#414868] rounded bg-[#1A1B26]/40 hover:bg-[#1A1B26]/60 transition-colors">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-[#7AA2F7]/20 flex items-center justify-center mr-3">
                          <FileText className="w-5 h-5 text-[#7AA2F7]" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white truncate">
                            {scan.url.replace(/^https?:\/\//, '').split('/')[0]}
                          </div>
                          <div className="text-xs text-[#A9B1D6]">
                            {formatDate(new Date(scan.scanDate))}
                            {scan.results.securityMetrics.overallRisk && (
                              <span className={`ml-2 inline-block px-1.5 rounded-sm text-xs ${
                                scan.results.securityMetrics.overallRisk === 'High' 
                                  ? 'bg-[#F7768E]/20 text-[#F7768E]' 
                                  : scan.results.securityMetrics.overallRisk === 'Medium'
                                    ? 'bg-amber-400/20 text-amber-400'
                                    : 'bg-[#9ECE6A]/20 text-[#9ECE6A]'
                              }`}>
                                {scan.results.securityMetrics.overallRisk} Risk
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-[#A9B1D6] hover:text-white hover:bg-[#414868]">
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-[#A9B1D6] hover:text-white hover:bg-[#414868]">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-[#A9B1D6] hover:text-white hover:bg-[#414868]">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
            <CardHeader className="p-4 border-b border-[#414868]">
              <CardTitle className="text-white font-medium text-base flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {isLoading || scans.length === 0 ? (
                <div className="p-6 text-center">
                  <Shield className="w-12 h-12 mx-auto text-[#414868] mb-2" />
                  <h3 className="text-lg font-medium text-white mb-1">No Data Available</h3>
                  <p className="text-[#A9B1D6] mb-4">Run security scans to view summary data.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 border border-[#414868] rounded bg-[#1A1B26]/40">
                      <div className="text-xs text-[#A9B1D6] mb-1">Sites Scanned</div>
                      <div className="text-2xl font-bold text-white">{scans.length}</div>
                    </div>
                    <div className="p-3 border border-[#414868] rounded bg-[#1A1B26]/40">
                      <div className="text-xs text-[#A9B1D6] mb-1">Issues Found</div>
                      <div className="text-2xl font-bold text-white">
                        {scans.reduce((total: number, scan: any) => total + getTotalIssues(scan), 0)}
                      </div>
                    </div>
                    <div className="p-3 border border-[#414868] rounded bg-[#1A1B26]/40">
                      <div className="text-xs text-[#A9B1D6] mb-1">Critical Issues</div>
                      <div className="text-2xl font-bold text-[#F7768E]">
                        {scans.reduce((total: number, scan: any) => total + getSeverityCount(scan, 'critical'), 0)}
                      </div>
                    </div>
                    <div className="p-3 border border-[#414868] rounded bg-[#1A1B26]/40">
                      <div className="text-xs text-[#A9B1D6] mb-1">High Risk Issues</div>
                      <div className="text-2xl font-bold text-amber-400">
                        {scans.reduce((total: number, scan: any) => total + getSeverityCount(scan, 'high'), 0)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="text-sm font-medium text-white mb-2">Most Common Issues</div>
                    <div className="space-y-2">
                      {[
                        { issue: 'Missing Security Headers', count: 7, severity: 'medium' },
                        { issue: 'Outdated Components', count: 5, severity: 'high' },
                        { issue: 'Information Disclosure', count: 4, severity: 'medium' },
                        { issue: 'XSS Vulnerabilities', count: 3, severity: 'critical' },
                        { issue: 'SSL/TLS Issues', count: 2, severity: 'high' },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center p-2 rounded border border-[#414868] bg-[#1A1B26]">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              item.severity === 'critical' ? 'bg-[#F7768E]' : 
                              item.severity === 'high' ? 'bg-amber-400' : 
                              item.severity === 'medium' ? 'bg-blue-400' : 
                              'bg-[#9ECE6A]'
                            }`} />
                            <span className="text-sm">{item.issue}</span>
                          </div>
                          <div className="text-xs text-[#A9B1D6]">{item.count} instances</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
          <CardHeader className="p-4 border-b border-[#414868]">
            <CardTitle className="text-white font-medium text-base">Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {isLoading || scans.length === 0 ? (
              <div className="p-6 text-center">
                <AlertTriangle className="w-12 h-12 mx-auto text-[#414868] mb-2" />
                <h3 className="text-lg font-medium text-white mb-1">No Assessment Available</h3>
                <p className="text-[#A9B1D6] mb-4">Run security scans to view risk assessments.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-[#1A1B26] border-[#414868]">
                  <CardHeader className="p-3">
                    <CardTitle className="text-white text-sm flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2 text-[#F7768E]" />
                      Vulnerability Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between text-xs">
                        <span>SQL Injection Risk</span>
                        <span className="text-[#F7768E]">High</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>XSS Risk</span>
                        <span className="text-amber-400">Medium</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>CSRF Risk</span>
                        <span className="text-[#9ECE6A]">Low</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Data Exposure Risk</span>
                        <span className="text-amber-400">Medium</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Third-party Deps</span>
                        <span className="text-[#F7768E]">High</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#1A1B26] border-[#414868]">
                  <CardHeader className="p-3">
                    <CardTitle className="text-white text-sm flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-[#7AA2F7]" />
                      Security Defenses
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between text-xs">
                        <span>Web Application Firewall</span>
                        <CheckCircle className="w-4 h-4 text-[#9ECE6A]" />
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Security Headers</span>
                        <AlertTriangle className="w-4 h-4 text-[#F7768E]" />
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>SSL/TLS Configuration</span>
                        <CheckCircle className="w-4 h-4 text-[#9ECE6A]" />
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>HSTS Enabled</span>
                        <CheckCircle className="w-4 h-4 text-[#9ECE6A]" />
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Input Validation</span>
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#1A1B26] border-[#414868]">
                  <CardHeader className="p-3">
                    <CardTitle className="text-white text-sm flex items-center">
                      <File className="w-4 h-4 mr-2 text-[#A9B1D6]" />
                      Recommended Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <div className="space-y-2 mt-2 text-xs">
                      <div className="p-1.5 rounded bg-[#F7768E]/10 border border-[#F7768E]/20">
                        <div className="font-medium text-[#F7768E] mb-0.5">Critical Priority</div>
                        <div>Update jQuery to latest version to fix CVE-2020-11023</div>
                      </div>
                      <div className="p-1.5 rounded bg-amber-400/10 border border-amber-400/20">
                        <div className="font-medium text-amber-400 mb-0.5">High Priority</div>
                        <div>Implement Content-Security-Policy header</div>
                      </div>
                      <div className="p-1.5 rounded bg-blue-400/10 border border-blue-400/20">
                        <div className="font-medium text-blue-400 mb-0.5">Medium Priority</div>
                        <div>Add input validation to contact form</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}