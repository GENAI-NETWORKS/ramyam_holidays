import { Phone, MapPin, Zap, Instagram, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { SITE_CONFIG } from '../data/siteConfig';

const CONTACT_DETAILS = [
  {
    icon: MapPin,
    title: 'Office Address',
    content: [
      '92, Ellaithottam Road',
      'Peelamedu, Coimbatore',
      'Tamil Nadu 641004, India',
    ],
    link: 'https://maps.google.com/?q=Peelamedu,+Coimbatore,+Tamil+Nadu+641004',
    linkLabel: 'Get Directions',
  },
  {
    icon: Phone,
    title: 'Phone Numbers',
    content: SITE_CONFIG.business.phonesFormatted,
    links: SITE_CONFIG.business.phones.map((p, i) => ({
      href: `tel:${p}`,
      label: SITE_CONFIG.business.phonesFormatted[i],
    })),
    link: `tel:${SITE_CONFIG.business.phones[0]}`,
    linkLabel: 'Call Directly',
  },
  {
    icon: Zap,
    title: '24 / 7 Available',
    content: ['Always here for you — day or night,', 'no off-hours, no wait.'],
    statusLabel: 'Available 24 × 7',
  },
];

const ContactPage = () => {
  const { business } = SITE_CONFIG;

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'LocalBusiness'],
    name: business.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.stateCode,
      postalCode: business.address.postalCode,
      addressCountry: business.address.countryCode,
    },
    telephone: business.phones,
    email: business.email,
    openingHours: business.openingHours,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    url: SITE_CONFIG.url,
    priceRange: business.priceRange,
    areaServed: business.areaServed,
  };

  return (
    <>
      <SEO
        title="Contact Ramyam Holidays | Travel Agency in Peelamedu, Coimbatore"
        description="Contact Ramyam Holidays at +91 86680 98039 — available 24/7. Visit our office at 92, Ellaithottam Road, Peelamedu, Coimbatore 641004."
        canonicalPath="/contact"
        breadcrumbs={[{ name: 'Contact', path: '/contact' }]}
        structuredData={localBusinessSchema}
        keywords="contact Ramyam Holidays, travel agency Peelamedu Coimbatore, travel agent contact number Coimbatore"
      />

      <main id="main-content">
        {/* Hero */}
        <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary-800 to-primary-600 overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden="true" />
          <div className="container-site relative z-10">
            <Breadcrumbs items={[{ label: 'Contact', path: '/contact' }]} />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <h1 className="text-white font-bold text-4xl md:text-5xl mb-4">Contact Us</h1>
              <p className="text-primary-200 text-lg max-w-xl">
                Talk to our travel experts anytime — we are available 24 × 7, every day, to help you plan the perfect trip.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact & Location Section */}
        <section className="section bg-neutral-50/50">
          <div className="container-site">
            {/* 1. Header */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 block mb-1">
                Direct Contact
              </span>
              <h2 className="text-3xl font-bold text-neutral-800 mb-2">Get in Touch</h2>
              <p className="text-neutral-600 text-base">
                Reach out to us directly through phone, WhatsApp, or visit our office in Peelamedu, Coimbatore.
              </p>
            </div>

            {/* 2. Three boxes in the SAME ROW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {CONTACT_DETAILS.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  className="bg-white rounded-2xl shadow-card p-5 border border-neutral-100 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center mb-3.5">
                      <item.icon size={22} className="text-primary-700" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-neutral-800 text-base mb-2">{item.title}</h3>
                    {item.links ? (
                      <div className="space-y-1">
                        {item.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            className="block text-primary-700 font-semibold hover:text-primary-900 text-sm transition-colors"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-0.5">
                        {item.content.map((line) => (
                          <p key={line} className="text-neutral-600 text-sm leading-snug">{line}</p>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-neutral-100">
                    {item.link ? (
                      <a
                        href={item.link}
                        target={item.link.startsWith('http') ? '_blank' : undefined}
                        rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-primary-700 text-xs sm:text-sm font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        {item.linkLabel || 'View details'} &rarr;
                      </a>
                    ) : (
                      <span className="text-emerald-600 text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        {item.statusLabel || 'Open for Inquiries'}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 3. Side-by-Side: Left Side Components vs Right Side Map (Equal Height) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* LEFT SIDE COMPONENTS: Ready to Plan Your Trip & Office Info */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="lg:col-span-6 flex flex-col justify-between bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white rounded-3xl p-6 sm:p-8 shadow-card border border-primary-600/30"
              >
                <div>
                  <span className="badge bg-white/15 text-primary-100 text-xs uppercase tracking-wider mb-3 inline-block backdrop-blur-sm">
                    Personalized Planning
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight">
                    Ready to Plan Your Trip?
                  </h3>
                  <p className="text-primary-100 text-sm sm:text-base leading-relaxed mb-6">
                    Call our Coimbatore travel specialists now or send a message on WhatsApp for instant assistance, customized itineraries, and the best rates.
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-3 pt-2 mb-6 border-t border-white/10 text-xs sm:text-sm text-primary-100">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">✓</span>
                      <span>1-on-1 personalized holiday consultation</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">✓</span>
                      <span>Best price guarantee with zero hidden charges</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">✓</span>
                      <span>24/7 dedicated support before, during & after travel</span>
                    </div>
                  </div>
                </div>

                {/* Call & WhatsApp Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/15">
                  <a
                    href={`tel:${business.phones[0]}`}
                    className="btn bg-white text-primary-800 hover:bg-neutral-100 w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md transition-all"
                    aria-label={`Call ${business.phonesFormatted[0]}`}
                  >
                    <Phone size={15} className="mr-2" aria-hidden="true" />
                    Call {business.phonesFormatted[0]}
                  </a>
                  <a
                    href={`https://wa.me/${business.whatsapp}?text=Hello%20Ramyam%20Holidays%2C%20I%20would%20like%20to%20enquire%20about%20a%20tour%20package.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn bg-[#25D366] hover:bg-[#20bd5a] text-white w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md transition-all"
                  >
                    <WhatsAppIcon size={16} className="w-4 h-4 mr-2 text-white" />
                    WhatsApp Us
                  </a>
                </div>

                {/* Social media connections */}
                <div className="flex flex-wrap items-center gap-2 pt-3 mt-1 text-xs text-primary-200">
                  <span className="font-medium mr-1 text-white/90">Follow Us:</span>
                  <a
                    href={SITE_CONFIG.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-all hover:scale-105"
                    aria-label="Follow Ramyam Holidays on Instagram"
                  >
                    <Instagram size={14} className="text-pink-300" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={SITE_CONFIG.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-all hover:scale-105"
                    aria-label="Follow Ramyam Holidays on Facebook"
                  >
                    <Facebook size={14} className="text-blue-300" />
                    <span>Facebook</span>
                  </a>
                </div>
              </motion.div>

              {/* RIGHT SIDE: Map with Height Exactly Equal to Left Side Components */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="lg:col-span-6 bg-white rounded-3xl p-4 sm:p-5 shadow-card border border-neutral-100 flex flex-col justify-between"
              >
                <div className="mb-3 px-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary-600 block mb-0.5">
                    Our Location
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-800">
                    Find Us in Peelamedu, Coimbatore
                  </h3>
                  <p className="text-neutral-500 text-xs sm:text-sm mt-0.5">
                    92, Ellaithottam Road, Peelamedu, Coimbatore
                  </p>
                </div>

                {/* Map iframe taking remaining full height */}
                <div className="rounded-2xl overflow-hidden border border-neutral-200 relative flex-1 min-h-[280px]">
                  <iframe
                    title="Ramyam Holidays office location: Peelamedu, Coimbatore"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.4956!2d76.9558!3d11.0168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAxJzAwLjUiTiA3NsKwNTcnMjAuOSJF!5e0!3m2!1sen!2sin!4v1"
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    aria-label="Google Map showing Peelamedu, Coimbatore, location of Ramyam Holidays office"
                  />
                </div>

                {/* NAP address bar below map */}
                <div className="mt-3.5 px-2 py-1 text-center text-xs sm:text-sm text-neutral-500 border-t border-neutral-100">
                  <address className="not-italic leading-relaxed">
                    <strong className="text-neutral-800">Ramyam Holidays</strong> |{' '}
                    {business.address.street}, {business.address.locality}, {business.address.city},{' '}
                    {business.address.state} {business.address.postalCode} |{' '}
                    <a href={`tel:${business.phones[0]}`} className="text-primary-600 font-medium hover:underline">
                      {business.phonesFormatted[0]}
                    </a>
                  </address>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Area served */}
        <section className="section-sm bg-primary-900">
          <div className="container-site text-center">
            <h2 className="text-white font-bold text-xl mb-3">Areas We Serve</h2>
            <p className="text-primary-300 text-sm max-w-3xl mx-auto leading-relaxed">
              Ramyam Holidays provides travel services to clients across{' '}
              {business.areaServed.join(', ')}.
              Whether you are in Coimbatore city or nearby towns, we are just a call away.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default ContactPage;
