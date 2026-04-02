import { Quote, TrendingUp } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      amount: '$82,500',
      businessType: '52-Seat Steakhouse, Pennsylvania',
      employees: '24 tipped employees',
      quote: 'Tip Refunds helped us recover over $80,000 with zero hassle. The entire process was seamless.',
      author: 'Michael R.',
      title: 'Restaurant Owner',
    },
    {
      amount: '$43,200',
      businessType: 'Family Café & Bakery, Oregon',
      employees: '12 tipped employees',
      quote: 'Smooth, transparent, and professional — our refund arrived in under a month. Couldn\'t be happier.',
      author: 'Sarah T.',
      title: 'Café Owner',
    },
    {
      amount: '$98,400',
      businessType: 'Downtown Sports Bar, Colorado',
      employees: '28 tipped employees',
      quote: 'After years of missing out, we finally claimed our credit — thanks to this team. Game changer for our business.',
      author: 'David L.',
      title: 'Bar Manager',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A1E3F] mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join hundreds of satisfied restaurant owners who have recovered significant FICA tip credits.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-[#00A8A8] relative group"
            >
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp className="w-16 h-16 text-[#00A8A8]" />
              </div>

              <div className="mb-6">
                <div className="text-4xl font-bold text-[#00A8A8] mb-2">
                  {testimonial.amount}
                </div>
                <div className="text-sm font-bold text-[#0A1E3F] mb-1">
                  {testimonial.businessType}
                </div>
                <div className="text-xs text-gray-600 font-medium">
                  {testimonial.employees}
                </div>
              </div>

              <div className="border-t-2 border-gray-100 pt-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#00A8A8] to-[#008a8a] rounded-lg flex items-center justify-center mb-4">
                  <Quote className="w-5 h-5 text-white" />
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-bold text-[#0A1E3F]">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
