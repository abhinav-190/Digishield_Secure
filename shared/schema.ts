import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Scan data
export const scans = pgTable("scans", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  scanDate: timestamp("scan_date").defaultNow().notNull(),
  vulnerabilityScan: boolean("vulnerability_scan").default(true),
  apiSecurity: boolean("api_security").default(true),
  encryptionCheck: boolean("encryption_check").default(true),
  fullPortScan: boolean("full_port_scan").default(false),
  status: text("status").notNull().default("completed"),
  results: jsonb("results").notNull()
});

export const insertScanSchema = createInsertSchema(scans).pick({
  url: true,
  vulnerabilityScan: true,
  apiSecurity: true,
  encryptionCheck: true,
  fullPortScan: true,
});

export type InsertScan = z.infer<typeof insertScanSchema>;
export type Scan = typeof scans.$inferSelect;

// Vulnerabilities
export const vulnerabilities = pgTable("vulnerabilities", {
  id: serial("id").primaryKey(),
  scanId: integer("scan_id").notNull(),
  type: text("type").notNull(),
  severity: text("severity").notNull(),
  description: text("description").notNull(),
  location: text("location"),
  remediation: text("remediation")
});

export const insertVulnerabilitySchema = createInsertSchema(vulnerabilities).omit({
  id: true
});

export type InsertVulnerability = z.infer<typeof insertVulnerabilitySchema>;
export type Vulnerability = typeof vulnerabilities.$inferSelect;

// Traffic data
export const trafficData = pgTable("traffic_data", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  requestType: text("request_type").notNull(),
  country: text("country").notNull(),
  bandwidth: integer("bandwidth").notNull(),
  isBlocked: boolean("is_blocked").default(false)
});

export const insertTrafficDataSchema = createInsertSchema(trafficData).omit({
  id: true,
  timestamp: true,
});

export type InsertTrafficData = z.infer<typeof insertTrafficDataSchema>;
export type TrafficData = typeof trafficData.$inferSelect;

// Security metrics
export const securityMetrics = pgTable("security_metrics", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  criticalCount: integer("critical_count").default(0),
  highCount: integer("high_count").default(0),
  mediumCount: integer("medium_count").default(0),
  lowCount: integer("low_count").default(0),
  overallRisk: text("overall_risk").notNull(),
  sslGrade: text("ssl_grade"),
  tlsVersion: text("tls_version"),
  cipherStrength: text("cipher_strength"),
  hstsEnabled: boolean("hsts_enabled"),
  certValidDays: integer("cert_valid_days")
});

export const insertSecurityMetricsSchema = createInsertSchema(securityMetrics).omit({
  id: true,
  timestamp: true,
});

export type InsertSecurityMetrics = z.infer<typeof insertSecurityMetricsSchema>;
export type SecurityMetrics = typeof securityMetrics.$inferSelect;
