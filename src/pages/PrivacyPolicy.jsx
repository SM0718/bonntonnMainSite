import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white text-gray-800 px-6 md:px-12 lg:px-24 py-10 leading-relaxed">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold text-start trajan text-purple-600 mb-8">
          Bonntonn Gifting Gourmet Studio Privacy Policy
        </h1>
        <p className="text-sm text-gray-600 mb-6 text-start times">
          Our Commitment To Your Privacy: At Bonntonn Gifting Gourmet Studio
          ("Company," "we," "us," or "our"), we take your privacy and
          information seriously. Please read through this policy to know how we
          collect, use, and safeguard your information.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-4 trajan">
            1. Information We Collect & Why
          </h2>
          <p className="mb-2">
            We may collect the following types of information:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2 times">
            <li>Personal Information: Name, Address, Email Address, Phone Number.</li>
            <li>
              Technical Information: IP Address, Browser Type, Cookies, and
              Tracking Technologies.
            </li>
            <li>
              Browsing Data: Location, Pages Visited, Traffic Sources, and Device
              Type.
            </li>
            <li>Order and Payment Information for Transactions.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-4 trajan">
            2. How We Collect Information
          </h2>
          <ul className="list-disc list-inside ml-4 space-y-2 times">
            <li>Voluntary registration on our website.</li>
            <li>Tracking cookies and similar technologies.</li>
            <li>Analytics and data collected from tools like cookies.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-4 trajan">
            3. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside ml-4 space-y-2 times">
            <li>Order fulfillment, processing, and delivery.</li>
            <li>Customer communication to inform about updates or promotions.</li>
            <li>Improving the website experience and providing personalized services.</li>
            <li>Marketing purposes with user consent.</li>
            <li>Fraud detection, prevention, and legal compliance.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-4 trajan">
            4. Information Sharing
          </h2>
          <p className="mb-2">
            We do not sell or rent your personal information. We may share your
            data:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2 times">
            <li>With third-party service providers for operational purposes.</li>
            <li>To comply with legal requests or law enforcement.</li>
            <li>With corporate partners for enhanced services.</li>
            <li>With consent, for marketing or promotional purposes.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-4 trajan">
            5. Your Rights and Choices
          </h2>
          <ul className="list-disc list-inside ml-4 space-y-2 times">
            <li>Opt-out of marketing communications anytime.</li>
            <li>Manage cookie preferences through browser settings.</li>
            <li>Request access, updates, or deletion of your personal data.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-4 trajan">
            6. Indian Residents' Rights under DPDPA 2023
          </h2>
          <p>
            Indian residents may exercise rights under the Digital Personal Data
            Protection Act 2023 (DPDPA). These include:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2 times">
            <li>Request for data access and corrections.</li>
            <li>Right to restrict or object to data processing.</li>
            <li>Right to data deletion, subject to legal obligations.</li>
          </ul>
        </section>

        <p className="text-sm text-gray-600 text-center mt-8 times">
          If you have questions about our Privacy Policy, please contact us at
          <span className="text-purple-700 font-semibold"> info@bonntonn.com</span>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
