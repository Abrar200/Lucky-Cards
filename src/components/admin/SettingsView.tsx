import React, { useState } from 'react';
import { Save, Server, Shield, Bell, Key, Database, Mail, Clock, Info, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SettingsView: React.FC = () => {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">System Settings</h1>
          <p className="text-[#E4C98F] mt-1">Configure platform settings and preferences</p>
        </div>
        <Button onClick={handleSave} className="bg-[#D9A441] hover:bg-[#E4C98F] text-black">
          <Save size={16} className="mr-2" />
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>

      <Tabs defaultValue="system" className="w-full">
        <TabsList className="bg-[#0D0D0D] border border-[#D9A441]/30">
          <TabsTrigger value="system"><Server size={16} className="mr-2" />System</TabsTrigger>
          <TabsTrigger value="security"><Shield size={16} className="mr-2" />Security</TabsTrigger>
          <TabsTrigger value="notifications"><Bell size={16} className="mr-2" />Notifications</TabsTrigger>
          <TabsTrigger value="api"><Key size={16} className="mr-2" />API</TabsTrigger>
          <TabsTrigger value="backup"><Database size={16} className="mr-2" />Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="system" className="space-y-4 mt-6">
          <div className="bg-[#0D0D0D] p-6 rounded-lg border border-[#D9A441]/30 space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">General Configuration</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#E4C98F]">Platform Name</Label>
                <Input defaultValue="Lucky Cards Admin" className="mt-1 bg-[#111315] border-[#D9A441]/30 text-white" />
              </div>
              <div>
                <Label className="text-[#E4C98F]">Support Email</Label>
                <Input defaultValue="support@luckycards.com" className="mt-1 bg-[#111315] border-[#D9A441]/30 text-white" />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 mt-6">
          <div className="bg-[#0D0D0D] p-6 rounded-lg border border-[#D9A441]/30 space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Security Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Two-Factor Authentication</Label>
                  <p className="text-sm text-[#E4C98F]/60">Require 2FA for all admin users</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsView;
