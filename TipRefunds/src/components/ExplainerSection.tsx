import { DollarSign, Building2, TrendingUp, ArrowRight } from 'lucide-react';
import { CreditCalculator } from './CreditCalculator';

export function ExplainerSection() {
  const cards = [
    {
      icon: DollarSign,
      title: 'What It Is',
      description: 'A federal credit reimbursing employers for FICA taxes paid on employee tips.',
    },
    {
      icon: Building2,
      title: 'Who Qualifies',
      description: 'Restaurants, bars, cafés, and hospitality businesses that report staff tips.',
    },
    {
      icon: TrendingUp,
      title: 'How Much',
      description: 'Refunds typically range from $20,000 to $200,000+ depending on staff size.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A1E3F] mb-4">
            The FICA Tip Credit You're Missing Out On
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Most restaurant and bar owners don't realize they're eligible for this substantial tax refund. Here's what you need to know.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-[#00A8A8] rounded-xl flex items-center justify-center mb-6">
                <card.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0A1E3F] mb-3">
                {card.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <CreditCalculator
            buttonClassName="inline-flex items-center gap-2 text-[#00A8A8] font-semibold text-lg hover:gap-3 transition-all"
            buttonText="See How Much You Could Get"
            showArrow={true}
          />
        </div>
      </div>
    </section>
  );
}
