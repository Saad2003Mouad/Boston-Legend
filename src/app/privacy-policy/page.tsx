import { BUSINESS_CONFIG } from "@/lib/config";

export const metadata = {
  title: "Privacy Policy | Boston Legend Ice Cream Truck",
  description: "Privacy policy and data handling practices for Boston Legend Ice Cream Truck.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 md:p-16 shadow-xl shadow-navy/5 border border-gray-100">
          <h1 className="font-display font-black text-4xl md:text-5xl text-navy mb-4">Privacy Policy</h1>
            <p className="text-gray-500 font-medium mb-10">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

            <div className="prose prose-lg prose-navy max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-navy mb-4">1. Information We Collect</h2>
                <p className="text-gray-600 leading-relaxed">
                  We collect information you provide directly to us when you request a quote, book an event, or contact us. This may include your name, email address, phone number, event details, and location data needed for distance calculations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-navy mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-600 leading-relaxed">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
                  <li>Provide, maintain, and improve our services.</li>
                  <li>Process your bookings and send related information, including confirmations and invoices.</li>
                  <li>Calculate travel distance and fees for our ice cream truck routes.</li>
                  <li>Send you technical notices, updates, security alerts, and support messages.</li>
                  <li>Respond to your comments, questions, and requests.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-navy mb-4">3. Data Sharing and Security</h2>
                <p className="text-gray-600 leading-relaxed">
                  We do not share your personal information with third parties except as necessary to provide our services (e.g., payment processors, email delivery services). We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-navy mb-4">4. Location Data</h2>
                <p className="text-gray-600 leading-relaxed">
                  When you use our location picker or "Locate Me" feature, we process this data strictly to calculate the distance from our HQ in {BUSINESS_CONFIG.address.city}, {BUSINESS_CONFIG.address.state} and determine accurate travel fees. This location data is not used for any other tracking purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-navy mb-4">5. Contact Us</h2>
                <p className="text-gray-600 leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at:
                  <br />
                  <br />
                  <strong>{BUSINESS_CONFIG.legalName}</strong><br />
                  {BUSINESS_CONFIG.address.street}<br />
                  {BUSINESS_CONFIG.address.city}, {BUSINESS_CONFIG.address.state} {BUSINESS_CONFIG.address.zip}<br />
                  Email: {BUSINESS_CONFIG.contact.email}<br />
                  Phone: {BUSINESS_CONFIG.contact.phone1}
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
  );
}
