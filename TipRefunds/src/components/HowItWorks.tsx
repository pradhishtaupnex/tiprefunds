import { FileText, UserCheck, Send, Banknote } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: FileText,
      title: 'Simple Application',
      description: 'Submit your business info (takes 2 minutes).',
    },
    {
      icon: UserCheck,
      title: 'CPA Review',
      description: 'Our tax experts analyze and prepare your claim.',
    },
    {
      icon: Send,
      title: 'IRS Filing',
      description: 'We handle submission and compliance checks.',
    },
    {
      icon: Banknote,
      title: 'Get Paid',
      description: 'Receive your refund in weeks — not months.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A1E3F] mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our proven four-step process makes claiming your FICA Tip Credit simple and hassle-free.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#00A8A8] to-[#008a8a] rounded-2xl flex items-center justify-center shadow-lg">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#0A1E3F] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0A1E3F] mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#00A8A8] to-transparent"></div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 font-medium">
            Zero paperwork, zero stress — we handle it all.
          </p>
        </div>
      </div>
    </section>
  );
}
