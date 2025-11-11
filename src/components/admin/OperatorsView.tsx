import React, { useState } from 'react';
import { Settings, X, Copy, Check } from 'lucide-react';
import OperatorConfigModal from './OperatorConfigModal';

const OperatorsView: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [operators, setOperators] = useState([
    { id: 1, name: 'Casino Royale EU', markets: 12, currency: 'EUR', status: 'Active', revenue: '$1.2M', languages: ['en', 'es', 'fr'], apiKey: 'op_live_abc123xyz', contactEmail: 'admin@casinoroyale.eu' },
    { id: 2, name: 'Lucky Vegas Global', markets: 8, currency: 'USD', status: 'Active', revenue: '$890K', languages: ['en'], apiKey: 'op_live_def456uvw', contactEmail: 'ops@luckvegas.com' },
    { id: 3, name: 'Golden Dragon Asia', markets: 15, currency: 'CNY', status: 'Active', revenue: '$2.1M', languages: ['en', 'zh-CN', 'ja'], apiKey: 'op_live_ghi789rst', contactEmail: 'support@goldendragon.cn' },
    { id: 4, name: 'Royal Flush UK', markets: 5, currency: 'GBP', status: 'Inactive', revenue: '$450K', languages: ['en'], apiKey: 'op_test_jkl012mno', contactEmail: 'info@royalflush.uk' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    currency: '',
    markets: '',
    languages: '',
    contactEmail: '',
    apiKey: '',
    status: 'Active',
    preferredCurrency: '',
    revenueShare: '15',
    minBetLimit: '1',
    maxBetLimit: '10000',
    allowedCountries: '',
    webhookUrl: '',
    ipWhitelist: ''
  });

  const generateApiKey = () => {
    const prefix = formData.status === 'Active' ? 'op_live_' : 'op_test_';
    const random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return prefix + random;
  };

  const toggleStatus = (id: number) => {
    setOperators(operators.map(op => 
      op.id === id ? { ...op, status: op.status === 'Active' ? 'Inactive' : 'Active' } : op
    ));
  };

  const openConfig = (operator: any) => {
    setSelectedOperator(operator);
    setShowConfigModal(true);
  };

  const handleSaveConfig = (config: any) => {
    setOperators(operators.map(op => 
      op.id === selectedOperator.id ? { ...op, ...config } : op
    ));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateOperator = () => {
    // Validation
    if (!formData.name || !formData.currency) {
      alert('Please fill in required fields: Operator Name and Currency');
      return;
    }

    if (!formData.contactEmail || !formData.contactEmail.includes('@')) {
      alert('Please provide a valid contact email');
      return;
    }

    // Generate API key
    const apiKey = generateApiKey();

    const newOperator = {
      id: operators.length + 1,
      name: formData.name,
      markets: parseInt(formData.markets) || 0,
      currency: formData.currency,
      status: formData.status,
      revenue: '$0',
      languages: formData.languages ? formData.languages.split(',').map(l => l.trim()) : ['en'],
      apiKey: apiKey,
      contactEmail: formData.contactEmail,
      preferredCurrency: formData.preferredCurrency || formData.currency,
      revenueShare: formData.revenueShare,
      minBetLimit: formData.minBetLimit,
      maxBetLimit: formData.maxBetLimit,
      allowedCountries: formData.allowedCountries,
      webhookUrl: formData.webhookUrl,
      ipWhitelist: formData.ipWhitelist,
      createdAt: new Date().toISOString()
    };

    setOperators([...operators, newOperator]);
    
    // Show success message with API key
    alert(`Operator created successfully!\n\nAPI Key: ${apiKey}\n\nPlease save this key securely. It will be needed for integration.`);
    
    setShowModal(false);
    setFormData({ 
      name: '', 
      currency: '', 
      markets: '', 
      languages: '', 
      contactEmail: '', 
      apiKey: '', 
      status: 'Active',
      preferredCurrency: '',
      revenueShare: '15',
      minBetLimit: '1',
      maxBetLimit: '10000',
      allowedCountries: '',
      webhookUrl: '',
      ipWhitelist: ''
    });
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#EAEAEA]" style={{ fontFamily: 'Poppins, sans-serif' }}>Operators</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-[#F4C339] to-[#E1A72B] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          + Create Operator
        </button>
      </div>

      <div className="bg-[#181A1D] rounded-xl border border-[#2B2B2B] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#111315]">
            <tr>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Operator Name</th>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Markets</th>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Currency</th>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Status</th>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Revenue (30d)</th>
              <th className="text-left p-4 text-sm font-semibold text-[#F4C339]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {operators.map((op) => (
              <tr key={op.id} className="border-t border-[#2B2B2B] hover:bg-[#111315] transition-colors">
                <td className="p-4 text-[#EAEAEA]">{op.name}</td>
                <td className="p-4 text-[#EAEAEA]">{op.markets}</td>
                <td className="p-4 text-[#EAEAEA]">{op.currency}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${op.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {op.status}
                  </span>
                </td>
                <td className="p-4 text-[#EAEAEA] font-semibold">{op.revenue}</td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => openConfig(op)}
                    className="px-3 py-2 bg-[#2B2B2B] text-[#F4C339] rounded-lg hover:bg-[#F4C339] hover:text-black transition-all text-xs font-medium flex items-center gap-1"
                  >
                    <Settings size={14} />
                    Config
                  </button>
                  <button
                    onClick={() => toggleStatus(op.id)}
                    className="px-3 py-2 bg-[#2B2B2B] text-[#F4C339] rounded-lg hover:bg-[#F4C339] hover:text-black transition-all text-xs font-medium"
                  >
                    Toggle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-[#181A1D] rounded-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#2B2B2B]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#EAEAEA]" style={{ fontFamily: 'Poppins, sans-serif' }}>Create New Operator</h3>
              <button onClick={() => setShowModal(false)} className="text-[#EAEAEA] hover:text-[#F4C339]">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Basic Information Section */}
              <div>
                <h4 className="text-lg font-semibold text-[#F4C339] mb-4">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#F4C339] mb-2">Operator Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Lucky Casino Global" 
                      className="w-full px-4 py-3 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA] focus:border-[#F4C339] outline-none" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#F4C339] mb-2">Contact Email *</label>
                    <input 
                      type="email" 
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      placeholder="contact@operator.com" 
                      className="w-full px-4 py-3 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA] focus:border-[#F4C339] outline-none" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#F4C339] mb-2">Status</label>
                    <select 
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA] focus:border-[#F4C339] outline-none"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#F4C339] mb-2">Number of Markets</label>
                    <input 
                      type="number" 
                      name="markets"
                      value={formData.markets}
                      onChange={handleInputChange}
                      placeholder="e.g., 5" 
                      className="w-full px-4 py-3 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA] focus:border-[#F4C339] outline-none" 
                    />
                  </div>
                </div>
              </div>

              {/* Currency Configuration */}
              <div>
                <h4 className="text-lg font-semibold text-[#F4C339] mb-4">Currency Configuration</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#F4C339] mb-2">Default Currency *</label>
                    <select 
                      name="currency"
                      value={formData.currency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA] focus:border-[#F4C339] outline-none"
                    >
                      <option value="">Select Currency</option>
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="CNY">CNY - Chinese Yuan</option>
                      <option value="JPY">JPY - Japanese Yen</option>
                      <option value="KRW">KRW - Korean Won</option>
                      <option value="THB">THB - Thai Baht</option>
                      <option value="VND">VND - Vietnamese Dong</option>
                      <option value="AUD">AUD - Australian Dollar</option>
                      <option value="CAD">CAD - Canadian Dollar</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#F4C339] mb-2">Preferred Currency (Reporting)</label>
                    <select 
                      name="preferredCurrency"
                      value={formData.preferredCurrency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA] focus:border-[#F4C339] outline-none"
                    >
                      <option value="">Same as Default</option>
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="CNY">CNY - Chinese Yuan</option>
                      <option value="JPY">JPY - Japanese Yen</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Financial Settings */}
              <div>
                <h4 className="text-lg font-semibold text-[#F4C339] mb-4">Financial Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#F4C339] mb-2">Revenue Share (%)</label>
                    <input 
                      type="number" 
                      name="revenueShare"
                      value={formData.revenueShare}
                      onChange={handleInputChange}
                      placeholder="15" 
                      className="w-full px-4 py-3 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA] focus:border-[#F4C339] outline-none" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#F4C339] mb-2">Min Bet Limit</label>
                    <input 
                      type="number" 
                      name="minBetLimit"
                      value={formData.minBetLimit}
                      onChange={handleInputChange}
                      placeholder="1" 
                      className="w-full px-4 py-3 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA] focus:border-[#F4C339] outline-none" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#F4C339] mb-2">Max Bet Limit</label>
                    <input 
                      type="number" 
                      name="maxBetLimit"
                      value={formData.maxBetLimit}
                      onChange={handleInputChange}
                      placeholder="10000" 
                      className="w-full px-4 py-3 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA] focus:border-[#F4C339] outline-none" 
                    />
                  </div>
                </div>
              </div>

              {/* Localization */}
              <div>
                <h4 className="text-lg font-semibold text-[#F4C339] mb-4">Localization</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#F4C339] mb-2">Languages (comma-separated)</label>
                    <input 
                      type="text" 
                      name="languages"
                      value={formData.languages}
                      onChange={handleInputChange}
                      placeholder="e.g., en, es, fr, zh-CN" 
                      className="w-full px-4 py-3 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA] focus:border-[#F4C339] outline-none" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#F4C339] mb-2">Allowed Countries (comma-separated)</label>
                    <input 
                      type="text" 
                      name="allowedCountries"
                      value={formData.allowedCountries}
                      onChange={handleInputChange}
                      placeholder="e.g., US, UK, CA, AU" 
                      className="w-full px-4 py-3 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA] focus:border-[#F4C339] outline-none" 
                    />
                  </div>
                </div>
              </div>

              {/* Integration Settings */}
              <div>
                <h4 className="text-lg font-semibold text-[#F4C339] mb-4">Integration Settings</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#F4C339] mb-2">Webhook URL</label>
                    <input 
                      type="url" 
                      name="webhookUrl"
                      value={formData.webhookUrl}
                      onChange={handleInputChange}
                      placeholder="https://operator.com/webhook" 
                      className="w-full px-4 py-3 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA] focus:border-[#F4C339] outline-none" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#F4C339] mb-2">IP Whitelist (comma-separated)</label>
                    <textarea 
                      name="ipWhitelist"
                      value={formData.ipWhitelist}
                      onChange={handleInputChange}
                      placeholder="e.g., 192.168.1.1, 10.0.0.1" 
                      rows={2}
                      className="w-full px-4 py-3 bg-[#111315] border border-[#2B2B2B] rounded-lg text-[#EAEAEA] focus:border-[#F4C339] outline-none" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#F4C339] mb-2">API Key (auto-generated on creation)</label>
                    <input 
                      type="text" 
                      value="Will be generated automatically upon creation"
                      disabled
                      className="w-full px-4 py-3 bg-[#111315] border border-[#2B2B2B] rounded-lg text-gray-500 outline-none" 
                    />
                  </div>
                </div>
              </div>
            </div>


            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => setShowModal(false)} 
                className="flex-1 px-6 py-3 bg-[#2B2B2B] text-[#F4C339] rounded-lg hover:bg-[#F4C339] hover:text-black transition-all font-semibold"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateOperator} 
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#F4C339] to-[#E1A72B] text-black rounded-lg hover:opacity-90 transition-opacity font-semibold"
              >
                Create Operator
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfigModal && selectedOperator && (
        <OperatorConfigModal
          operator={selectedOperator}
          onClose={() => setShowConfigModal(false)}
          onSave={handleSaveConfig}
        />
      )}
    </div>
  );
};

export default OperatorsView;
