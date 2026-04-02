import { CreditCalculator } from './CreditCalculator';
import { ConsultationForm } from './ConsultationForm';

export function FinalCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#00A8A8] to-[#008a8a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Claim Your Refund?
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          Start your FICA Tip Credit claim today — no fees until you get paid.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <CreditCalculator
            buttonClassName="w-full sm:w-auto bg-white hover:bg-gray-50 text-[#00A8A8] px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
            buttonText="Calculate Your Credit"
          />
          <ConsultationForm
            buttonClassName="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-white flex items-center justify-center gap-2 transition-all"
            buttonText="Book Free Consultation"
          />
        </div>

        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-white/80 text-sm">
            Join 1,000+ satisfied restaurant owners who have already claimed their credits
          </p>
        </div>
      </div>
    </section>
  );
}
