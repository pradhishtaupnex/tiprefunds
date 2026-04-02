import { useState, useEffect } from 'react';
import { Calculator, TrendingUp, X, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CalculatorFormData {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  businessType: string;
  numEmployees: string;
  avgMonthlyTips: string;
}

interface CreditCalculatorProps {
  buttonClassName?: string;
  buttonText?: string;
  showArrow?: boolean;
}

interface FormErrors {
  email?: string;
  phone?: string;
  numEmployees?: string;
  avgMonthlyTips?: string;
}

// Validation functions (same as before)
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidUSPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  const phoneRegex = /^(?:\+?1)?\d{10}$/;
  return phoneRegex.test(cleaned);
};

const formatPhoneNumber = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  
  if (numbers.length === 0) return '';
  
  const limited = numbers.slice(0, 10);
  
  if (limited.length <= 3) {
    return `(${limited}`;
  } else if (limited.length <= 6) {
    return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
  } else {
    return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6, 10)}`;
  }
};

export function CreditCalculator({
  buttonClassName = 'inline-flex items-center gap-2 bg-[#00A8A8] hover:bg-[#008a8a] text-white px-6 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg',
  buttonText = 'Calculate Your Credit',
  showArrow = false
}: CreditCalculatorProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [estimatedCredit, setEstimatedCredit] = useState(0);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  
  const [formData, setFormData] = useState<CalculatorFormData>({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: '',
    numEmployees: '',
    avgMonthlyTips: '',
  });

  const businessTypes = [
    'Full-Service Restaurant',
    'Bar/Nightclub',
    'Hotel/Resort',
    'Catering Company',
    'Coffee Shop/Café',
    'Other Hospitality',
  ];

  // Validation functions
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!isValidEmail(value)) return 'Please enter a valid email address';
        return undefined;
      
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!isValidUSPhone(value)) return 'Please enter a valid US phone number (e.g., (555) 123-4567)';
        return undefined;
      
      case 'numEmployees':
        if (!value.trim()) return 'Number of employees is required';
        const num = parseInt(value);
        if (isNaN(num) || num < 1) return 'Please enter a valid number of employees (minimum 1)';
        return undefined;
      
      case 'avgMonthlyTips':
        if (!value.trim()) return 'Average monthly tips is required';
        const tips = parseFloat(value);
        if (isNaN(tips) || tips < 0) return 'Please enter a valid amount (minimum $0)';
        return undefined;
      
      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    // Validate email
    const emailError = validateField('email', formData.email);
    if (emailError) errors.email = emailError;
    
    // Validate phone
    const phoneError = validateField('phone', formData.phone);
    if (phoneError) errors.phone = phoneError;
    
    // Validate numeric fields
    const employeesError = validateField('numEmployees', formData.numEmployees);
    if (employeesError) errors.numEmployees = employeesError;
    
    const tipsError = validateField('avgMonthlyTips', formData.avgMonthlyTips);
    if (tipsError) errors.avgMonthlyTips = tipsError;
    
    // Check other required fields
    if (!formData.businessName.trim()) {
      // Business name validation
    }
    if (!formData.contactName.trim()) {
      // Contact name validation
    }
    if (!formData.businessType.trim()) {
      // Business type validation
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calculateCredit = (monthlyTips: number) => {
    const annualTips = monthlyTips * 12;
    const ficaRate = 0.0765;
    const estimatedAnnualCredit = annualTips * ficaRate * 0.85;
    return Math.round(estimatedAnnualCredit);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Special handling for phone field
    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value);
      setFormData({
        ...formData,
        [name]: formattedPhone,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
    // Validate field if it's been touched before
    if (touchedFields.has(name)) {
      const error = validateField(name, name === 'phone' ? formatPhoneNumber(value) : value);
      setFormErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Add field to touched fields
    setTouchedFields(prev => new Set(prev).add(name));
    
    // Validate the field
    const error = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allFields = ['businessName', 'contactName', 'email', 'phone', 'businessType', 'numEmployees', 'avgMonthlyTips'];
    setTouchedFields(new Set(allFields));
    
    // Validate form
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(formErrors)[0];
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (element as HTMLElement)?.focus();
      }
      return;
    }
    
    setIsSubmitting(true);

    try {
      const monthlyTips = parseFloat(formData.avgMonthlyTips);
      const numEmployees = parseInt(formData.numEmployees);
      const credit = calculateCredit(monthlyTips);

      const creditResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/calculate/fica/tip/credit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            type: 'credit_calculation',
            data: {
              business_name: formData.businessName,
              contact_name: formData.contactName,
              email: formData.email,
              phone: formData.phone,
              business_type: formData.businessType,
              num_employees: numEmployees,
              avg_monthly_tips: monthlyTips,
              estimated_credit: credit,
            },
          }),
        }
      );

      if (!creditResponse.ok) {
        console.error('Failed to send email notification');
      }

      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Credit Calculator',
          content_category: 'Calculator',
          value: credit,
          currency: 'USD'
        });
      }

      setEstimatedCredit(credit);
      setShowResults(true);
    } catch (error) {
      console.error('Error submitting calculation:', error);
      alert('There was an error processing your calculation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      businessName: '',
      contactName: '',
      email: '',
      phone: '',
      businessType: '',
      numEmployees: '',
      avgMonthlyTips: '',
    });
    setFormErrors({});
    setTouchedFields(new Set());
    setShowResults(false);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        resetForm();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={buttonClassName}
      >
        {!showArrow && <Calculator className="w-5 h-5" />}
        {buttonText}
        {showArrow && <ArrowRight className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-start justify-center p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              resetForm();
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="calculator-title"
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full my-8 shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-[#0A1E3F] to-[#0d2749] text-white p-4 sm:p-6 rounded-t-2xl flex items-center justify-between z-10">
              <div className="flex-1 pr-4">
                <h2 id="calculator-title" className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">Calculate Your FICA Tip Credit</h2>
                <p className="text-sm sm:text-base text-gray-300 hidden sm:block">Get an instant estimate of your potential refund</p>
              </div>
              <button
                onClick={resetForm}
                className="text-white hover:text-gray-300 transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              {!showResults ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-[#0A1E3F] mb-2">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8A8] focus:border-transparent outline-none transition-all"
                        placeholder="Your Restaurant Name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-[#0A1E3F] mb-2">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8A8] focus:border-transparent outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-[#0A1E3F] mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 bg-white border rounded-lg focus:ring-2 focus:ring-[#00A8A8] focus:border-transparent outline-none transition-all ${
                          formErrors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="john@restaurant.com"
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-xs text-red-600">{formErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-[#0A1E3F] mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 bg-white border rounded-lg focus:ring-2 focus:ring-[#00A8A8] focus:border-transparent outline-none transition-all ${
                          formErrors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="(555) 123-4567"
                      />
                      {formErrors.phone && (
                        <p className="mt-1 text-xs text-red-600">{formErrors.phone}</p>
                      )}
                      <p className="mt-1 text-xs text-gray-500">
                        Enter a US phone number. Format: (555) 123-4567
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#0A1E3F] mb-2">
                      Business Type *
                    </label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8A8] focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Select your business type</option>
                      {businessTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-[#0A1E3F] mb-2">
                        Number of Tipped Employees *
                      </label>
                      <input
                        type="number"
                        name="numEmployees"
                        value={formData.numEmployees}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        min="1"
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 bg-white border rounded-lg focus:ring-2 focus:ring-[#00A8A8] focus:border-transparent outline-none transition-all ${
                          formErrors.numEmployees ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="10"
                      />
                      {formErrors.numEmployees && (
                        <p className="mt-1 text-xs text-red-600">{formErrors.numEmployees}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-[#0A1E3F] mb-2">
                        Average Monthly Tips ($) *
                      </label>
                      <input
                        type="number"
                        name="avgMonthlyTips"
                        value={formData.avgMonthlyTips}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        min="0"
                        step="0.01"
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 bg-white border rounded-lg focus:ring-2 focus:ring-[#00A8A8] focus:border-transparent outline-none transition-all ${
                          formErrors.avgMonthlyTips ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="25000"
                      />
                      {formErrors.avgMonthlyTips && (
                        <p className="mt-1 text-xs text-red-600">{formErrors.avgMonthlyTips}</p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#00A8A8] hover:bg-[#008a8a] text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      'Calculating...'
                    ) : (
                      <>
                        <Calculator className="w-5 h-5" />
                        Calculate My Credit
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#00A8A8] to-[#008a8a] rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-[#0A1E3F] mb-4">
                    Your Estimated Annual Credit
                  </h3>

                  <div className="bg-gradient-to-br from-[#0A1E3F] to-[#0d2749] text-white rounded-2xl p-8 mb-6">
                    <div className="text-5xl font-bold mb-2">
                      ${estimatedCredit.toLocaleString()}
                    </div>
                    <p className="text-gray-300">per year</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
                    <h4 className="font-bold text-[#0A1E3F] mb-3">Next Steps:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-[#00A8A8] mt-1">✓</span>
                        <span>We'll review your information and contact you within 24 hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#00A8A8] mt-1">✓</span>
                        <span>Our CPA will verify your eligibility and calculate your exact credit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#00A8A8] mt-1">✓</span>
                        <span>We'll prepare and file all paperwork with the IRS</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#00A8A8] mt-1">✓</span>
                        <span>You receive your refund in 4-8 weeks</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-sm text-gray-600 mb-6">
                    This is an estimate. Actual credit amount will be determined after a full review of your payroll records.
                  </p>

                  <button
                    onClick={resetForm}
                    className="bg-[#0A1E3F] hover:bg-[#0d2749] text-white px-6 py-3 rounded-lg font-semibold transition-all"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}