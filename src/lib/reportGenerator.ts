// Report generation and PDF export utilities
import { ReportTemplate } from './reportTemplates';

export interface ReportData {
  period: { start: string; end: string };
  market: string;
  transactions: {
    totalBets: number;
    totalWins: number;
    ggr: number;
    playerCount: number;
  };
  rtp: {
    theoretical: number;
    actual: number;
    variance: number;
  };
  playerProtection: {
    selfExclusions: number;
    depositLimits: number;
    sessionLimits: number;
    realityChecks: number;
  };
  fxSnapshots: Array<{
    date: string;
    currency: string;
    rate: number;
  }>;
}

export const generateReportHTML = (template: ReportTemplate, data: ReportData): string => {
  const sections = template.sections
    .filter(s => s.enabled)
    .sort((a, b) => a.order - b.order);

  let html = `
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px; }
        h2 { color: #3b82f6; margin-top: 30px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #f3f4f6; }
        .metric { display: inline-block; margin: 10px 20px 10px 0; }
        .metric-label { font-size: 12px; color: #6b7280; }
        .metric-value { font-size: 24px; font-weight: bold; color: #1e40af; }
      </style>
    </head>
    <body>
      <h1>${template.name}</h1>
      <p><strong>Period:</strong> ${data.period.start} to ${data.period.end}</p>
      <p><strong>Market:</strong> ${data.market}</p>
      <p><strong>Jurisdiction:</strong> ${template.jurisdiction}</p>
  `;

  sections.forEach(section => {
    html += generateSectionHTML(section.id, data);
  });

  html += '</body></html>';
  return html;
};

const generateSectionHTML = (sectionId: string, data: ReportData): string => {
  switch (sectionId) {
    case 'transactions':
      return `
        <h2>Transaction Summary</h2>
        <div class="metric">
          <div class="metric-label">Total Bets</div>
          <div class="metric-value">$${data.transactions.totalBets.toLocaleString()}</div>
        </div>
        <div class="metric">
          <div class="metric-label">Total Wins</div>
          <div class="metric-value">$${data.transactions.totalWins.toLocaleString()}</div>
        </div>
        <div class="metric">
          <div class="metric-label">GGR</div>
          <div class="metric-value">$${data.transactions.ggr.toLocaleString()}</div>
        </div>
      `;
    case 'rtp':
      return `
        <h2>RTP Verification</h2>
        <table>
          <tr><th>Metric</th><th>Value</th></tr>
          <tr><td>Theoretical RTP</td><td>${data.rtp.theoretical}%</td></tr>
          <tr><td>Actual RTP</td><td>${data.rtp.actual}%</td></tr>
          <tr><td>Variance</td><td>${data.rtp.variance}%</td></tr>
        </table>
      `;
    default:
      return `<h2>${sectionId}</h2><p>Section data...</p>`;
  }
};

export const downloadPDF = (html: string, filename: string) => {
  // In production, use a library like jsPDF or html2pdf
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
};
