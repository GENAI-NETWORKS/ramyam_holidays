import { useParams, Link, Navigate } from 'react-router-dom';
import { Phone, CheckCircle, XCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import EnquiryForm from '../components/EnquiryForm';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { getServiceBySlug } from '../data/services';
import { SITE_CONFIG } from '../data/siteConfig';

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) return <Navigate to="/services" replace />;

  const Icon = LucideIcons[service.icon] || LucideIcons.Star;
  const breadcrumbs = [
    { name: 'Services', path: '/services' },
    { name: service.name, path: `/services/${slug}` },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    provider: {
      '@type': 'TravelAgency',
      name: SITE_CONFIG.business.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE_CONFIG.business.address.street,
        addressLocality: SITE_CONFIG.business.address.locality,
        addressRegion: SITE_CONFIG.business.address.stateCode,
        postalCode: SITE_CONFIG.business.address.postalCode,
        addressCountry: SITE_CONFIG.business.address.countryCode,
      },
      telephone: SITE_CONFIG.business.phones[0],
      url: SITE_CONFIG.url,
    },
    description: service.description,
    areaServed: SITE_CONFIG.business.areaServed,
  };

  return (
    <>
      <SEO
        title={`${service.name} in Coimbatore | Ramyam Holidays`}
        description={`${service.shortDescription} Contact Ramyam Holidays in Coimbatore at +91 86680 98039 for ${service.name.toLowerCase()}.`}
        canonicalPath={`/services/${slug}`}
        breadcrumbs={breadcrumbs}
        structuredData={structuredData}
      />

      <main id="main-content">
        {/* Hero */}
        <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary-800 to-primary-600 overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden="true" />
          <div className="container-site relative z-10">
            <Breadcrumbs items={[
              { label: 'Services', path: '/services' },
              { label: service.name, path: `/services/${slug}` },
            ]} />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 flex items-start gap-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <Icon size={30} className="text-white" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-white font-bold text-3xl md:text-4xl mb-2">{service.name}</h1>
                <p className="text-primary-200 text-lg">{service.shortDescription}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content + Enquiry */}
        <section className="section">
          <div className="container-site">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main content */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h2 className="text-2xl font-bold text-neutral-800 mb-4">
                    About This Service
                  </h2>
                  <div className="prose prose-neutral max-w-none">
                    <p className="text-neutral-600 leading-relaxed text-base">{service.description}</p>
                  </div>

                  {/* Destinations covered */}
                  {service.destinations && (
                    <div className="mt-8">
                      <h3 className="font-bold text-neutral-800 mb-3">Destinations / Coverage</h3>
                      <div className="flex flex-wrap gap-2">
                        {service.destinations.map((dest) => (
                          <span key={dest} className="badge badge-primary">
                            {dest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Why book this service with us */}
                  <div className="mt-8 bg-primary-50 rounded-3xl p-6">
                    <h3 className="font-bold text-neutral-800 mb-4">Why Book With Ramyam Holidays?</h3>
                    <div className="space-y-3">
                      {[
                        'Personalised service, not a call centre, but real experts',
                        'Transparent pricing with no hidden charges',
                        '15+ years of experience in the travel industry',
                        'Local office in Coimbatore, you can walk in anytime',
                        '24/7 support during your travel',
                        'GST billing available for corporate clients',
                      ].map((point) => (
                        <div key={point} className="flex items-start gap-3">
                          <CheckCircle size={16} className="text-primary-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-neutral-600 text-sm">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact bar */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    {SITE_CONFIG.business.phones.map((phone, i) => (
                      <a
                        key={phone}
                        href={`tel:${phone}`}
                        className="btn btn-primary w-fit inline-flex px-5 py-2.5 rounded-xl text-sm justify-center"
                        aria-label={`Call ${SITE_CONFIG.business.phonesFormatted[i]}`}
                      >
                        <Phone size={16} aria-hidden="true" />
                        {SITE_CONFIG.business.phonesFormatted[i]}
                      </a>
                    ))}
                    <a
                      href={`https://wa.me/${SITE_CONFIG.business.whatsapp}?text=Hello%20Ramyam%20Holidays%2C%20I%20want%20to%20know%20more%20about%20${encodeURIComponent(service.name)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn bg-[#25D366] hover:bg-[#20bd5a] text-white w-fit inline-flex px-5 py-2.5 rounded-xl text-sm justify-center"
                    >
                      <WhatsAppIcon size={18} className="w-5 h-5 text-white" />
                      WhatsApp
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Enquiry form sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="sticky top-24 bg-white rounded-3xl shadow-card p-6 border border-neutral-100"
                >
                  <h3 className="font-bold text-neutral-800 mb-1">Get a Free Quote</h3>
                  <p className="text-xs text-neutral-500 mb-5">
                    Fill in your details and we will respond within 24 hours.
                  </p>
                  <EnquiryForm compact defaultDestination={service.name} />
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ServiceDetailPage;
