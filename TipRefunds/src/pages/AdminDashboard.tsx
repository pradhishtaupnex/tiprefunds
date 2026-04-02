import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Download,
  RefreshCw,
  BarChart3
} from 'lucide-react';
import { formatCurrency } from '../lib/calculations';

interface ConsultationRequest {
  id: string;
  name: string;
  business_name: string;
  email: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  message: string;
  created_at: string;
}

interface CreditCalculation {
  id: string;
  business_name: string;
  contact_name: string;
  email: string;
  phone: string;
  business_type: string;
  num_employees: number;
  avg_monthly_tips: number;
  estimated_credit: number;
  created_at: string;
}

interface Stats {
  totalConsultations: number;
  totalCalculations: number;
  totalEstimatedCredits: number;
  averageCredit: number;
}

export function AdminDashboard() {
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [calculations, setCalculations] = useState<CreditCalculation[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalConsultations: 0,
    totalCalculations: 0,
    totalEstimatedCredits: 0,
    averageCredit: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'consultations' | 'calculations' | 'stats'>('stats');

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: consultData } = await supabase
        .from('consultation_requests')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: calcData } = await supabase
        .from('credit_calculations')
        .select('*')
        .order('created_at', { ascending: false });

      setConsultations(consultData || []);
      setCalculations(calcData || []);

      const totalCredits = (calcData || []).reduce(
        (sum, item) => sum + (item.estimated_credit || 0),
        0
      );

      setStats({
        totalConsultations: consultData?.length || 0,
        totalCalculations: calcData?.length || 0,
        totalEstimatedCredits: totalCredits,
        averageCredit: calcData?.length ? totalCredits / calcData.length : 0,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const exportToCSV = (type: 'consultations' | 'calculations') => {
    let csv = '';
    let filename = '';

    if (type === 'consultations') {
      csv = 'Name,Business Name,Email,Phone,Preferred Date,Preferred Time,Message,Submitted At\n';
      consultations.forEach((item) => {
        csv += `"${item.name}","${item.business_name || ''}","${item.email}","${item.phone}","${item.preferred_date}","${item.preferred_time}","${item.message || ''}","${new Date(item.created_at).toLocaleString()}"\n`;
      });
      filename = 'consultation-requests.csv';
    } else {
      csv = 'Business Name,Contact Name,Email,Phone,Business Type,Employees,Monthly Tips,Estimated Credit,Submitted At\n';
      calculations.forEach((item) => {
        csv += `"${item.business_name || ''}","${item.contact_name || ''}","${item.email}","${item.phone}","${item.business_type || ''}",${item.num_employees || 0},${item.avg_monthly_tips || 0},${item.estimated_credit || 0},"${new Date(item.created_at).toLocaleString()}"\n`;
      });
      filename = 'credit-calculations.csv';
    }

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-[#00A8A8] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0A1E3F] mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Track form submissions and analytics
              </p>
            </div>
            <button
              onClick={fetchData}
              className="flex items-center gap-2 bg-[#00A8A8] hover:bg-[#008a8a] text-white px-4 py-2 rounded-lg transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#00A8A8]">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-[#00A8A8]" />
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Consultation Requests
            </h3>
            <p className="text-3xl font-bold text-[#0A1E3F]">
              {stats.totalConsultations}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#00A8A8]">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-8 h-8 text-[#00A8A8]" />
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Credit Calculations
            </h3>
            <p className="text-3xl font-bold text-[#0A1E3F]">
              {stats.totalCalculations}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Total Estimated Credits
            </h3>
            <p className="text-3xl font-bold text-[#0A1E3F]">
              {formatCurrency(stats.totalEstimatedCredits)}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Average Credit
            </h3>
            <p className="text-3xl font-bold text-[#0A1E3F]">
              {formatCurrency(stats.averageCredit)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('stats')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'stats'
                    ? 'border-[#00A8A8] text-[#00A8A8]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <BarChart3 className="w-4 h-4 inline mr-2" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('consultations')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'consultations'
                    ? 'border-[#00A8A8] text-[#00A8A8]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                Consultations ({consultations.length})
              </button>
              <button
                onClick={() => setActiveTab('calculations')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'calculations'
                    ? 'border-[#00A8A8] text-[#00A8A8]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Calculations ({calculations.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'stats' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-[#0A1E3F] to-[#0d2749] text-white rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Last 24 hours</span>
                        <span className="font-bold">
                          {consultations.filter(c =>
                            new Date(c.created_at) > new Date(Date.now() - 86400000)
                          ).length + calculations.filter(c =>
                            new Date(c.created_at) > new Date(Date.now() - 86400000)
                          ).length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Last 7 days</span>
                        <span className="font-bold">
                          {consultations.filter(c =>
                            new Date(c.created_at) > new Date(Date.now() - 604800000)
                          ).length + calculations.filter(c =>
                            new Date(c.created_at) > new Date(Date.now() - 604800000)
                          ).length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>All time</span>
                        <span className="font-bold">
                          {consultations.length + calculations.length}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#00A8A8] to-[#008a8a] text-white rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4">Credits Overview</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Highest Estimate</span>
                        <span className="font-bold">
                          {formatCurrency(Math.max(...calculations.map(c => c.estimated_credit || 0), 0))}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Lowest Estimate</span>
                        <span className="font-bold">
                          {formatCurrency(calculations.length > 0 ? Math.min(...calculations.filter(c => c.estimated_credit > 0).map(c => c.estimated_credit)) : 0)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Median</span>
                        <span className="font-bold">
                          {formatCurrency(calculations.length > 0 ? calculations.map(c => c.estimated_credit).sort((a, b) => a - b)[Math.floor(calculations.length / 2)] : 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'consultations' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-[#0A1E3F]">
                    Consultation Requests
                  </h3>
                  <button
                    onClick={() => exportToCSV('consultations')}
                    className="flex items-center gap-2 text-sm bg-[#00A8A8] hover:bg-[#008a8a] text-white px-4 py-2 rounded-lg transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Business
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Preferred Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Submitted
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {consultations.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.business_name || '-'}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            <div>{item.email}</div>
                            <div className="text-gray-400">{item.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div>{item.preferred_date}</div>
                            <div className="text-gray-400">{item.preferred_time}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(item.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {consultations.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      No consultation requests yet
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'calculations' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-[#0A1E3F]">
                    Credit Calculations
                  </h3>
                  <button
                    onClick={() => exportToCSV('calculations')}
                    className="flex items-center gap-2 text-sm bg-[#00A8A8] hover:bg-[#008a8a] text-white px-4 py-2 rounded-lg transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Business
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Employees
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Monthly Tips
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Est. Credit
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Submitted
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {calculations.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {item.business_name || '-'}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            <div>{item.contact_name || item.email}</div>
                            <div className="text-gray-400">{item.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.business_type || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.num_employees || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.avg_monthly_tips ? formatCurrency(item.avg_monthly_tips) : '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#00A8A8]">
                            {formatCurrency(item.estimated_credit || 0)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(item.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {calculations.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      No calculations yet
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
