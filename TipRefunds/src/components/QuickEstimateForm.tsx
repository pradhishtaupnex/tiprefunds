import { useState } from 'react';
import { Calculator, Check, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { calculateFICATipCredit, formatCurrency } from '../lib/calculations';

export function QuickEstimateForm() {
  const [formData, setFormData] = useState({
    employees: '',
    monthlyTips: '',
    state: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [estimatedCredit, setEstimatedCredit] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const calculation = calculateFICATipCredit(formData);
      setEstimatedCredit(calculation.threeYearTotal);

      const estimateResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/get/free/credit/estimate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            type: 'quick_estimate',
            data: {
              employees: formData.employees,
              monthly_tips: parseFloat(formData.monthlyTips.replace(/[^0-9]/g, '')),
              state: formData.state,
              estimated_credit: calculation.threeYearTotal,
            },
          }),
        }
      );

      if (!estimateResponse.ok) {
        console.error('Failed to send email notification');
      }

      setSubmitStatus('success');

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#00A8A8] rounded-xl mb-4">
              <Calculator className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A1E3F] mb-3">
              Get Your Free Credit Estimate
            </h2>
            <p className="text-lg text-gray-600">
              See what you could recover in 60 seconds
            </p>
          </div>

          {estimatedCredit && submitStatus === 'success' && (
            <div className="mb-8 p-6 bg-[#00A8A8]/10 border-2 border-[#00A8A8] rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-[#00A8A8]" />
                <h3 className="text-xl font-bold text-[#0A1E3F]">Your Estimated Credit</h3>
              </div>
              <div className="text-4xl font-bold text-[#00A8A8] mb-2">
                {formatCurrency(estimatedCredit)}
              </div>
              <p className="text-gray-700">
                Based on 3 years of retroactive claims. A specialist will contact you at <strong>{formData.email}</strong> to discuss next steps.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-800 text-sm">
                There was an error submitting your request. Please try again.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-[#0A1E3F] mb-2">
                  Number of Tipped Employees
                </label>
                <select
                  name="employees"
                  value={formData.employees}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8A8] focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select range</option>
                  <option value="5-10">5-10 employees</option>
                  <option value="11-20">11-20 employees</option>
                  <option value="21-50">21-50 employees</option>
                  <option value="51-100">51-100 employees</option>
                  <option value="100+">100+ employees</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0A1E3F] mb-2">
                  Average Monthly Tips Paid
                </label>
                <select
                  name="monthlyTips"
                  value={formData.monthlyTips}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8A8] focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select range</option>
                  <option value="5k-20k">$5,000 - $20,000</option>
                  <option value="20k-50k">$20,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k+">$100,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0A1E3F] mb-2">
                  State
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8A8] focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select state</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0A1E3F] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8A8] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#00A8A8] hover:bg-[#008a8a] disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
            >
              <Calculator className="w-5 h-5" />
              {isSubmitting ? 'Calculating...' : 'Calculate My Credit'}
            </button>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#00A8A8]" />
                <span>No obligation</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#00A8A8]" />
                <span>Results in 60 seconds</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#00A8A8]" />
                <span>100% confidential</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
