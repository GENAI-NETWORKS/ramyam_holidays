import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { SITE_CONFIG } from '../data/siteConfig';

const PrivacyPolicyPage = () => (
  <>
    <SEO
      title="Privacy Policy | Ramyam Holidays"
      description="Privacy Policy of Ramyam Holidays, travel agency in Coimbatore. Learn how we collect, use, and protect your personal information."
      canonicalPath="/privacy-policy"
      breadcrumbs={[{ name: 'Privacy Policy', path: '/privacy-policy' }]}
    />
    <main id="main-content" className="pt-32 pb-20">
      <div className="container-site max-w-3xl">
        <Breadcrumbs items={[{ label: 'Privacy Policy', path: '/privacy-policy' }]} lightBg />
        <h1 className="text-3xl font-bold text-neutral-900 mt-6 mb-8">Privacy Policy</h1>

        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-600">
          <p className="text-sm text-neutral-400">
            Last updated: 1 January 2025
          </p>

          <section>
            <h2 className="text-xl font-bold text-neutral-800">1. Information We Collect</h2>
            <p>
              When you submit an enquiry through our website, contact us by phone, WhatsApp, or email,
              or book a tour package, we collect personal information including your name, email address,
              phone number, and travel preferences. We may also collect browser and device information
              automatically when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-800">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Respond to your enquiries and provide travel services</li>
              <li>Send booking confirmations and itinerary details</li>
              <li>Process visa applications and travel document submissions</li>
              <li>Improve our website and services</li>
              <li>Send promotional content (only if you have opted in)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-800">3. Data Sharing</h2>
            <p>
              We do not sell, rent, or trade your personal information to third parties. We may share
              your information with hotels, airlines, and visa processing authorities only as necessary
              to fulfil your travel booking.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-800">4. Data Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your personal
              information against unauthorised access, alteration, disclosure, or destruction. Our
              website uses HTTPS encryption for all data transmission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-800">5. Cookies</h2>
            <p>
              Our website uses cookies to improve your browsing experience. You can disable cookies in
              your browser settings, though some features of the website may not function correctly without them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-800">6. Your Rights</h2>
            <p>
              You have the right to access, correct, or request deletion of your personal data.
              To exercise these rights, contact us at{' '}
              <a href={`mailto:${SITE_CONFIG.business.email}`} className="text-primary-700">
                {SITE_CONFIG.business.email}
              </a>{' '}
              or call{' '}
              <a href={`tel:${SITE_CONFIG.business.phones[0]}`} className="text-primary-700">
                {SITE_CONFIG.business.phonesFormatted[0]}
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-800">7. Contact</h2>
            <p>
              For any privacy-related queries, contact Ramyam Holidays:<br />
              92, Ellaithottam Road, Peelamedu, Coimbatore, Tamil Nadu 641004<br />
              Phone: {SITE_CONFIG.business.phonesFormatted[0]}<br />
              Email: {SITE_CONFIG.business.email}
            </p>
          </section>
        </div>
      </div>
    </main>
  </>
);

const TermsPage = () => (
  <>
    <SEO
      title="Terms of Service | Ramyam Holidays"
      description="Terms of Service for Ramyam Holidays travel agency in Coimbatore. Read our booking terms, cancellation policy, and conditions of travel."
      canonicalPath="/terms"
      breadcrumbs={[{ name: 'Terms', path: '/terms' }]}
    />
    <main id="main-content" className="pt-32 pb-20">
      <div className="container-site max-w-3xl">
        <Breadcrumbs items={[{ label: 'Terms of Service', path: '/terms' }]} lightBg />
        <h1 className="text-3xl font-bold text-neutral-900 mt-6 mb-8">Terms of Service</h1>

        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-600">
          <p className="text-sm text-neutral-400">Last updated: 1 January 2025</p>

          <section>
            <h2 className="text-xl font-bold text-neutral-800">1. Agreement</h2>
            <p>
              By using the Ramyam Holidays website or engaging our services, you agree to be bound
              by these Terms of Service. Ramyam Holidays is operated by N. Rathinakumar, located at
              92, Ellaithottam Road, Peelamedu, Coimbatore, Tamil Nadu 641004.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-800">2. Booking and Payments</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>All bookings are confirmed only upon receipt of a deposit as specified in your quotation.</li>
              <li>Prices quoted are subject to availability and may change until a booking is confirmed.</li>
              <li>Full payment must be made before departure as per the schedule in your booking confirmation.</li>
              <li>Prices are subject to changes in airline fares, hotel rates, fuel surcharges, and government taxes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-800">3. Cancellation Policy</h2>
            <p>Cancellation charges apply as follows (from date of departure):</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>More than 30 days: 10% of package cost</li>
              <li>15–30 days: 25% of package cost</li>
              <li>7–14 days: 50% of package cost</li>
              <li>0–6 days: 100% of package cost (no refund)</li>
            </ul>
            <p>
              Cancellation charges for flights, hotels, and third-party services are subject to those
              providers' policies and may be in addition to the above.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-800">4. Our Liability</h2>
            <p>
              Ramyam Holidays acts as an agent for airlines, hotels, transportation companies, and
              tour operators. We are not liable for any loss, damage, or injury arising from events
              beyond our control including but not limited to weather conditions, strikes, natural
              disasters, or government actions. We strongly recommend travel insurance for all trips.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-800">5. Visa and Documentation</h2>
            <p>
              While we assist with visa applications, approval is at the sole discretion of the
              relevant government authority. Ramyam Holidays does not guarantee visa approval.
              Clients are responsible for ensuring their travel documents are valid and in order.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-800">6. Governing Law</h2>
            <p>
              These Terms are governed by the laws of India. Any disputes shall be subject to the
              jurisdiction of courts in Coimbatore, Tamil Nadu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-800">7. Contact</h2>
            <p>
              For queries regarding these Terms, contact us at{' '}
              <a href={`tel:${SITE_CONFIG.business.phones[0]}`} className="text-primary-700">
                {SITE_CONFIG.business.phonesFormatted[0]}
              </a>{' '}
              or{' '}
              <a href={`mailto:${SITE_CONFIG.business.email}`} className="text-primary-700">
                {SITE_CONFIG.business.email}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  </>
);

export { PrivacyPolicyPage, TermsPage };
