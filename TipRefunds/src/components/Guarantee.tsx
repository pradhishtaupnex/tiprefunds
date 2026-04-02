import { ShieldCheck, Lock, Clock, Award } from 'lucide-react';

export function Guarantee() {
  const guarantees = [
    {
      icon: ShieldCheck,
      heading: 'Audit Support Included',
      text: 'We stand behind every claim. If the IRS audits your credit, we defend it at no extra cost.',
    },
    {
      icon: Lock,
      heading: '100% Secure & Confidential',
      text: 'Bank-level encryption protects your data. Your information is never shared or sold.',
    },
    {
      icon: Clock,
      heading: 'No Upfront Fees',
      text: 'You pay nothing until you receive your refund. Our fee is performance-based only.',
    },
    {
      icon: Award,
      heading: 'CPA-Backed Filings',
      text: 'Every claim is prepared and filed by licensed CPAs specializing in IRS tax credits.',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A1E3F] mb-4">
            Zero Risk. Complete Peace of Mind.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We make claiming your FICA tip credit simple, secure, and completely risk-free
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((guarantee, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-[#00A8A8] transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-[#00A8A8]/10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-[#00A8A8] transition-colors">
                <guarantee.icon className="w-6 h-6 text-[#00A8A8] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-[#0A1E3F] mb-3">
                {guarantee.heading}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {guarantee.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex flex-col items-center gap-3 bg-[#00A8A8]/10 border border-[#00A8A8]/30 rounded-xl px-8 py-6">
            <ShieldCheck className="w-8 h-8 text-[#00A8A8]" />
            <p className="text-[#0A1E3F] font-bold text-lg">
              100% Money-Back Guarantee
            </p>
            <p className="text-gray-700 text-sm max-w-md">
              If we don't recover at least 5x our fee in credits, we refund our entire service charge
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
