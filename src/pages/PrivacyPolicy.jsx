import React from "react";
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gradient-to-b from-white to-[#faf9f6] text-gray-800 px-6 md:px-12 lg:px-24 py-16 leading-relaxed">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl trajan font-bold text-gray-800 tracking-wide text-center">
            Bonntonn Gifting Gourmet Studio Privacy Policy
          </h1>
          <div className="w-32 h-1 bg-[#BD9153] rounded-full mt-4 mx-auto"></div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm text-gray-600 mb-12 text-center times italic bg-white/90 p-6 rounded-xl shadow-md border border-[#BD9153]/10 backdrop-blur-sm"
        >
          Our Commitment To Your Privacy: At Bonntonn Gifting Gourmet Studio
          ("Company," "we," "us," or "our"), we take your privacy and
          information seriously. Please read through this policy to know how we
          collect, use, and safeguard your information.
        </motion.p>

        <div className="space-y-12">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/90 rounded-3xl shadow-xl border border-[#BD9153]/10 backdrop-blur-sm p-6"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-[#BD9153] mb-4 trajan">1. Information We Collect & Why</h2>
            <p className="mb-4 times text-gray-700">We may collect the following types of information:</p>
            <ul className="list-disc list-inside ml-4 space-y-3 times text-gray-600 italic">
              <li>Personal Information: Name, Address, Email Address, Phone Number.</li>
              <li>Technical Information: IP Address, Browser Type, Cookies, and Tracking Technologies.</li>
              <li>Browsing Data: Location, Pages Visited, Traffic Sources, and Device Type.</li>
              <li>Order and Payment Information for Transactions.</li>
            </ul>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white/90 rounded-3xl shadow-xl border border-[#BD9153]/10 backdrop-blur-sm p-6"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-[#BD9153] mb-4 trajan">2. How We Collect Information</h2>
            <ul className="list-disc list-inside ml-4 space-y-3 times text-gray-600 italic">
              <li>Voluntary registration on our website.</li>
              <li>Tracking cookies and similar technologies.</li>
              <li>Analytics and data collected from tools like cookies.</li>
            </ul>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white/90 rounded-3xl shadow-xl border border-[#BD9153]/10 backdrop-blur-sm p-6"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-[#BD9153] mb-4 trajan">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside ml-4 space-y-3 times text-gray-600 italic">
              <li>Order fulfillment, processing, and delivery.</li>
              <li>Customer communication to inform about updates or promotions.</li>
              <li>Improving the website experience and providing personalized services.</li>
              <li>Marketing purposes with user consent.</li>
              <li>Fraud detection, prevention, and legal compliance.</li>
            </ul>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="bg-white/90 rounded-3xl shadow-xl border border-[#BD9153]/10 backdrop-blur-sm p-6"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-[#BD9153] mb-4 trajan">4. Information Sharing</h2>
            <p className="mb-4 times text-gray-700">We do not sell or rent your personal information. We may share your data:</p>
            <ul className="list-disc list-inside ml-4 space-y-3 times text-gray-600 italic">
              <li>With third-party service providers for operational purposes.</li>
              <li>To comply with legal requests or law enforcement.</li>
              <li>With corporate partners for enhanced services.</li>
              <li>With consent, for marketing or promotional purposes.</li>
            </ul>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="bg-white/90 rounded-3xl shadow-xl border border-[#BD9153]/10 backdrop-blur-sm p-6"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-[#BD9153] mb-4 trajan">5. Your Rights and Choices</h2>
            <ul className="list-disc list-inside ml-4 space-y-3 times text-gray-600 italic">
              <li>Opt-out of marketing communications anytime.</li>
              <li>Manage cookie preferences through browser settings.</li>
              <li>Request access, updates, or deletion of your personal data.</li>
            </ul>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="bg-white/90 rounded-3xl shadow-xl border border-[#BD9153]/10 backdrop-blur-sm p-6"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-[#BD9153] mb-4 trajan">6. Indian Residents' Rights under DPDPA 2023</h2>
            <p className="mb-4 times text-gray-700">Indian residents may exercise rights under the Digital Personal Data Protection Act 2023 (DPDPA). These include:</p>
            <ul className="list-disc list-inside ml-4 space-y-3 times text-gray-600 italic">
              <li>Request for data access and corrections.</li>
              <li>Right to restrict or object to data processing.</li>
              <li>Right to data deletion, subject to legal obligations.</li>
            </ul>
          </motion.section>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-sm text-gray-600 text-center mt-12 times italic"
        >
          If you have questions about our Privacy Policy, please contact us at{' '}
          <span className="text-[#BD9153] font-semibold">info@bonntonn.com</span>.
        </motion.p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;