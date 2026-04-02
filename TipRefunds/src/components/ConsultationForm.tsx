import { useState, useEffect } from 'react';
import { Calendar, X, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ConsultationFormData {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

interface ConsultationFormProps {
  buttonClassName?: string;
  buttonText?: string;
}

interface FormErrors {
  email?: string;
  phone?: string;
}

// Validation functions
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidUSPhone = (phone: string): boolean => {
  // Remove all non-numeric characters except plus sign at the beginning
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it's a valid US phone number (10 or 11 digits with optional country code)
  const phoneRegex = /^(?:\+?1)?\d{10}$/;
  return phoneRegex.test(cleaned);
};

const formatPhoneNumber = (value: string): string => {
  // Remove all non-numeric characters
  const numbers = value.replace(/\D/g, '');
  
  // If empty, return empty string
  if (numbers.length === 0) return '';
  
  // Limit to 10 digits (US phone number without country code)
  const limited = numbers.slice(0, 10);
  
  // Format based on length
  if (limited.length <= 3) {
    return `(${limited}`;
  } else if (limited.length <= 6) {
    return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
  } else {
    return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6, 10)}`;
  }
};

export function ConsultationForm({
  buttonClassName = 'inline-flex items-center gap-2',
  buttonText = 'Schedule a Free Consultation'
}: ConsultationFormProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
  });

  const timeSlots = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
  ];

  // Validate form fields
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
      
      default:
        return undefined;
    }
  };

  // Validate entire form
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    // Validate email
    const emailError = validateField('email', formData.email);
    if (emailError) errors.email = emailError;
    
    // Validate phone
    const phoneError = validateField('phone', formData.phone);
    if (phoneError) errors.phone = phoneError;
    
    // Check required fields
    if (!formData.name.trim()) {
      // Name validation
    }
    if (!formData.businessName.trim()) {
      // Business name validation
    }
    if (!formData.preferredDate) {
      // Date validation
    }
    if (!formData.preferredTime) {
      // Time validation
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
    const allFields = ['name', 'businessName', 'email', 'phone', 'preferredDate', 'preferredTime'];
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
      const scheduleResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/schedule/free/consultation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            type: 'consultation',
            data: {
              name: formData.name,
              business_name: formData.businessName,
              email: formData.email,
              phone: formData.phone,
              preferred_date: formData.preferredDate,
              preferred_time: formData.preferredTime,
              message: formData.message,
            },
          }),
        }
      );

      if (!scheduleResponse.ok) {
        console.error('Failed to send email notification');
      }

      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Consultation Request',
          content_category: 'Consultation',
          value: 0,
          currency: 'USD'
        });
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting consultation request:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      businessName: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      message: '',
    });
    setFormErrors({});
    setTouchedFields(new Set());
    setIsSubmitted(false);
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

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={buttonClassName}
      >
        <Calendar className="w-5 h-5" />
        {buttonText}
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
          aria-labelledby="consultation-title"
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full my-8 shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-[#0A1E3F] to-[#0d2749] text-white p-4 sm:p-6 rounded-t-2xl flex items-center justify-between z-10">
              <div className="flex-1 pr-4">
                <h2 id="consultation-title" className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">Schedule Your Free Consultation</h2>
                <p className="text-sm sm:text-base text-gray-300 hidden sm:block">
                  Speak with a FICA Tip Credit specialist
                </p>
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
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-[#0A1E3F] mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8A8] focus:border-transparent outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>

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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-[#0A1E3F] mb-2">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        min={getTomorrowDate()}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8A8] focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-[#0A1E3F] mb-2">
                        Preferred Time *
                      </label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8A8] focus:border-transparent outline-none transition-all"
                      >
                        <option value="">Select a time slot</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#0A1E3F] mb-2">
                      Additional Information (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8A8] focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Tell us about your business or any specific questions you have..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#00A8A8] hover:bg-[#008a8a] text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      'Submitting...'
                    ) : (
                      <>
                        <Calendar className="w-5 h-5" />
                        Schedule My Consultation
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form, you agree to be contacted by Tip Refunds regarding your consultation.
                  </p>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#00A8A8] to-[#008a8a] rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-[#0A1E3F] mb-4">
                    Consultation Request Received!
                  </h3>

                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Thank you for your interest in claiming your FICA Tip Credit. One of our
                    specialists will contact you within 24 hours to confirm your consultation
                    appointment.
                  </p>

                  <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
                    <h4 className="font-bold text-[#0A1E3F] mb-3">
                      What to Expect:
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-[#00A8A8] mt-1">✓</span>
                        <span>You'll receive a confirmation email shortly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#00A8A8] mt-1">✓</span>
                        <span>A specialist will call to confirm your appointment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#00A8A8] mt-1">✓</span>
                        <span>We'll review your eligibility and answer all questions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#00A8A8] mt-1">✓</span>
                        <span>No obligations - completely free consultation</span>
                      </li>
                    </ul>
                  </div>

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