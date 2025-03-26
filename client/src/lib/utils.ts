import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function timeAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return interval === 1 ? "1 year ago" : `${interval} years ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval === 1 ? "1 month ago" : `${interval} months ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval === 1 ? "1 day ago" : `${interval} days ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval === 1 ? "1 hour ago" : `${interval} hours ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval === 1 ? "1 minute ago" : `${interval} minutes ago`;
  }
  return seconds < 10 ? "just now" : `${Math.floor(seconds)} seconds ago`;
}

export function validateUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch (error) {
    return false;
  }
}

// Mock scan terminal output generator
export function generateScanOutput(url: string) {
  const lines = [
    { type: 'prompt', content: `digishield scan --url ${url}` },
    { type: 'info', content: `Initializing security scan for ${url}` },
    { type: 'info', content: 'Checking SSL/TLS configuration...' },
  ];

  // Randomize some results but keep the general structure
  const hasTLS13 = Math.random() > 0.3;
  if (hasTLS13) {
    lines.push({ type: 'success', content: 'TLS 1.3 supported with strong ciphers' });
  } else {
    lines.push({ type: 'warning', content: 'Using TLS 1.2 with moderate cipher strength' });
  }

  lines.push({ type: 'info', content: 'Checking HTTP security headers...' });
  
  const hasContentTypeHeader = Math.random() > 0.6;
  if (!hasContentTypeHeader) {
    lines.push({ type: 'warning', content: 'X-Content-Type-Options header not set' });
  }
  
  const hasCSP = Math.random() > 0.7;
  if (!hasCSP) {
    lines.push({ type: 'warning', content: 'Content-Security-Policy header not found' });
  }

  lines.push({ type: 'info', content: 'Scanning for common vulnerabilities...' });
  
  const hasSQLi = Math.random() > 0.6;
  if (hasSQLi) {
    lines.push({ type: 'error', content: 'SQL Injection vulnerability detected in /search.php' });
  }
  
  const hasXSS = Math.random() > 0.5;
  if (hasXSS) {
    lines.push({ type: 'error', content: 'Cross-Site Scripting (XSS) in /comments?id=123' });
  }
  
  const hasSessionIssue = Math.random() > 0.4;
  if (hasSessionIssue) {
    lines.push({ type: 'warning', content: 'Session tokens not properly secured (missing HTTPOnly flag)' });
  }
  
  const hasOpenRedirect = Math.random() > 0.6;
  if (hasOpenRedirect) {
    lines.push({ type: 'warning', content: 'Open redirect vulnerability in /redirect.php' });
  }

  lines.push({ type: 'info', content: 'Checking for outdated components...' });
  
  const hasOutdatedJquery = Math.random() > 0.5;
  if (hasOutdatedJquery) {
    lines.push({ type: 'warning', content: 'jQuery v1.8.3 is outdated (CVE-2020-11023)' });
  }

  lines.push({ type: 'info', content: 'Testing API endpoints...' });
  
  const hasExposedApiKey = Math.random() > 0.6;
  if (hasExposedApiKey) {
    lines.push({ type: 'warning', content: 'API key exposed in JavaScript source at /js/main.js' });
  }
  
  const hasRateLimit = Math.random() > 0.7;
  if (!hasRateLimit) {
    lines.push({ type: 'warning', content: 'API lacks rate limiting on /api/v1/users' });
  }

  lines.push({ type: 'info', content: 'Checking for information disclosure...' });
  
  const hasServerHeader = Math.random() > 0.5;
  if (hasServerHeader) {
    lines.push({ type: 'warning', content: 'Server version exposed in HTTP headers' });
  }
  
  const hasDirListing = Math.random() > 0.7;
  if (hasDirListing) {
    lines.push({ type: 'warning', content: 'Directory listing enabled at /backup/' });
  }

  // Count vulnerabilities
  const criticalCount = lines.filter(l => l.type === 'error').length;
  const highCount = Math.floor(lines.filter(l => l.type === 'warning').length / 2);
  const mediumCount = lines.filter(l => l.type === 'warning').length - highCount;
  const lowCount = Math.floor(Math.random() * 8) + 3;

  const scanTime = (Math.random() * 20 + 10).toFixed(1);
  lines.push({ type: 'success', content: `Scan completed in ${scanTime} seconds` });
  lines.push({ 
    type: 'info', 
    content: `Summary: ${criticalCount} critical, ${highCount} high, ${mediumCount} medium, ${lowCount} low vulnerabilities found` 
  });
  lines.push({ type: 'prompt', content: ' ' });

  return lines;
}
