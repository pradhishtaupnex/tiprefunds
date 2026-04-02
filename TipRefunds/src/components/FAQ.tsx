import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ConsultationForm } from './ConsultationForm';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What exactly is the FICA Tip Credit?',
      answer: 'The FICA Tip Credit is a federal tax credit that allows employers to recover a portion of Social Security and Medicare taxes (FICA) paid on employee tips. This credit was created to help restaurants and hospitality businesses offset the cost of payroll taxes on tipped income.',
    },
    {
      question: 'How do I know if my business qualifies?',
      answer: 'Your business qualifies if you operate in the food and beverage or hospitality industry, your employees receive tips from customers, you pay FICA taxes on those tips, and you have W-2 and payroll documentation. This includes restaurants, bars, cafés, hotels, catering companies, and similar establishments.',
    },
    {
      question: 'How much refund can I expect?',
      answer: 'Refund amounts vary based on your payroll size and tip volume, but typically range from $20,000 to $200,000 or more. We calculate your potential credit based on your specific payroll data and tip reporting history. The average client receives over $75,000.',
    },
    {
      question: 'How long does the process take?',
      answer: 'From application to receiving your refund typically takes 4-8 weeks. Our streamlined process ensures quick turnaround times, with most clients receiving payment within 6 weeks. This is significantly faster than traditional IRS processing times.',
    },
    {
      question: 'What documents do you need from me?',
      answer: 'We need your business tax returns (Form 941), W-2 forms for tipped employees, payroll records showing tip reporting, and your EIN. Our team will guide you through exactly what\'s needed and help gather any missing documentation.',
    },
    {
      question: 'Is there any upfront cost?',
      answer: 'No. We work on a contingency basis, meaning you pay nothing upfront. Our fee is only collected after you receive your refund from the IRS. If we don\'t recover money for you, you don\'t pay anything.',
    },
    {
      question: 'How is the credit calculated?',
      answer: 'The credit is calculated based on the employer\'s share of FICA taxes paid on tips that exceed the federal minimum wage. Our CPAs analyze your payroll data to determine the exact credit amount you\'re entitled to claim, ensuring maximum recovery.',
    },
    {
      question: 'What if my accountant never mentioned this credit?',
      answer: 'This is surprisingly common. Many accountants aren\'t familiar with the FICA Tip Credit or don\'t specialize in the hospitality industry. This credit requires specific expertise and documentation, which is why we focus exclusively on helping restaurants and bars claim it.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A1E3F] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about the FICA Tip Credit.
          </p>
        </div>

        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#00A8A8] transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-[#0A1E3F] text-lg pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#00A8A8] flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 py-5 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center bg-gradient-to-br from-[#0A1E3F] to-[#0d2749] text-white rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-gray-300 mb-6">
            Schedule a free consultation with one of our FICA Tip Credit specialists.
          </p>
          <ConsultationForm
            buttonClassName="bg-[#00A8A8] hover:bg-[#008a8a] text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
            buttonText="Schedule Free Consultation"
          />
        </div>
      </div>
    </section>
  );
}
