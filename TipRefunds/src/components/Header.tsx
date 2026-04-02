import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Menu, X } from 'lucide-react';
import { CreditCalculator } from './CreditCalculator';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#00A8A8] to-[#008a8a] rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0A1E3F] truncate">Tip Refunds</span>
            </div>

            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-[#0A1E3F] hover:text-[#00A8A8] font-medium transition-colors whitespace-nowrap text-sm xl:text-base"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('benefits')}
                className="text-[#0A1E3F] hover:text-[#00A8A8] font-medium transition-colors whitespace-nowrap text-sm xl:text-base"
              >
                Benefits
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-[#0A1E3F] hover:text-[#00A8A8] font-medium transition-colors whitespace-nowrap text-sm xl:text-base"
              >
                FAQs
              </button>
              <Link
                to="/privacy-policy"
                className="text-[#0A1E3F] hover:text-[#00A8A8] font-medium transition-colors whitespace-nowrap text-sm xl:text-base"
              >
                Privacy Policy
              </Link>
              <CreditCalculator
                buttonClassName="bg-[#00A8A8] hover:bg-[#008a8a] text-white px-4 xl:px-5 py-2 xl:py-2.5 rounded-lg font-semibold text-sm transition-all shadow-md hover:shadow-lg whitespace-nowrap"
                buttonText="Calculate Credit"
              />
            </nav>

            <div className="flex items-center gap-3 lg:hidden">
              <CreditCalculator
                buttonClassName="bg-[#00A8A8] hover:bg-[#008a8a] text-white px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all shadow-md whitespace-nowrap"
                buttonText="Calculate"
              />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#0A1E3F] p-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="fixed top-16 sm:top-20 right-0 w-64 h-full bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col p-6 space-y-6">
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-[#0A1E3F] hover:text-[#00A8A8] font-medium transition-colors text-left text-lg"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('benefits')}
                className="text-[#0A1E3F] hover:text-[#00A8A8] font-medium transition-colors text-left text-lg"
              >
                Benefits
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-[#0A1E3F] hover:text-[#00A8A8] font-medium transition-colors text-left text-lg"
              >
                FAQs
              </button>
              <Link
                to="/privacy-policy"
                className="text-[#0A1E3F] hover:text-[#00A8A8] font-medium transition-colors text-left text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Privacy Policy
              </Link>
              <div className="pt-4 border-t border-gray-200">
                <CreditCalculator
                  buttonClassName="w-full bg-[#00A8A8] hover:bg-[#008a8a] text-white px-4 py-3 rounded-lg font-semibold text-base transition-all shadow-md"
                  buttonText="Calculate Your Credit"
                />
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
