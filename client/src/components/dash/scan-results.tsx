import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Terminal } from '@/components/ui/terminal';
import { useQuery } from '@tanstack/react-query';
import { generateScanOutput } from '@/lib/utils';

const ScanResults: React.FC = () => {
  const { data: latestScan, isLoading } = useQuery({
    queryKey: ['/api/scan/latest'],
  });
  
  const [terminalLines, setTerminalLines] = useState<{ type: string; content: string }[]>([
    { type: 'prompt', content: 'digishield scan --url https://vulnerable-webapp.example.com' },
    { type: 'info', content: 'Initializing security scan...' },
  ]);

  useEffect(() => {
    if (latestScan && latestScan.url) {
      setTerminalLines(generateScanOutput(latestScan.url));
    }
  }, [latestScan]);

  return (
    <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all">
      <CardHeader className="p-4 border-b border-[#414868]">
        <div className="flex justify-between items-center">
          <CardTitle className="font-medium text-white text-base">Latest Scan Results</CardTitle>
          <div className="text-xs text-[#7AA2F7]">
            <span className="font-mono">{latestScan?.url || 'https://vulnerable-webapp.example.com'}</span>
          </div>
        </div>
      </CardHeader>
      <Terminal 
        lines={terminalLines}
        height="h-80"
      />
    </Card>
  );
};

export { ScanResults };
