import { useParams, Link, Navigate } from 'react-router-dom';
import { Clock, Star, MapPin, Calendar, Users, CheckCircle, XCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import EnquiryForm from '../components/EnquiryForm';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { getDestinationBySlug } from '../data/destinations';
import { SITE_CONFIG } from '../data/siteConfig';

const DestinationDetailPage = () => {
  const { slug } = useParams();
  const destination = getDestinationBySlug(slug);

  if (!destination) return <Navigate to="/destinations" replace />;

  const {
    name, tagline, region, image, imageAlt, rating, reviewCount,
    startingPrice, duration, bestTime, highlights, itinerary,
    inclusions, exclusions, description, metaTitle, metaDescription, keywords,
  } = destination;

  const breadcrumbs = [
    { name: 'Destinations', path: '/destinations' },
    { name, path: `/destinations/${slug}` },
  ];

  const touristTripSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: `${name} Tour Package from Coimbatore`,
    description,
    image: `${SITE_CONFIG.url}${image}`,
    touristType: ['Family', 'Couple'],
    offers: {
      '@type': 'Offer',
      price: startingPrice,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString().split('T')[0],
      seller: {
        '@type': 'TravelAgency',
        name: SITE_CONFIG.business.name,
        telephone: SITE_CONFIG.business.phones[0],
      },
    },
    itinerary: itinerary?.map((day) => ({
      '@type': 'TouristAttraction',
      name: day.title,
      description: day.description,
    })),
  };

  return (
    <>
      <SEO
        title={metaTitle || `${name} Tour Package from Coimbatore | Ramyam Holidays`}
        description={metaDescription}
        canonicalPath={`/destinations/${slug}`}
        breadcrumbs={breadcrumbs}
        structuredData={touristTripSchema}
        ogImage={`${SITE_CONFIG.url}${image}`}
        keywords={keywords?.join(', ')}
      />

      <main id="main-content">
        {/* Hero */}
        <section className="relative pt-24 overflow-hidden" style={{ minHeight: '60vh' }}>
          <div className="absolute inset-0 z-0">
            <img
              src={image}
              alt={imageAlt}
              className="w-full h-full object-cover"
              width={1200}
              height={600}
              fetchpriority="high"
            />
            <div className="hero-overlay absolute inset-0" aria-hidden="true" />
          </div>

          <div className="container-site relative z-10 py-20">
            <Breadcrumbs items={[
              { label: 'Destinations', path: '/destinations' },
              { label: name, path: `/destinations/${slug}` },
            ]} />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 max-w-2xl"
            >
              <span className="badge bg-white/20 text-white border-white/30 text-xs mb-3">
                {region}
              </span>
              <h1 className="text-white font-bold text-4xl md:text-5xl mb-2">{name}</h1>
              <p className="text-white/85 text-xl mb-5">{tagline}</p>

              <div className="flex flex-wrap gap-4 text-sm text-white/85">
                <div className="flex items-center gap-1.5">
                  <Star size={14} className="text-amber-400 fill-amber-400" aria-hidden="true" />
                  <span className="font-semibold text-white">{rating}</span>
                  <span>({reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} aria-hidden="true" />
                  <span>{duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} aria-hidden="true" />
                  <span>Best: {bestTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main content */}
        <section className="section">
          <div className="container-site">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Left: Content */}
              <div className="lg:col-span-2 space-y-10">
                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h2 className="text-2xl font-bold text-neutral-800 mb-4">About {name}</h2>
                  <p className="text-neutral-600 leading-relaxed text-justify">{description}</p>
                </motion.div>

                {/* Highlights */}
                <div>
                  <h2 className="text-xl font-bold text-neutral-800 mb-4">Destination Highlights</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {highlights.map((h) => (
                      <div key={h} className="flex items-center gap-3 bg-primary-50 rounded-xl px-4 py-3">
                        <MapPin size={14} className="text-primary-600 flex-shrink-0" aria-hidden="true" />
                        <span className="text-sm font-medium text-neutral-700">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Itinerary */}
                {itinerary?.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-neutral-800 mb-5">Suggested Itinerary</h2>
                    <div className="space-y-4">
                      {itinerary.map((day, i) => (
                        <motion.div
                          key={day.day}
                          initial={{ opacity: 0, x: -16 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: i * 0.07 }}
                          className="flex gap-4"
                        >
                          <div className="flex flex-col items-center flex-shrink-0">
                            <div className="w-9 h-9 rounded-full bg-primary-700 text-white text-xs font-bold flex items-center justify-center">
                              D{day.day}
                            </div>
                            {i < itinerary.length - 1 && (
                              <div className="w-0.5 flex-1 bg-primary-100 mt-1" aria-hidden="true" />
                            )}
                          </div>
                          <div className="pb-4">
                            <h3 className="font-bold text-neutral-800 text-sm mb-1">{day.title}</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">{day.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inclusions / Exclusions */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-lg font-bold text-neutral-800 mb-3 flex items-center gap-2">
                      <CheckCircle size={18} className="text-green-600" aria-hidden="true" />
                      What's Included
                    </h2>
                    <ul className="space-y-2">
                      {inclusions.map((inc) => (
                        <li key={inc} className="flex items-start gap-2">
                          <CheckCircle size={14} className="text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-neutral-600 text-sm">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-neutral-800 mb-3 flex items-center gap-2">
                      <XCircle size={18} className="text-red-400" aria-hidden="true" />
                      What's Not Included
                    </h2>
                    <ul className="space-y-2">
                      {exclusions.map((exc) => (
                        <li key={exc} className="flex items-start gap-2">
                          <XCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-neutral-600 text-sm">{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right: Booking card */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-4">
                  {/* Price card */}
                  <div className="bg-white rounded-3xl shadow-card p-6 border border-neutral-100">
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-3xl font-bold text-primary-700">
                        ₹{startingPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-neutral-400 text-sm">/person onwards</span>
                    </div>
                    <div className="flex items-center gap-1 mb-5">
                      <Star size={13} className="text-amber-500 fill-amber-500" aria-hidden="true" />
                      <span className="text-sm font-semibold text-neutral-700">{rating}</span>
                      <span className="text-sm text-neutral-400">({reviewCount} reviews)</span>
                    </div>
                    <div className="flex flex-col items-center gap-2.5 mb-4">
                      {SITE_CONFIG.business.phones.map((phone, i) => (
                        <a
                          key={phone}
                          href={`tel:${phone}`}
                          className="btn btn-primary w-auto inline-flex items-center justify-center text-sm px-5 py-2 rounded-xl"
                        >
                          <Phone size={13} aria-hidden="true" />
                          <span>{SITE_CONFIG.business.phonesFormatted[i]}</span>
                        </a>
                      ))}
                      <a
                        href={`https://wa.me/${SITE_CONFIG.business.whatsapp}?text=Hello%20Ramyam%20Holidays%2C%20I%20am%20interested%20in%20a%20${encodeURIComponent(name)}%20tour%20package.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn bg-[#25D366] hover:bg-[#20bd5a] text-white w-auto inline-flex items-center justify-center text-sm px-5 py-2 rounded-xl"
                      >
                        <WhatsAppIcon size={18} className="w-5 h-5 text-white" />
                        <span>WhatsApp Enquiry</span>
                      </a>
                    </div>
                  </div>

                  {/* Enquiry form */}
                  <div className="bg-white rounded-3xl shadow-card p-6 border border-neutral-100">
                    <h3 className="font-bold text-neutral-800 mb-1 text-base">Send an Enquiry</h3>
                    <p className="text-xs text-neutral-500 mb-4">We respond within 24 hours.</p>
                    <EnquiryForm compact defaultDestination={name} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related links */}
        <section className="section-sm bg-neutral-50">
          <div className="container-site text-center">
            <h2 className="text-lg font-bold text-neutral-800 mb-4">
              Explore More from Ramyam Holidays
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/packages" className="btn btn-outline btn-sm">View All Packages</Link>
              <Link to="/destinations" className="btn btn-outline btn-sm">All Destinations</Link>
              <Link to="/contact" className="btn btn-primary btn-sm">Plan My Trip</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default DestinationDetailPage;
