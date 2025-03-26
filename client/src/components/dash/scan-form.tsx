import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { validateUrl } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Search } from 'lucide-react';

interface ScanFormData {
  url: string;
  vulnerabilityScan: boolean;
  apiSecurity: boolean;
  encryptionCheck: boolean;
  fullPortScan: boolean;
}

const ScanForm: React.FC = () => {
  const [scanData, setScanData] = useState<ScanFormData>({
    url: 'https://vulnerable-webapp.example.com',
    vulnerabilityScan: true,
    apiSecurity: true,
    encryptionCheck: true,
    fullPortScan: false,
  });
  
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: async (data: ScanFormData) => {
      const response = await apiRequest('POST', '/api/scan', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/scan/latest'] });
      queryClient.invalidateQueries({ queryKey: ['/api/metrics'] });
      toast({
        title: "Scan Initiated",
        description: `Security scan for ${scanData.url} has been completed.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Scan Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    },
  });
  
  const handleScan = () => {
    if (!validateUrl(scanData.url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL starting with http:// or https://",
        variant: "destructive",
      });
      return;
    }
    
    mutation.mutate(scanData);
  };
  
  return (
    <Card className="bg-[#24283B] border-[#414868] hover:shadow-[0_0_15px_rgba(122,162,247,0.2)] hover:border-[#7AA2F7] transition-all mb-6">
      <CardContent className="p-4">
        <h2 className="text-lg font-medium text-white mb-3">Security Scanner</h2>
        <div className="flex flex-wrap">
          <div className="w-full md:w-2/3 lg:w-3/4">
            <div className="flex">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter URL to scan (e.g., https://example.com)"
                  className="w-full bg-[#1A1B26] border-[#414868] text-[#A9B1D6] rounded-r-none focus:border-[#7AA2F7]"
                  value={scanData.url}
                  onChange={(e) => setScanData({ ...scanData, url: e.target.value })}
                />
              </div>
              <Button 
                onClick={handleScan}
                className="bg-[#7AA2F7] hover:bg-[#5d8ef3] text-[#1A1B26] font-semibold rounded-l-none"
                disabled={mutation.isPending}
              >
                <Search className="mr-2 h-4 w-4" />
                {mutation.isPending ? 'Scanning...' : 'Scan'}
              </Button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="vulnerability-scan" 
                  checked={scanData.vulnerabilityScan}
                  onCheckedChange={(checked) => 
                    setScanData({ ...scanData, vulnerabilityScan: checked as boolean })
                  }
                  className="data-[state=checked]:bg-[#7AA2F7] data-[state=checked]:border-[#7AA2F7]"
                />
                <label
                  htmlFor="vulnerability-scan"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Vulnerability Scan
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="api-security" 
                  checked={scanData.apiSecurity}
                  onCheckedChange={(checked) => 
                    setScanData({ ...scanData, apiSecurity: checked as boolean })
                  }
                  className="data-[state=checked]:bg-[#7AA2F7] data-[state=checked]:border-[#7AA2F7]"
                />
                <label
                  htmlFor="api-security"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  API Security
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="encryption-check" 
                  checked={scanData.encryptionCheck}
                  onCheckedChange={(checked) => 
                    setScanData({ ...scanData, encryptionCheck: checked as boolean })
                  }
                  className="data-[state=checked]:bg-[#7AA2F7] data-[state=checked]:border-[#7AA2F7]"
                />
                <label
                  htmlFor="encryption-check"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Encryption Check
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="full-port-scan" 
                  checked={scanData.fullPortScan}
                  onCheckedChange={(checked) => 
                    setScanData({ ...scanData, fullPortScan: checked as boolean })
                  }
                  className="data-[state=checked]:bg-[#7AA2F7] data-[state=checked]:border-[#7AA2F7]"
                />
                <label
                  htmlFor="full-port-scan"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Full Port Scan
                </label>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 mt-4 md:mt-0 md:pl-4">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-semibold font-mono text-[#9ECE6A]">7</div>
                <div className="text-xs text-[#A9B1D6]">Scans Today</div>
                <div className="mt-2">
                  <div className="text-xs text-[#9ECE6A]">Last: 23 min ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { ScanForm };
