import { 
  users, type User, type InsertUser,
  scans, type Scan, type InsertScan,
  securityMetrics, type SecurityMetrics, type InsertSecurityMetrics,
  trafficData, type TrafficData, type InsertTrafficData,
  vulnerabilities, type Vulnerability, type InsertVulnerability
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Scan methods
  createScan(scan: InsertScan & { results: any }): Promise<Scan>;
  getLatestScan(): Promise<Scan | undefined>;
  getAllScans(): Promise<Scan[]>;
  
  // Security metrics methods
  createSecurityMetrics(metrics: InsertSecurityMetrics): Promise<SecurityMetrics>;
  getLatestSecurityMetrics(): Promise<SecurityMetrics | undefined>;
  
  // Traffic data methods
  createTrafficData(data: InsertTrafficData): Promise<TrafficData>;
  getTrafficData(): Promise<TrafficData[]>;
  
  // Vulnerability methods
  createVulnerability(vulnerability: InsertVulnerability): Promise<Vulnerability>;
  getVulnerabilitiesByScanId(scanId: number): Promise<Vulnerability[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private scans: Map<number, Scan>;
  private securityMetrics: Map<number, SecurityMetrics>;
  private trafficData: Map<number, TrafficData>;
  private vulnerabilities: Map<number, Vulnerability>;
  
  private userId: number;
  private scanId: number;
  private metricsId: number;
  private trafficId: number;
  private vulnerabilityId: number;

  constructor() {
    this.users = new Map();
    this.scans = new Map();
    this.securityMetrics = new Map();
    this.trafficData = new Map();
    this.vulnerabilities = new Map();
    
    this.userId = 1;
    this.scanId = 1;
    this.metricsId = 1;
    this.trafficId = 1;
    this.vulnerabilityId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Scan methods
  async createScan(scan: InsertScan & { results: any }): Promise<Scan> {
    const id = this.scanId++;
    const newScan: Scan = {
      id,
      url: scan.url,
      scanDate: new Date(),
      vulnerabilityScan: scan.vulnerabilityScan || null,
      apiSecurity: scan.apiSecurity || null,
      encryptionCheck: scan.encryptionCheck || null,
      fullPortScan: scan.fullPortScan || null,
      status: "completed",
      results: scan.results
    };
    this.scans.set(id, newScan);
    return newScan;
  }
  
  async getLatestScan(): Promise<Scan | undefined> {
    const scans = Array.from(this.scans.values());
    if (scans.length === 0) return undefined;
    
    return scans.sort((a, b) => {
      return new Date(b.scanDate).getTime() - new Date(a.scanDate).getTime();
    })[0];
  }
  
  async getAllScans(): Promise<Scan[]> {
    return Array.from(this.scans.values())
      .sort((a, b) => new Date(b.scanDate).getTime() - new Date(a.scanDate).getTime());
  }
  
  // Security metrics methods
  async createSecurityMetrics(metrics: InsertSecurityMetrics): Promise<SecurityMetrics> {
    const id = this.metricsId++;
    const newMetrics: SecurityMetrics = {
      id,
      url: metrics.url,
      timestamp: new Date(),
      criticalCount: metrics.criticalCount || null,
      highCount: metrics.highCount || null,
      mediumCount: metrics.mediumCount || null,
      lowCount: metrics.lowCount || null,
      overallRisk: metrics.overallRisk,
      sslGrade: metrics.sslGrade || null,
      tlsVersion: metrics.tlsVersion || null,
      cipherStrength: metrics.cipherStrength || null,
      hstsEnabled: metrics.hstsEnabled || null,
      certValidDays: metrics.certValidDays || null
    };
    this.securityMetrics.set(id, newMetrics);
    return newMetrics;
  }
  
  async getLatestSecurityMetrics(): Promise<SecurityMetrics | undefined> {
    const metrics = Array.from(this.securityMetrics.values());
    if (metrics.length === 0) return undefined;
    
    return metrics.sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    })[0];
  }
  
  // Traffic data methods
  async createTrafficData(data: InsertTrafficData): Promise<TrafficData> {
    const id = this.trafficId++;
    const newTrafficData: TrafficData = {
      id,
      timestamp: new Date(),
      requestType: data.requestType,
      country: data.country,
      bandwidth: data.bandwidth,
      isBlocked: data.isBlocked || null
    };
    this.trafficData.set(id, newTrafficData);
    return newTrafficData;
  }
  
  async getTrafficData(): Promise<TrafficData[]> {
    return Array.from(this.trafficData.values())
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }
  
  // Vulnerability methods
  async createVulnerability(vulnerability: InsertVulnerability): Promise<Vulnerability> {
    const id = this.vulnerabilityId++;
    const newVulnerability: Vulnerability = {
      id,
      type: vulnerability.type,
      scanId: vulnerability.scanId,
      severity: vulnerability.severity,
      description: vulnerability.description,
      location: vulnerability.location || null,
      remediation: vulnerability.remediation || null
    };
    this.vulnerabilities.set(id, newVulnerability);
    return newVulnerability;
  }
  
  async getVulnerabilitiesByScanId(scanId: number): Promise<Vulnerability[]> {
    return Array.from(this.vulnerabilities.values())
      .filter(v => v.scanId === scanId);
  }
}

export const storage = new MemStorage();
