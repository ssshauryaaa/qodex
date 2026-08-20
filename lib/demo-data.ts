// Shared seed data for dashboard and app pages

export const WARD_STATS = [
  { ward: "Karol Bagh",      resolved: 12, open: 3, avgHours: 3.2, sponsored: "Tata CSR" },
  { ward: "Lajpat Nagar",    resolved: 9,  open: 2, avgHours: 4.8, sponsored: "Infosys Foundation" },
  { ward: "Dwarka",          resolved: 15, open: 1, avgHours: 2.9, sponsored: "HDFC Bank" },
  { ward: "Rohini",          resolved: 7,  open: 5, avgHours: 6.1, sponsored: "Unsponsored" },
  { ward: "Connaught Place", resolved: 20, open: 0, avgHours: 1.7, sponsored: "Mahindra CSR" },
  { ward: "Chandni Chowk",   resolved: 5,  open: 4, avgHours: 7.3, sponsored: "Unsponsored" },
  { ward: "Shahdara",        resolved: 8,  open: 6, avgHours: 5.5, sponsored: "ITC CSR" },
  { ward: "Hauz Khas",       resolved: 18, open: 1, avgHours: 2.1, sponsored: "Wipro EcoDesk" },
];

export const CSR_SPONSORS = [
  { name: "Tata CSR",          logo: "T",  totalAllocated: 50000, disbursed: 32450, jobs: 38, category: "Sanitation" },
  { name: "Infosys Foundation", logo: "I", totalAllocated: 30000, disbursed: 18700, jobs: 22, category: "Environment" },
  { name: "HDFC Bank",          logo: "H", totalAllocated: 40000, disbursed: 27600, jobs: 31, category: "Civic" },
  { name: "Mahindra CSR",       logo: "M", totalAllocated: 25000, disbursed: 25000, jobs: 29, category: "Sanitation" },
];

// Per-ward historical hotspot events (for /ward/[id])
export const WARD_HISTORY: Record<string, { date: string; category: string; severity: string; hoursToResolve: number | null; status: string }[]> = {
  "Karol Bagh": [
    { date: "Today",       category: "Illegal Dump",  severity: "High",   hoursToResolve: null, status: "open" },
    { date: "Yesterday",   category: "Overflow Bin",  severity: "Low",    hoursToResolve: 2.1,  status: "resolved" },
    { date: "2 days ago",  category: "Drain Block",   severity: "Medium", hoursToResolve: 4.5,  status: "resolved" },
    { date: "4 days ago",  category: "Illegal Dump",  severity: "High",   hoursToResolve: 5.2,  status: "resolved" },
  ],
  "Connaught Place": [
    { date: "3 days ago",  category: "Drain Block",   severity: "Medium", hoursToResolve: 1.2,  status: "resolved" },
    { date: "5 days ago",  category: "Overflow Bin",  severity: "Low",    hoursToResolve: 1.8,  status: "resolved" },
    { date: "1 week ago",  category: "Illegal Dump",  severity: "High",   hoursToResolve: 2.0,  status: "resolved" },
  ],
  "Hauz Khas": [
    { date: "Today",       category: "Overflow Bin",  severity: "Low",    hoursToResolve: null, status: "open" },
    { date: "Yesterday",   category: "Drain Block",   severity: "Medium", hoursToResolve: 1.9,  status: "resolved" },
    { date: "3 days ago",  category: "Overflow Bin",  severity: "Low",    hoursToResolve: 2.4,  status: "resolved" },
  ],
};

// Global impact counters (for /impact)
export const IMPACT_STATS = {
  kgWasteRemoved: 4280,
  hotspotsCleaned: 94,
  totalPayoutINR: 12700,
  co2KgSaved: 812,
  workersActive: 31,
  citiesOnboarded: 1,
  avgResolutionHours: 3.8,
  reportsThisMonth: 47,
};

// Live ticker feed for /impact page
export const RECENT_RESOLUTIONS = [
  { ward: "Connaught Place", category: "Drain Block",  hoursAgo: 0.5,  payout: 90  },
  { ward: "Hauz Khas",       category: "Overflow Bin", hoursAgo: 1.2,  payout: 50  },
  { ward: "Dwarka",          category: "Illegal Dump", hoursAgo: 2.0,  payout: 150 },
  { ward: "Karol Bagh",      category: "Drain Block",  hoursAgo: 3.1,  payout: 90  },
  { ward: "Lajpat Nagar",    category: "Overflow Bin", hoursAgo: 4.5,  payout: 50  },
  { ward: "Model Town",      category: "Illegal Dump", hoursAgo: 6.0,  payout: 150 },
  { ward: "Vasant Kunj",     category: "Drain Block",  hoursAgo: 8.0,  payout: 90  },
  { ward: "Janakpuri",       category: "Overflow Bin", hoursAgo: 10.0, payout: 50  },
];
