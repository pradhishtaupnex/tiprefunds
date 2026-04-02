import { CreditCalculator } from './CreditCalculator';
import { ConsultationForm } from './ConsultationForm';
import { Shield, FileCheck, Users, Lock } from 'lucide-react';

export function Hero() {
  const trustBadges = [
    { icon: Shield, text: 'CPA-Backed Service' },
    { icon: FileCheck, text: 'IRS-Compliant Filing' },
    { icon: Users, text: 'Trusted by 500+ Restaurants' },
    { icon: Lock, text: '100% Secure & Confidential' },
  ];

  return (
    <section className="relative bg-gradient-to-br from-[#0A1E3F] via-[#0d2749] to-[#0A1E3F] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3201921/pexels-photo-3201921.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Recover Thousands in
            <span className="block text-[#00A8A8] mt-2">FICA Tip Tax Credits</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-200 mb-6 max-w-3xl mx-auto leading-relaxed">
            Most restaurants miss out on this powerful tax incentive. Tip Refunds helps you claim every dollar you're owed — fast, simple, and compliant.
          </p>

          <div className="bg-[#00A8A8]/20 backdrop-blur-sm border border-[#00A8A8]/30 rounded-xl px-6 py-4 mb-6 inline-block">
            <p className="text-white font-semibold text-lg">
              Eligible businesses recover $20,000-$200,000+ in IRS-approved credits
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 mb-8 inline-block">
            <p className="text-white text-sm">
              <span className="font-bold text-[#00A8A8]">⏰ Act Now:</span> IRS allows up to 3-year retroactive claims
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10 max-w-4xl mx-auto">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-4 flex flex-col items-center gap-2 hover:bg-white/15 transition-all"
              >
                <badge.icon className="w-6 h-6 text-[#00A8A8]" />
                <span className="text-white text-xs sm:text-sm font-medium text-center leading-tight">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <CreditCalculator
              buttonClassName="w-full sm:w-auto bg-[#00A8A8] hover:bg-[#008a8a] text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              buttonText="Calculate Your Credit"
            />
            <ConsultationForm
              buttonClassName="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-white/30 flex items-center justify-center gap-2 transition-all"
              buttonText="Start My Claim"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
