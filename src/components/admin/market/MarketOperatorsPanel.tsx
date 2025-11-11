import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface MarketOperatorsPanelProps {
  marketId: string;
}

const MarketOperatorsPanel: React.FC<MarketOperatorsPanelProps> = ({ marketId }) => {
  const operators = [
    { id: 1, name: 'Golden Palace Casino', status: 'Active', currency: 'EUR', players: 15420, ggr: 284500 },
    { id: 2, name: 'Lucky Star Gaming', status: 'Active', currency: 'EUR', players: 8930, ggr: 156200 },
    { id: 3, name: 'Royal Flush Casino', status: 'Suspended', currency: 'EUR', players: 0, ggr: 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[#EAEAEA]">Operators in This Market</h3>
        <Button className="bg-gradient-to-r from-[#F4C339] to-[#E1A72B] text-black hover:opacity-90">
          + Add Operator to Market
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-[#2B2B2B]">
            <TableHead className="text-[#EAEAEA]/60">Operator Name</TableHead>
            <TableHead className="text-[#EAEAEA]/60">Status</TableHead>
            <TableHead className="text-[#EAEAEA]/60">Currency</TableHead>
            <TableHead className="text-[#EAEAEA]/60">Players</TableHead>
            <TableHead className="text-[#EAEAEA]/60">GGR</TableHead>
            <TableHead className="text-[#EAEAEA]/60">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {operators.map((op) => (
            <TableRow key={op.id} className="border-[#2B2B2B]">
              <TableCell className="text-[#EAEAEA]">{op.name}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-xs ${op.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {op.status}
                </span>
              </TableCell>
              <TableCell className="text-[#F4C339]">{op.currency}</TableCell>
              <TableCell className="text-[#EAEAEA]">{op.players.toLocaleString()}</TableCell>
              <TableCell className="text-[#EAEAEA]">${op.ggr.toLocaleString()}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-[#2B2B2B] text-[#EAEAEA]">Manage</Button>
                  <Button size="sm" variant="outline" className="border-red-500/50 text-red-400">Suspend</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MarketOperatorsPanel;
