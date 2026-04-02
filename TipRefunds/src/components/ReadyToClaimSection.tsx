import { TrendingUp, Clock, Shield } from 'lucide-react';
import { ConsultationForm } from './ConsultationForm';

export function ReadyToClaimSection() {
  const benefits = [
    {
      icon: TrendingUp,
      text: 'Recover thousands in unclaimed credits',
    },
    {
      icon: Clock,
      text: 'Fast 4-8 week processing time',
    },
    {
      icon: Shield,
      text: '100% IRS compliant & audit-ready',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-[#0A1E3F] via-[#0d2749] to-[#0A1E3F] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#00A8A8]/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-[#00A8A8] mb-6 border border-[#00A8A8]/30">
            <span className="w-2 h-2 bg-[#00A8A8] rounded-full animate-pulse"></span>
            Don't Leave Money on the Table
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Claim Your Refund?
          </h2>

          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join over 1,000 restaurant owners who have recovered their FICA tip tax credits.
            <span className="block mt-2 text-[#00A8A8] font-semibold">
              Start your claim today — no upfront costs, no obligations.
            </span>
          </p>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-10 max-w-3xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 sm:p-5 hover:bg-white/15 transition-all"
              >
                <benefit.icon className="w-8 h-8 text-[#00A8A8] mx-auto mb-3" />
                <p className="text-white text-sm sm:text-base font-medium">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <ConsultationForm
              buttonClassName="w-full sm:w-auto bg-[#00A8A8] hover:bg-[#008a8a] text-white px-10 py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-2xl hover:shadow-[#00A8A8]/50 transform hover:-translate-y-1 hover:scale-105"
              buttonText="Start My Claim Now"
            />
            <a
              href="tel:+18005551234"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-5 rounded-xl font-semibold text-lg border-2 border-white/30 flex items-center justify-center gap-2 transition-all hover:border-white/50"
            >
              Or Call Us: (800) 555-1234
            </a>
          </div>

          <p className="text-gray-400 text-sm mt-6">
            Free consultation • No risk • Only pay when you get your refund
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
