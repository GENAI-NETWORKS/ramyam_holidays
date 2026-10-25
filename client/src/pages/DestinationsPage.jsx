import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Globe, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import Breadcrumbs from '../components/Breadcrumbs';
import DestinationCard from '../components/DestinationCard';
import { destinations, getDomesticDestinations, getInternationalDestinations } from '../data/destinations';

const FILTERS = [
  { value: 'all', label: 'All Destinations' },
  { value: 'karnataka-goa', label: 'Karnataka & Goa' },
  { value: 'domestic', label: 'All Domestic' },
  { value: 'international', label: 'International' },
];

const DestinationsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered =
    activeFilter === 'all'
      ? destinations
      : activeFilter === 'karnataka-goa'
      ? destinations.filter((d) => d.region === 'Karnataka' || d.id === 'goa')
      : activeFilter === 'domestic'
      ? getDomesticDestinations()
      : getInternationalDestinations();

  return (
    <>
      <SEO
        title="Tour Destinations from Coimbatore | Kerala, Dubai, Goa & More | Ramyam Holidays"
        description="Explore 10+ domestic and international tour destinations from Coimbatore. Kerala, Munnar, Ooty, Goa, Andaman, Dubai, Singapore, Maldives and more with Ramyam Holidays."
        canonicalPath="/destinations"
        breadcrumbs={[{ name: 'Destinations', path: '/destinations' }]}
        keywords="tour destinations from Coimbatore, domestic destinations, international destinations, travel destinations Coimbatore"
      />

      <main id="main-content">
        {/* Hero */}
        <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary-800 to-primary-600 overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden="true" />
          <div className="container-site relative z-10">
            <Breadcrumbs items={[{ label: 'Destinations', path: '/destinations' }]} />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <h1 className="text-white font-bold text-4xl md:text-5xl mb-4">
                Explore Destinations
              </h1>
              <p className="text-primary-200 text-lg max-w-2xl">
                From Munnar's misty hills to Dubai's golden skyscrapers, discover every destination we cover from Coimbatore.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter tabs */}
        <section className="section">
          <div className="container-site">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
              <div className="flex items-center gap-2 flex-wrap">
                {FILTERS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setActiveFilter(f.value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      activeFilter === f.value
                        ? 'bg-primary-700 text-white shadow-md'
                        : 'bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-700 border border-neutral-200'
                    }`}
                    aria-pressed={activeFilter === f.value}
                  >
                    {f.value === 'international' && <Globe size={14} aria-hidden="true" />}
                    {f.value === 'domestic' && <MapPin size={14} aria-hidden="true" />}
                    {f.value === 'all' && <Filter size={14} aria-hidden="true" />}
                    {f.label}
                  </button>
                ))}
              </div>
              <p className="text-sm text-neutral-500">
                {filtered.length} destination{filtered.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((dest, i) => (
                <DestinationCard key={dest.id} destination={dest} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default DestinationsPage;
