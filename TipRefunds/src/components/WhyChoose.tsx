import { Brain, Zap, DollarSign, Ban } from 'lucide-react';

export function WhyChoose() {
  const features = [
    {
      icon: Brain,
      title: 'Expertise',
      description: 'Specialists in FICA tip credit refunds for restaurants nationwide.',
    },
    {
      icon: Zap,
      title: 'Speed',
      description: 'Get funded in weeks with our proven filing process.',
    },
    {
      icon: DollarSign,
      title: 'Maximum Returns',
      description: 'We dig deep to maximize your refund — every dollar counts.',
    },
    {
      icon: Ban,
      title: 'Zero Upfront Fees',
      description: 'Pay only after you receive your refund.',
    },
  ];

  const stats = [
    { value: '$1B+', label: 'Claimed' },
    { value: '1,000+', label: 'Businesses Helped' },
    { value: '100%', label: 'Compliance Rate' },
    { value: '50+', label: 'States Covered' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#0A1E3F] via-[#0d2749] to-[#0A1E3F] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why Choose Tip Refunds?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We combine expertise, speed, and results to deliver the maximum refund you deserve.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#00A8A8] to-[#008a8a] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-[#00A8A8] mb-2">
                {stat.value}
              </div>
              <div className="text-gray-300 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
