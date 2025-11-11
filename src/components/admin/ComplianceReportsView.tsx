import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, Mail, Download, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { ReportTemplate, defaultSections, jurisdictionTemplates } from '@/lib/reportTemplates';
import { generateReportHTML, downloadPDF, ReportData } from '@/lib/reportGenerator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

interface ScheduledReport {
  id: string;
  template: ReportTemplate;
  nextRun: string;
  status: 'active' | 'paused';
}

interface GeneratedReport {
  id: string;
  name: string;
  jurisdiction: string;
  generatedAt: string;
  period: string;
  status: 'success' | 'failed';
  size: string;
}

export default function ComplianceReportsView() {
  const [templates, setTemplates] = useState<ReportTemplate[]>([
    {
      id: '1',
      name: 'UK Gambling Commission Report',
      jurisdiction: 'UK-GC',
      sections: defaultSections,
      frequency: 'monthly',
      recipients: ['compliance@ukgc.gov.uk'],
      customFields: {},
    },
  ]);

  const [scheduledReports] = useState<ScheduledReport[]>([
    {
      id: '1',
      template: templates[0],
      nextRun: '2025-12-01 00:00',
      status: 'active',
    },
  ]);

  const [generatedReports] = useState<GeneratedReport[]>([
    {
      id: '1',
      name: 'UK GC Monthly Report - Nov 2025',
      jurisdiction: 'UK-GC',
      generatedAt: '2025-11-01 00:05',
      period: 'Oct 2025',
      status: 'success',
      size: '2.4 MB',
    },
  ]);

  const [editingTemplate, setEditingTemplate] = useState<ReportTemplate | null>(null);

  const handleGenerateReport = (template: ReportTemplate) => {
    const mockData: ReportData = {
      period: { start: '2025-10-01', end: '2025-10-31' },
      market: 'UK Market',
      transactions: {
        totalBets: 5000000,
        totalWins: 4750000,
        ggr: 250000,
        playerCount: 15000,
      },
      rtp: {
        theoretical: 96.5,
        actual: 96.3,
        variance: -0.2,
      },
      playerProtection: {
        selfExclusions: 45,
        depositLimits: 1200,
        sessionLimits: 800,
        realityChecks: 3500,
      },
      fxSnapshots: [
        { date: '2025-10-01', currency: 'EUR', rate: 1.18 },
        { date: '2025-10-15', currency: 'EUR', rate: 1.19 },
      ],
    };

    const html = generateReportHTML(template, mockData);
    downloadPDF(html, `${template.name}-${Date.now()}.html`);
    toast.success('Report generated and downloaded');
  };

  const handleSendReport = (reportId: string) => {
    toast.success('Report sent to regulatory body');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Compliance Reports</h1>
          <p className="text-muted-foreground">Automated regulatory reporting system</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingTemplate({
              id: Date.now().toString(),
              name: '',
              jurisdiction: '',
              sections: defaultSections,
              frequency: 'monthly',
              recipients: [],
              customFields: {},
            })}>
              <FileText className="w-4 h-4 mr-2" />
              New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Report Template</DialogTitle>
            </DialogHeader>
            {editingTemplate && (
              <div className="space-y-4">
                <div>
                  <Label>Template Name</Label>
                  <Input
                    value={editingTemplate.name}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
                    placeholder="e.g., UK Monthly Compliance Report"
                  />
                </div>
                <div>
                  <Label>Jurisdiction</Label>
                  <Select
                    value={editingTemplate.jurisdiction}
                    onValueChange={(value) => {
                      const preset = jurisdictionTemplates[value];
                      setEditingTemplate({ ...editingTemplate, jurisdiction: value, ...preset });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select jurisdiction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UK-GC">UK Gambling Commission</SelectItem>
                      <SelectItem value="MGA">Malta Gaming Authority</SelectItem>
                      <SelectItem value="PAGCOR">PAGCOR</SelectItem>
                      <SelectItem value="CUSTOM">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Frequency</Label>
                  <Select
                    value={editingTemplate.frequency}
                    onValueChange={(value: any) => setEditingTemplate({ ...editingTemplate, frequency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Report Sections</Label>
                  <div className="space-y-2 mt-2">
                    {editingTemplate.sections.map((section) => (
                      <div key={section.id} className="flex items-center space-x-2">
                        <Checkbox
                          checked={section.enabled}
                          onCheckedChange={(checked) => {
                            const updated = editingTemplate.sections.map(s =>
                              s.id === section.id ? { ...s, enabled: !!checked } : s
                            );
                            setEditingTemplate({ ...editingTemplate, sections: updated });
                          }}
                        />
                        <span>{section.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Email Recipients (comma-separated)</Label>
                  <Input
                    value={editingTemplate.recipients.join(', ')}
                    onChange={(e) => setEditingTemplate({
                      ...editingTemplate,
                      recipients: e.target.value.split(',').map(s => s.trim()),
                    })}
                    placeholder="compliance@regulator.gov, audit@regulator.gov"
                  />
                </div>
                <Button
                  onClick={() => {
                    setTemplates([...templates, editingTemplate]);
                    toast.success('Template created successfully');
                    setEditingTemplate(null);
                  }}
                  className="w-full"
                >
                  Create Template
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="history">Report History</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>{template.name}</span>
                    <Badge>{template.jurisdiction}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frequency:</span>
                      <span className="font-medium capitalize">{template.frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sections:</span>
                      <span className="font-medium">{template.sections.filter(s => s.enabled).length} enabled</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Recipients:</span>
                      <span className="font-medium">{template.recipients.length}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleGenerateReport(template)}
                      className="flex-1"
                      size="sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Generate Now
                    </Button>
                    <Button variant="outline" size="sm">
                      <Clock className="w-4 h-4 mr-2" />
                      Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template</TableHead>
                    <TableHead>Jurisdiction</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Next Run</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduledReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.template.name}</TableCell>
                      <TableCell>{report.template.jurisdiction}</TableCell>
                      <TableCell className="capitalize">{report.template.frequency}</TableCell>
                      <TableCell>{report.nextRun}</TableCell>
                      <TableCell>
                        <Badge variant={report.status === 'active' ? 'default' : 'secondary'}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">Pause</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Jurisdiction</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Generated</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {generatedReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.name}</TableCell>
                      <TableCell>{report.jurisdiction}</TableCell>
                      <TableCell>{report.period}</TableCell>
                      <TableCell>{report.generatedAt}</TableCell>
                      <TableCell>{report.size}</TableCell>
                      <TableCell>
                        {report.status === 'success' ? (
                          <Badge className="bg-green-500">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Success
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Failed
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSendReport(report.id)}
                          >
                            <Mail className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
