import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Hotel, UtensilsCrossed, Wine, Coffee } from 'lucide-react';

export function IndustryCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const industries = [
    {
      icon: UtensilsCrossed,
      title: 'Restaurant Tips',
      subtitle: 'Full-Service Dining',
      description: 'Maximize your FICA tip credit recovery from table service, fine dining, and casual restaurant operations.',
      stats: [
        { label: 'Average Annual Credit', value: '$85,000' },
        { label: 'Typical ROI', value: '15-25%' },
        { label: 'Processing Time', value: '4-6 weeks' },
      ],
      image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=1920',
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: Hotel,
      title: 'Hotel Tips',
      subtitle: 'Hospitality & Resorts',
      description: 'Recover credits from room service, concierge, valet, housekeeping, and on-property dining staff tips.',
      stats: [
        { label: 'Average Annual Credit', value: '$150,000' },
        { label: 'Typical ROI', value: '20-35%' },
        { label: 'Processing Time', value: '5-7 weeks' },
      ],
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Wine,
      title: 'Bar & Nightclub Tips',
      subtitle: 'Beverage Service',
      description: 'Claim credits from bartender and cocktail server tips at bars, nightclubs, and entertainment venues.',
      stats: [
        { label: 'Average Annual Credit', value: '$65,000' },
        { label: 'Typical ROI', value: '18-28%' },
        { label: 'Processing Time', value: '4-6 weeks' },
      ],
      image: 'https://images.pexels.com/photos/1089930/pexels-photo-1089930.jpeg?auto=compress&cs=tinysrgb&w=1920',
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: Coffee,
      title: 'Café Tips',
      subtitle: 'Coffee Shops & Bakeries',
      description: 'Recover FICA credits from barista and counter service tips at coffee shops, cafés, and bakeries.',
      stats: [
        { label: 'Average Annual Credit', value: '$35,000' },
        { label: 'Typical ROI', value: '12-20%' },
        { label: 'Processing Time', value: '3-5 weeks' },
      ],
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1920',
      color: 'from-green-500 to-teal-600',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % industries.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + industries.length) % industries.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = industries[currentSlide];
  const Icon = current.icon;

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A1E3F] mb-4">
            Specialized Solutions for Your Industry
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We understand that every hospitality business is unique. Explore tailored FICA tip credit solutions.
          </p>
        </div>

        <div className="relative">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-80 lg:h-auto overflow-hidden">
                <img
                  src={current.image}
                  alt={current.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${current.color} opacity-40`}></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${current.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#0A1E3F]">{current.title}</h3>
                        <p className="text-sm text-gray-600">{current.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  {current.description}
                </p>

                <div className="grid grid-cols-1 gap-4 mb-8">
                  {current.stats.map((stat, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
                    >
                      <span className="text-gray-600 font-medium">{stat.label}</span>
                      <span className={`text-xl font-bold bg-gradient-to-r ${current.color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={prevSlide}
                    className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
                    aria-label="Previous industry"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#0A1E3F]" />
                  </button>

                  <div className="flex-1 flex items-center gap-2">
                    {industries.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentSlide
                            ? 'w-8 bg-[#00A8A8]'
                            : 'w-2 bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextSlide}
                    className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
                    aria-label="Next industry"
                  >
                    <ChevronRight className="w-5 h-5 text-[#0A1E3F]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#00A8A8]/10 rounded-full blur-2xl -z-10"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#0A1E3F]/10 rounded-full blur-2xl -z-10"></div>
        </div>
      </div>
    </section>
  );
}
