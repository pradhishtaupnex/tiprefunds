import { UtensilsCrossed, Wine, Hotel, Quote } from 'lucide-react';

export function SuccessStories() {
  const stories = [
    {
      icon: UtensilsCrossed,
      businessType: '45-Seat Italian Restaurant, Ohio',
      stats: '$72,400 recovered | 18 tipped employees',
      quote: "We had no idea we were leaving this much money on the table. The process was completely hands-off.",
      author: '— Restaurant Owner',
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: Wine,
      businessType: 'High-Volume Sports Bar, Texas',
      stats: '$124,800 recovered | 32 tipped employees',
      quote: "Our CPA never mentioned this credit. TipRefunds handled everything and we got a check in 6 weeks.",
      author: '— Bar Manager',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Hotel,
      businessType: 'Boutique Hotel Restaurant, Florida',
      stats: '$56,300 recovered | 22 tipped employees',
      quote: "The audit support guarantee gave us confidence. Zero risk, pure upside.",
      author: '— General Manager',
      color: 'from-green-500 to-teal-600',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A1E3F] mb-4">
            Real Restaurants, Real Results
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how businesses like yours have recovered thousands in unclaimed tax credits
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-[#00A8A8] hover:shadow-xl transition-all duration-300 relative group"
            >
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-16 h-16 text-[#00A8A8]" />
              </div>

              <div className={`w-14 h-14 bg-gradient-to-br ${story.color} rounded-xl flex items-center justify-center mb-6`}>
                <story.icon className="w-7 h-7 text-white" />
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-bold text-[#0A1E3F] mb-2">
                  {story.businessType}
                </h3>
                <p className={`text-2xl font-bold bg-gradient-to-r ${story.color} bg-clip-text text-transparent mb-4`}>
                  {story.stats.split('|')[0].trim()}
                </p>
                <p className="text-sm text-gray-600 font-medium">
                  {story.stats.split('|')[1].trim()}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6 mt-6">
                <p className="text-gray-700 leading-relaxed mb-4 italic">
                  "{story.quote}"
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {story.author}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-6 py-3">
            <span className="text-gray-600 text-sm">
              Join 500+ restaurant owners who have recovered their credits
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
