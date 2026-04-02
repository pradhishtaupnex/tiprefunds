import { UtensilsCrossed, Wine, Hotel, Sandwich, Coffee, Building2, CheckCircle } from 'lucide-react';
import { CreditCalculator } from './CreditCalculator';

export function EligibilitySection() {
  const categories = [
    {
      icon: UtensilsCrossed,
      title: 'Full-Service Restaurants',
      description: 'Ideal for establishments with table service where employees receive regular tips from diners.',
    },
    {
      icon: Wine,
      title: 'Bars & Nightclubs',
      description: 'Perfect for venues where bartenders and servers earn tips from beverage service.',
    },
    {
      icon: Hotel,
      title: 'Hotels & Resorts',
      description: 'Applicable to hospitality properties with tipped staff in restaurants, bars, and room service.',
    },
    {
      icon: Sandwich,
      title: 'Catering Companies',
      description: 'Eligible if your catering team receives tips from event service and food delivery.',
    },
    {
      icon: Coffee,
      title: 'Coffee Shops & Cafés',
      description: 'Qualifying establishments where baristas and counter staff receive customer tips.',
    },
    {
      icon: Building2,
      title: 'Other Hospitality Businesses',
      description: 'Any service business with tipped employees including salons, spas, and delivery services.',
    },
  ];

  const requirements = [
    'You pay FICA taxes on employee tips',
    'Your team receives regular tips from customers',
    'You can provide W-2 and payroll records',
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A1E3F] mb-4">
            Is Your Business Eligible?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Most hospitality businesses with tipped employees qualify for this valuable credit.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#00A8A8] hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#00A8A8] to-[#008a8a] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#0A1E3F] mb-2">
                {category.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {category.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#0A1E3F] to-[#0d2749] text-white rounded-2xl p-8 sm:p-10 shadow-2xl max-w-4xl mx-auto border-4 border-[#00A8A8]/30">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00A8A8] rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">
              Key Eligibility Requirements
            </h3>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
              If you meet these criteria, you likely qualify for thousands in FICA tax refunds
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 sm:p-8 mb-8 border border-white/10">
            <div className="space-y-5">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#00A8A8] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg sm:text-xl font-medium pt-0.5">{requirement}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <CreditCalculator
              buttonClassName="w-full sm:w-auto bg-[#00A8A8] hover:bg-[#008a8a] text-white px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              buttonText="Calculate Your Credit"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
