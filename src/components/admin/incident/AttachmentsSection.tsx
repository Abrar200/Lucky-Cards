import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, Link2, X } from 'lucide-react';
import { useState } from 'react';

interface Props {
  formData: any;
  onChange: (field: string, value: any) => void;
}

export function AttachmentsSection({ formData, onChange }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [links, setLinks] = useState<string[]>(formData.links || []);
  const [newLink, setNewLink] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
      onChange('files', [...files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onChange('files', updated);
  };

  const addLink = () => {
    if (newLink.trim()) {
      const updated = [...links, newLink.trim()];
      setLinks(updated);
      onChange('links', updated);
      setNewLink('');
    }
  };

  const removeLink = (index: number) => {
    const updated = links.filter((_, i) => i !== index);
    setLinks(updated);
    onChange('links', updated);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Attachments / Notes</h3>
      
      <div>
        <Label>Upload Files</Label>
        <div className="mt-2">
          <Input 
            type="file" 
            multiple 
            onChange={handleFileChange}
            className="cursor-pointer"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Screenshots, CSV logs, Video captures, HAR files
          </p>
        </div>
        
        {files.length > 0 && (
          <div className="mt-2 space-y-1">
            {files.map((file, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-muted rounded text-sm">
                <span>{file.name}</span>
                <Button variant="ghost" size="sm" onClick={() => removeFile(i)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <Label>Links</Label>
        <div className="flex gap-2 mt-2">
          <Input 
            value={newLink} 
            onChange={(e) => setNewLink(e.target.value)}
            placeholder="JIRA ticket, Slack channel, etc."
            onKeyPress={(e) => e.key === 'Enter' && addLink()}
          />
          <Button onClick={addLink} variant="outline">
            <Link2 className="h-4 w-4" />
          </Button>
        </div>
        
        {links.length > 0 && (
          <div className="mt-2 space-y-1">
            {links.map((link, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-muted rounded text-sm">
                <span className="truncate">{link}</span>
                <Button variant="ghost" size="sm" onClick={() => removeLink(i)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}