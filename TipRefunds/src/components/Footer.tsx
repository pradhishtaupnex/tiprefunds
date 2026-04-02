import { Link } from 'react-router-dom';
import { DollarSign, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  const quickLinks = [
    { text: 'How It Works', action: () => scrollToSection('how-it-works') },
    { text: 'Benefits', action: () => scrollToSection('benefits') },
    { text: 'FAQs', action: () => scrollToSection('faq') },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0A1E3F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#00A8A8] rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Tip Refunds</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Helping restaurants and hospitality businesses nationwide recover FICA Tip Tax Credits. Fast, compliant, and risk-free.
            </p>
            {/* <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-[#00A8A8]" />
                <span>123 Main Street, Suite 100, New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-[#00A8A8]" />
                <span>info@tiprefunds.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-[#00A8A8]" />
                <span>(555) 123-4567</span>
              </div>
            </div> */}
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.action}
                    className="text-gray-400 hover:text-[#00A8A8] transition-colors"
                  >
                    {link.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-400 hover:text-[#00A8A8] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-use"
                  className="text-gray-400 hover:text-[#00A8A8] transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
              {/* <li>
                <button className="text-gray-400 hover:text-[#00A8A8] transition-colors">
                  Cookie Policy
                </button>
              </li> */}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2025 Tip Refunds. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs text-center md:text-right max-w-md">
              Tip Refunds is not affiliated with the IRS. All credits are processed through licensed CPA partners.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
