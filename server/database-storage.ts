import { 
  users, type User, type InsertUser,
  scans, type Scan, type InsertScan,
  securityMetrics, type SecurityMetrics, type InsertSecurityMetrics,
  trafficData, type TrafficData, type InsertTrafficData,
  vulnerabilities, type Vulnerability, type InsertVulnerability
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// Use the IStorage interface directly to avoid circular imports
interface IStorage {
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

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Scan methods
  async createScan(scan: InsertScan & { results: any }): Promise<Scan> {
    const [newScan] = await db
      .insert(scans)
      .values({
        url: scan.url,
        vulnerabilityScan: scan.vulnerabilityScan || null,
        apiSecurity: scan.apiSecurity || null,
        encryptionCheck: scan.encryptionCheck || null,
        fullPortScan: scan.fullPortScan || null,
        status: "completed",
        results: scan.results
      })
      .returning();
    return newScan;
  }
  
  async getLatestScan(): Promise<Scan | undefined> {
    const [latestScan] = await db
      .select()
      .from(scans)
      .orderBy(desc(scans.scanDate))
      .limit(1);
    
    return latestScan || undefined;
  }
  
  async getAllScans(): Promise<Scan[]> {
    return await db
      .select()
      .from(scans)
      .orderBy(desc(scans.scanDate));
  }
  
  // Security metrics methods
  async createSecurityMetrics(metrics: InsertSecurityMetrics): Promise<SecurityMetrics> {
    const [newMetrics] = await db
      .insert(securityMetrics)
      .values({
        url: metrics.url,
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
      })
      .returning();
    
    return newMetrics;
  }
  
  async getLatestSecurityMetrics(): Promise<SecurityMetrics | undefined> {
    const [latestMetrics] = await db
      .select()
      .from(securityMetrics)
      .orderBy(desc(securityMetrics.timestamp))
      .limit(1);
    
    return latestMetrics || undefined;
  }
  
  // Traffic data methods
  async createTrafficData(data: InsertTrafficData): Promise<TrafficData> {
    const [newTrafficData] = await db
      .insert(trafficData)
      .values({
        requestType: data.requestType,
        country: data.country,
        bandwidth: data.bandwidth,
        isBlocked: data.isBlocked || false
      })
      .returning();
    
    return newTrafficData;
  }
  
  async getTrafficData(): Promise<TrafficData[]> {
    return await db
      .select()
      .from(trafficData)
      .orderBy(desc(trafficData.timestamp));
  }
  
  // Vulnerability methods
  async createVulnerability(vulnerability: InsertVulnerability): Promise<Vulnerability> {
    const [newVulnerability] = await db
      .insert(vulnerabilities)
      .values({
        type: vulnerability.type,
        scanId: vulnerability.scanId,
        severity: vulnerability.severity,
        description: vulnerability.description,
        location: vulnerability.location || null,
        remediation: vulnerability.remediation || null
      })
      .returning();
    
    return newVulnerability;
  }
  
  async getVulnerabilitiesByScanId(scanId: number): Promise<Vulnerability[]> {
    return await db
      .select()
      .from(vulnerabilities)
      .where(eq(vulnerabilities.scanId, scanId));
  }
}