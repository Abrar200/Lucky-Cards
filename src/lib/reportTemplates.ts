// Report template definitions per jurisdiction
export interface ReportSection {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
}

export interface ReportTemplate {
  id: string;
  name: string;
  jurisdiction: string;
  sections: ReportSection[];
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  recipients: string[];
  customFields: Record<string, any>;
}

export const defaultSections: ReportSection[] = [
  { id: 'summary', name: 'Executive Summary', enabled: true, order: 1 },
  { id: 'transactions', name: 'Transaction Summary', enabled: true, order: 2 },
  { id: 'rtp', name: 'RTP Verification Data', enabled: true, order: 3 },
  { id: 'player_protection', name: 'Player Protection Metrics', enabled: true, order: 4 },
  { id: 'fx_snapshots', name: 'FX Snapshots', enabled: true, order: 5 },
  { id: 'responsible_gaming', name: 'Responsible Gaming', enabled: true, order: 6 },
  { id: 'fraud_detection', name: 'Fraud Detection', enabled: true, order: 7 },
  { id: 'compliance_issues', name: 'Compliance Issues', enabled: true, order: 8 },
];

export const jurisdictionTemplates: Record<string, Partial<ReportTemplate>> = {
  'UK-GC': {
    name: 'UK Gambling Commission Report',
    sections: defaultSections,
    frequency: 'monthly',
  },
  'MGA': {
    name: 'Malta Gaming Authority Report',
    sections: defaultSections,
    frequency: 'monthly',
  },
  'PAGCOR': {
    name: 'PAGCOR Compliance Report',
    sections: defaultSections,
    frequency: 'quarterly',
  },
};
