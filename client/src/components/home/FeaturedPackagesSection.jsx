import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  MapPin,
  Star,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Compass,
  Globe,
  Heart,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import { packages } from '../../data/packages';

const CATEGORIES = [
  { id: 'all', label: 'All Packages', icon: Sparkles },
  { id: 'domestic', label: 'Domestic', icon: Compass },
  { id: 'international', label: 'International', icon: Globe },
  { id: 'honeymoon', label: 'Honeymoon', icon: Heart },
];

const FeaturedPackagesSection = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Curated 4 top diverse packages for "All": Kerala, Ooty, Maldives, Dubai
  const allCurated = useMemo(() => {
    const priorityIds = ['kerala-5d', 'ooty-3d', 'honeymoon-maldives', 'dubai-5d'];
    const list = priorityIds.map((id) => packages.find((p) => p.id === id)).filter(Boolean);
    return list.length === 4 ? list : packages.slice(0, 4);
  }, []);

  const filteredPackages = useMemo(() => {
    if (activeTab === 'all') return allCurated;
    if (activeTab === 'domestic') {
      const list = packages.filter((p) => p.type === 'domestic' && p.category !== 'pilgrimage');
      return list.slice(0, 4);
    }
    if (activeTab === 'international') {
      return packages.filter((p) => p.type === 'international').slice(0, 4);
    }
    if (activeTab === 'honeymoon') {
      return packages.filter((p) => p.category === 'honeymoon' || p.tags?.includes('Honeymoon')).slice(0, 4);
    }
    return allCurated;
  }, [activeTab, allCurated]);

  return (
    <section
      className="relative py-16 md:py-24 bg-gradient-to-b from-slate-50 via-neutral-50/80 to-slate-50 border-y border-neutral-200/80 overflow-hidden"
      aria-labelledby="featured-packages-heading"
    >
      {/* Decorative ambient background glows */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-100/30 rounded-full blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="container-site relative z-10">
        {/* Section Header */}
        <SectionHeading
          eyebrow="Hand-Picked for You"
          title={<>Featured Tour <span className="gradient-text">Packages</span></>}
          description="Hand-crafted travel itineraries with all-inclusive pricing, trusted hotels, and seamless transfers from Coimbatore."
          id="featured-packages-heading"
        />

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mt-8 mb-10">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-700 text-white shadow-md shadow-primary-700/20'
                    : 'bg-white text-neutral-600 hover:text-primary-700 hover:bg-neutral-100/80 border border-neutral-200/80'
                }`}
                aria-pressed={isActive}
              >
                <Icon size={14} className={isActive ? 'text-accent-400' : 'text-neutral-400'} aria-hidden="true" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* 
          Grid layout:
          - Laptop & Desktop (lg:): 4 cards in 1 row (grid-cols-4) - compact, sleek, all visible at a glance
          - Tablet (sm: / md:): 4 cards in 2x2 grid (grid-cols-2)
          - Mobile (< sm): 3 cards in 1 column (card 4 hidden via index === 3)
        */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <AnimatePresence mode="popLayout">
            {filteredPackages.slice(0, 4).map((pkg, index) => (
              <motion.article
                key={pkg.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`h-full ${index === 3 ? 'hidden sm:block' : ''}`}
              >
                <Link
                  to={`/packages/${pkg.slug}`}
                  className="group flex flex-col h-full bg-white rounded-2xl border border-neutral-200/90 hover:border-primary-400 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                  aria-label={`View ${pkg.name} tour package`}
                >
                  {/* Card Cover Photo (Compact controlled height) */}
                  <div className="relative h-44 sm:h-48 md:h-44 lg:h-40 w-full overflow-hidden bg-neutral-100 flex-shrink-0">
                    <img
                      src={pkg.image}
                      alt={pkg.imageAlt || pkg.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      width={400}
                      height={250}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Top Left: Category Badge */}
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="badge text-[10px] py-0.5 px-2 font-bold uppercase tracking-wider bg-white/95 text-neutral-800 backdrop-blur-md shadow-xs">
                        {pkg.type === 'international'
                          ? '✈️ International'
                          : pkg.category === 'honeymoon'
                          ? '💍 Honeymoon'
                          : '🌴 Domestic'}
                      </span>
                    </div>

                    {/* Top Right: Rating Pill */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <div className="flex items-center gap-1 bg-neutral-900/80 backdrop-blur-md rounded-full px-2 py-0.5 text-white shadow-xs">
                        <Star size={10} className="text-amber-400 fill-amber-400" aria-hidden="true" />
                        <span className="text-[11px] font-bold">{pkg.rating}</span>
                        <span className="text-[10px] text-white/70">({pkg.reviewCount})</span>
                      </div>
                    </div>

                    {/* Bottom Left: Duration Pill */}
                    <div className="absolute bottom-2.5 left-2.5 z-10">
                      <div className="inline-flex items-center gap-1 bg-black/65 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-md">
                        <Clock size={11} className="text-accent-400" aria-hidden="true" />
                        <span>{pkg.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body Details */}
                  <div className="p-4 sm:p-4.5 flex flex-col flex-1 justify-between bg-white">
                    <div>
                      {/* Itinerary route breadcrumb */}
                      {pkg.itinerarySummary ? (
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-primary-700 mb-1.5">
                          <MapPin size={11} className="flex-shrink-0 text-primary-600" aria-hidden="true" />
                          <span className="truncate">{pkg.itinerarySummary}</span>
                        </div>
                      ) : (
                        <div className="text-[11px] font-semibold text-primary-700 mb-1.5">{pkg.destination}</div>
                      )}

                      {/* Package Title */}
                      <h3 className="font-bold text-neutral-900 text-sm sm:text-base group-hover:text-primary-700 transition-colors leading-snug line-clamp-2 min-h-[2.5rem] mb-2.5">
                        {pkg.name}
                      </h3>

                      {/* Inclusions Tags */}
                      {pkg.inclusions && pkg.inclusions.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {pkg.inclusions.slice(0, 2).map((inc, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 text-[11px] font-medium"
                            >
                              <CheckCircle2 size={11} className="text-primary-600 flex-shrink-0" aria-hidden="true" />
                              <span className="truncate max-w-[130px]">{inc}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Price + Action CTA */}
                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2 mt-auto">
                      <div>
                        <span className="text-[10px] text-neutral-400 block font-medium uppercase tracking-wider">
                          Starting from
                        </span>
                        <div className="text-primary-700 font-extrabold text-base sm:text-lg leading-tight">
                          ₹{pkg.price.toLocaleString('en-IN')}
                          <span className="text-[11px] font-normal text-neutral-500">
                            {pkg.pricePerPerson ? ' /person' : ' /couple'}
                          </span>
                        </div>
                      </div>

                      <div className="btn btn-primary btn-xs rounded-lg px-2.5 py-1.5 text-xs gap-1 group-hover:bg-primary-800 transition-all shadow-xs flex-shrink-0">
                        <span>View Plan</span>
                        <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Packages Footer CTA */}
        <div className="text-center mt-12">
          <Link to="/packages" className="btn btn-outline bg-white hover:bg-neutral-50">
            View All Tour Packages
            <ChevronRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackagesSection;
