import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertScanSchema, insertTrafficDataSchema, insertSecurityMetricsSchema } from "@shared/schema";
import { createInsertSchema } from "drizzle-zod";

// Mock vulnerability data generator
function generateMockScanResults(url: string) {
  const severities = ["critical", "high", "medium", "low"];
  const criticalCount = Math.floor(Math.random() * 3);
  const highCount = Math.floor(Math.random() * 6);
  const mediumCount = Math.floor(Math.random() * 10) + 5;
  const lowCount = Math.floor(Math.random() * 8) + 3;

  const vulnerabilityTypes = [
    { type: "SQL Injection", description: "SQL Injection vulnerability detected", location: "/search.php" },
    { type: "XSS", description: "Cross-Site Scripting (XSS)", location: "/comments?id=123" },
    { type: "Missing Security Headers", description: "Content-Security-Policy header not found", location: "HTTP Headers" },
    { type: "Open Redirect", description: "Open redirect vulnerability", location: "/redirect.php" },
    { type: "Outdated Components", description: "jQuery v1.8.3 is outdated (CVE-2020-11023)", location: "/js/main.js" },
    { type: "API Security", description: "API key exposed in JavaScript source", location: "/js/main.js" },
    { type: "Information Disclosure", description: "Server version exposed in HTTP headers", location: "HTTP Headers" },
    { type: "Directory Listing", description: "Directory listing enabled", location: "/backup/" }
  ];

  let results = [];
  
  // Generate critical vulnerabilities
  for (let i = 0; i < criticalCount; i++) {
    const vulnType = vulnerabilityTypes[Math.floor(Math.random() * 2)];
    results.push({
      type: vulnType.type,
      severity: "critical",
      description: vulnType.description,
      location: vulnType.location
    });
  }
  
  // Generate high vulnerabilities
  for (let i = 0; i < highCount; i++) {
    const vulnType = vulnerabilityTypes[Math.floor(Math.random() * 4) + 2];
    results.push({
      type: vulnType.type,
      severity: "high",
      description: vulnType.description,
      location: vulnType.location
    });
  }
  
  // Generate medium vulnerabilities
  for (let i = 0; i < mediumCount; i++) {
    const vulnType = vulnerabilityTypes[Math.floor(Math.random() * 6) + 2];
    results.push({
      type: vulnType.type,
      severity: "medium",
      description: vulnType.description,
      location: vulnType.location
    });
  }
  
  // Generate low vulnerabilities
  for (let i = 0; i < lowCount; i++) {
    const vulnType = vulnerabilityTypes[Math.floor(Math.random() * vulnerabilityTypes.length)];
    results.push({
      type: vulnType.type,
      severity: "low",
      description: vulnType.description,
      location: vulnType.location
    });
  }

  // Generate SSL/TLS data
  const tlsVersions = ["TLS 1.3", "TLS 1.2", "TLS 1.1", "TLS 1.0"];
  const ciphers = ["AES 256 GCM", "AES 128 GCM", "CHACHA20 POLY1305"];
  const grades = ["A+", "A", "B+", "B", "C", "D"];

  const sslData = {
    tlsVersion: tlsVersions[Math.floor(Math.random() * 2)], // Mostly newer versions
    cipherStrength: ciphers[Math.floor(Math.random() * 2)],
    grade: grades[Math.floor(Math.random() * 3)], // Mostly good grades
    hstsEnabled: Math.random() > 0.3, // 70% chance of HSTS being enabled
    certValidDays: Math.floor(Math.random() * 365) + 30, // 30-395 days
  };

  const securityMetrics = {
    criticalCount,
    highCount,
    mediumCount,
    lowCount,
    overallRisk: criticalCount > 0 ? "High" : highCount > 3 ? "Medium" : "Low",
    sslGrade: sslData.grade,
    tlsVersion: sslData.tlsVersion,
    cipherStrength: sslData.cipherStrength,
    hstsEnabled: sslData.hstsEnabled,
    certValidDays: sslData.certValidDays
  };

  return {
    vulnerabilities: results,
    sslData,
    securityMetrics
  };
}

// Generate mock traffic data
function generateMockTrafficData() {
  const countries = ["United States", "China", "Russia", "Germany", "Brazil", "India", "UK", "Canada"];
  const requestTypes = ["GET", "POST", "PUT", "DELETE"];
  
  // Generate 20 traffic data points
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      requestType: requestTypes[Math.floor(Math.random() * requestTypes.length)],
      country: countries[Math.floor(Math.random() * countries.length)],
      bandwidth: Math.floor(Math.random() * 1000) + 100,
      isBlocked: Math.random() > 0.8 // 20% chance of being blocked
    });
  }
  
  return data;
}

// Generate mock country traffic stats
function generateCountryTrafficStats() {
  return {
    "United States": 42,
    "China": 18,
    "Russia": 12,
    "Germany": 8,
    "Brazil": 6,
    "India": 5,
    "UK": 5,
    "Canada": 4
  };
}

// Generate mock request type stats
function generateRequestTypeStats() {
  return {
    "GET": 65,
    "POST": 20,
    "PUT": 8,
    "DELETE": 7
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to perform a security scan
  app.post("/api/scan", async (req, res) => {
    try {
      const data = insertScanSchema.parse(req.body);
      const mockResults = generateMockScanResults(data.url);
      
      // Store scan with results
      const scan = await storage.createScan({
        ...data,
        results: mockResults
      });
      
      // Store security metrics
      await storage.createSecurityMetrics({
        url: data.url,
        ...mockResults.securityMetrics
      });
      
      res.status(200).json({
        id: scan.id,
        url: scan.url,
        scanDate: scan.scanDate,
        ...mockResults
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid scan parameters", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to perform scan" });
      }
    }
  });

  // API endpoint to get the most recent scan
  app.get("/api/scan/latest", async (req, res) => {
    try {
      const latestScan = await storage.getLatestScan();
      if (!latestScan) {
        res.status(404).json({ message: "No scans found" });
        return;
      }
      
      res.status(200).json(latestScan);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve scan" });
    }
  });
  
  // API endpoint to get all scans
  app.get("/api/scans", async (req, res) => {
    try {
      const scans = await storage.getAllScans();
      res.status(200).json(scans);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve scans" });
    }
  });
  
  // API endpoint to get traffic data
  app.get("/api/traffic", async (req, res) => {
    try {
      const trafficData = generateMockTrafficData();
      res.status(200).json(trafficData);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve traffic data" });
    }
  });
  
  // API endpoint to get traffic statistics
  app.get("/api/traffic/stats", async (req, res) => {
    try {
      const countryStats = generateCountryTrafficStats();
      const requestTypeStats = generateRequestTypeStats();
      
      res.status(200).json({
        countryStats,
        requestTypeStats,
        currentTraffic: (Math.random() * 5 + 1).toFixed(1) + " Mbps",
        trafficFiltered: Math.floor(Math.random() * 100) + " GB"
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve traffic statistics" });
    }
  });
  
  // API endpoint to get security metrics
  app.get("/api/metrics", async (req, res) => {
    try {
      const metrics = await storage.getLatestSecurityMetrics();
      if (!metrics) {
        // Generate some default metrics if none exist
        const defaultMetrics = {
          criticalCount: 2,
          highCount: 5, 
          mediumCount: 12,
          lowCount: 7,
          overallRisk: "Medium",
          sslGrade: "A+",
          tlsVersion: "TLS 1.3",
          cipherStrength: "AES 256 GCM",
          hstsEnabled: true,
          certValidDays: 268
        };
        
        res.status(200).json(defaultMetrics);
        return;
      }
      
      res.status(200).json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve security metrics" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
