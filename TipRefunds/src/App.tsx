import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { QuickEstimateForm } from './components/QuickEstimateForm';
import { IndustryCarousel } from './components/IndustryCarousel';
import { UnderstandingSection } from './components/UnderstandingSection';
import { ExplainerSection } from './components/ExplainerSection';
import { EligibilitySection } from './components/EligibilitySection';
import { HowItWorks } from './components/HowItWorks';
import { SuccessStories } from './components/SuccessStories';
import { WhyChoose } from './components/WhyChoose';
import { Guarantee } from './components/Guarantee';
import { ReadyToClaimSection } from './components/ReadyToClaimSection';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { RobotWaiterScene } from './components/RobotWaiterScene';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { AdminDashboard } from './pages/AdminDashboard';
import { TermsOfUse } from './components/TermsOfUse';

function HomePage() {
  return (
    <>
      <div className="pt-20">
        <Hero />
        <QuickEstimateForm />
        <UnderstandingSection />
        <IndustryCarousel />
        <ExplainerSection />
        <EligibilitySection />

        {/* Interactive Robot Waiter Section */}
        <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-stretch">
              {/* Left Side - Content */}
              <div className="flex flex-col justify-center space-y-6 min-h-[400px]">
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                  You Gave the Tip,<br />
                  <span className="text-blue-600">We'll Get Your Refund</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Just like this robot waiter collects every tip, we collect every penny you're owed from the IRS. Watch how simple it is — click the button and see your refund add up!
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Instant Processing</h3>
                      <p className="text-slate-600">Your refund claim is processed automatically</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">100% Secure</h3>
                      <p className="text-slate-600">Your data is protected with bank-level encryption</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Maximum Refund</h3>
                      <p className="text-slate-600">We ensure you get every dollar you deserve</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Robot Animation */}
              <div className="flex items-center justify-center min-h-[400px]">
                <RobotWaiterScene />
              </div>
            </div>
          </div>
        </section>

        <div id="how-it-works">
          <HowItWorks />
        </div>
        <SuccessStories />
        <div id="benefits">
          <WhyChoose />
        </div>
        <Guarantee />
        <ReadyToClaimSection />
        <Testimonials />
        <div id="faq">
          <FAQ />
        </div>
        <FinalCTA />
      </div>
    </>
  );
}

function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
