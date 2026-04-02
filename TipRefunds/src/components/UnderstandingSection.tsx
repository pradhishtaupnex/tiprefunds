import { BookOpen, Calculator, ShieldCheck, ExternalLink } from 'lucide-react';

export function UnderstandingSection() {
  const sections = [
    {
      icon: BookOpen,
      heading: 'What It Is',
      text: 'Section 45B of the IRS tax code allows employers to claim a credit for Social Security and Medicare taxes paid on employee-reported tips above the federal minimum wage.',
    },
    {
      icon: Calculator,
      heading: 'Why It Exists',
      text: 'The IRS created this credit to reduce the tax burden on businesses employing tipped workers, recognizing the unique economics of the service industry.',
    },
    {
      icon: ShieldCheck,
      heading: 'How We Help',
      text: 'Our CPA partners specialize in FICA tip credit claims. We handle documentation, calculations, filings, and audit support — you just collect the refund.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A1E3F] mb-4">
            The FICA Tip Credit Explained
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about this IRS-approved tax credit
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#00A8A8] hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 bg-[#00A8A8] rounded-xl flex items-center justify-center mb-6">
                <section.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0A1E3F] mb-4">
                {section.heading}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {section.text}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://www.irs.gov/publications/p15b"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#00A8A8] hover:text-[#008a8a] font-semibold transition-colors"
          >
            <span>Want to learn more? Read IRS Publication 15-B</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
