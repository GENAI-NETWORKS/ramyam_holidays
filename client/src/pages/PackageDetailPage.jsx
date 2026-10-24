import { useParams, Link, Navigate } from 'react-router-dom';
import { Star, Clock, Users, CheckCircle, XCircle, Phone, Calendar, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { getPackageBySlug } from '../data/packages';
import { SITE_CONFIG } from '../data/siteConfig';

const PackageDetailPage = () => {
  const { slug } = useParams();
  const pkg = getPackageBySlug(slug);

  if (!pkg) return <Navigate to="/packages" replace />;

  const {
    name, destination, destinationSlug, type, image, imageAlt, duration, price,
    pricePerPerson, groupSize, rating, reviewCount, tags, inclusions,
    description, itinerarySummary, schema,
  } = pkg;

  const breadcrumbs = [
    { name: 'Packages', path: '/packages' },
    { name, path: `/packages/${slug}` },
  ];

  const touristTripSchema = {
    '@context': 'https://schema.org',
    ...schema,
    name,
    description,
    image: `${SITE_CONFIG.url}${image}`,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'TravelAgency',
        name: SITE_CONFIG.business.name,
        telephone: SITE_CONFIG.business.phones[0],
      },
    },
    duration,
    provider: {
      '@type': 'TravelAgency',
      name: SITE_CONFIG.business.name,
      url: SITE_CONFIG.url,
    },
  };

  return (
    <>
      <SEO
        title={pkg.metaTitle || `${name} | Tour Package from Coimbatore | Ramyam Holidays`}
        description={pkg.metaDescription || `${description.slice(0, 155)}...`}
        canonicalPath={`/packages/${slug}`}
        breadcrumbs={breadcrumbs}
        structuredData={touristTripSchema}
        ogImage={`${SITE_CONFIG.url}${image}`}
      />

      <main id="main-content">
        {/* Hero image */}
        <section className="relative pt-24 overflow-hidden" style={{ minHeight: '55vh' }}>
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

          <div className="container-site relative z-10 py-16">
            <Breadcrumbs items={[
              { label: 'Packages', path: '/packages' },
              { label: name, path: `/packages/${slug}` },
            ]} />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 max-w-2xl"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`badge text-xs ${type === 'international' ? 'bg-purple-500/80 text-white' : 'bg-primary-500/80 text-white'}`}>
                  {type === 'international' ? 'International' : 'Domestic'}
                </span>
                {tags?.map((tag) => (
                  <span key={tag} className="badge bg-accent-500/80 text-white text-xs">{tag}</span>
                ))}
              </div>

              <h1 className="text-white font-bold text-3xl md:text-4xl mb-3">{name}</h1>

              <div className="flex flex-wrap gap-5 text-sm text-white/85">
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
                  <Users size={14} aria-hidden="true" />
                  <span>{groupSize}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="section">
          <div className="container-site">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main */}
              <div className="lg:col-span-2 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-neutral-800 mb-3">Package Overview</h2>
                  <p className="text-neutral-600 leading-relaxed text-justify">{description}</p>

                  {itinerarySummary && (
                    <div className="mt-4 bg-primary-50 rounded-xl px-4 py-3 flex items-center gap-3">
                      <Calendar size={16} className="text-primary-600 flex-shrink-0" aria-hidden="true" />
                      <div>
                        <span className="text-xs font-bold text-primary-700 uppercase tracking-wide">Route: </span>
                        <span className="text-sm text-neutral-700">{itinerarySummary}</span>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Inclusions / Exclusions */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-lg font-bold text-neutral-800 mb-3">
                      What's Included
                    </h2>
                    <ul className="space-y-2.5">
                      {inclusions.map((inc) => (
                        <li key={inc} className="flex items-start gap-2.5">
                          <CheckCircle size={15} className="text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-neutral-600 text-sm">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {pkg.exclusions && (
                    <div>
                      <h2 className="text-lg font-bold text-neutral-800 mb-3">Not Included</h2>
                      <ul className="space-y-2.5">
                        {pkg.exclusions.map((exc) => (
                          <li key={exc} className="flex items-start gap-2.5">
                            <XCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="text-neutral-600 text-sm">{exc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Destination link */}
                {destinationSlug && (
                  <div className="bg-primary-50 rounded-2xl p-5">
                    <p className="text-sm text-neutral-600 mb-2">
                      Travelling to <strong>{destination}</strong>? Learn more about the destination:
                    </p>
                    <Link
                      to={`/destinations/${destinationSlug}`}
                      className="btn btn-outline btn-sm"
                    >
                      Destination Guide: {destination}
                    </Link>
                  </div>
                )}

                {/* Back link */}
                <Link to="/packages" className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-800 font-medium">
                  <ArrowLeft size={14} aria-hidden="true" />
                  Back to All Packages
                </Link>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-4">
                  {/* Price card */}
                  <div className="bg-white rounded-3xl shadow-card p-6 border border-neutral-100">
                    <div className="text-3xl font-bold text-primary-700 leading-none">
                      ₹{price.toLocaleString('en-IN')}
                    </div>
                    <div className="text-sm text-neutral-400 mb-4">
                      {pricePerPerson ? 'per person onwards' : 'per couple onwards'}
                    </div>
                    <div className="space-y-2 text-sm text-neutral-600 mb-5">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-primary-500" aria-hidden="true" />
                        {duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-primary-500" aria-hidden="true" />
                        {groupSize}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2.5">
                      {SITE_CONFIG.business.phones.map((phone, i) => (
                        <a
                          key={phone}
                          href={`tel:${phone}`}
                          className="btn btn-primary w-auto inline-flex items-center justify-center text-sm px-5 py-2.5 rounded-xl"
                        >
                          <Phone size={14} aria-hidden="true" />
                          <span>{SITE_CONFIG.business.phonesFormatted[i]}</span>
                        </a>
                      ))}
                      <a
                        href={`https://wa.me/${SITE_CONFIG.business.whatsapp}?text=Hello%20Ramyam%20Holidays%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(name)}%20package.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn bg-[#25D366] hover:bg-[#20bd5a] text-white w-auto inline-flex items-center justify-center text-sm px-5 py-2.5 rounded-xl"
                      >
                        <WhatsAppIcon size={18} className="w-5 h-5 text-white" />
                        <span>WhatsApp Enquiry</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PackageDetailPage;
