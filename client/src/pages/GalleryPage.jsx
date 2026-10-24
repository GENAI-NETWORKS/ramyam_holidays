import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  Compass,
  Bus,
  MapPin,
  Calendar,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { SITE_CONFIG } from '../data/siteConfig';

// Authentic Ramyam Holidays tour & fleet photos from client/public/images/
const GALLERY_IMAGES = [
  {
    id: 1,
    src: encodeURI('/images/WhatsApp Image 2026-10-24 at 8.06.09 AM.jpeg'),
    alt: 'Wild elephant spotted during jungle safari tour with Ramyam Holidays',
    title: 'Wild Elephant Jungle Safari',
    category: 'tours',
    categoryLabel: 'Tours & Adventure',
    badge: 'Wildlife Safari',
    location: 'Mudumalai / Wayanad Wildlife Sanctuary',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 2,
    src: encodeURI('/images/WhatsApp Image 2026-10-24 at 8.06.10 AM (1).jpeg'),
    alt: 'Traveller taking photos beside scenic mountain lake on Ramyam Holidays tour',
    title: 'Misty Lake & Mountain Escape',
    category: 'tours',
    categoryLabel: 'Tours & Adventure',
    badge: 'Scenic Hills',
    location: 'Wayanad / Kerala Hills',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 3,
    src: encodeURI('/images/WhatsApp Image 2026-10-24 at 8.06.10 AM.jpeg'),
    alt: 'Group of travellers enjoying bamboo rafting tour on serene mountain waters',
    title: 'Bamboo Rafting Group Tour',
    category: 'tours',
    categoryLabel: 'Tours & Adventure',
    badge: 'Adventure Tour',
    location: 'Periyar / Thekkady Backwaters',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 4,
    src: encodeURI('/images/WhatsApp Image 2026-10-24 at 8.46.30 AM.jpeg'),
    alt: 'Air-conditioned luxury tourist coach interior with comfortable pushback seats',
    title: 'Luxury Tourist Coach Interior',
    category: 'fleet',
    categoryLabel: 'Luxury Fleet & Cabs',
    badge: 'AC Tourist Coach',
    location: 'Ramyam Holidays Fleet',
    aspect: 'aspect-[1/1]',
  },
  {
    id: 5,
    src: encodeURI('/images/WhatsApp Image 2026-10-24 at 8.46.31 AM.jpeg'),
    alt: 'Luxury Tempo Traveller cabin with ambient neon mood lighting and executive leather recliner seats',
    title: 'Executive Tempo Traveller Cabin',
    category: 'fleet',
    categoryLabel: 'Luxury Fleet & Cabs',
    badge: 'Mood Lighting Fleet',
    location: 'Ramyam Holidays Fleet',
    aspect: 'aspect-[9/16]',
  },
  {
    id: 6,
    src: encodeURI('/images/WhatsApp Image 2026-10-24 at 8.46.32 AM.jpeg'),
    alt: 'Customised Spartan edition luxury tourist coach exterior for group and college tours',
    title: 'Spartan Edition Luxury Coach',
    category: 'fleet',
    categoryLabel: 'Luxury Fleet & Cabs',
    badge: 'Custom Tour Coach',
    location: 'Ramyam Holidays Fleet',
    aspect: 'aspect-[16/9]',
  },
  {
    id: 7,
    src: encodeURI('/images/WhatsApp Image 2026-10-24 at 9.37.30 AM (1).jpeg'),
    alt: 'Maharaja luxury Urbania Tempo Traveller interior with cream leather seats, mood ceiling, and sound system',
    title: 'Maharaja Urbania Executive Lounge',
    category: 'fleet',
    categoryLabel: 'Luxury Fleet & Cabs',
    badge: 'VIP Recliner Interior',
    location: 'Ramyam Holidays Fleet',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 8,
    src: encodeURI('/images/WhatsApp Image 2026-10-24 at 9.37.30 AM.jpeg'),
    alt: 'Force Traveller tour vehicle with illuminated LED grille ready for comfortable night journey',
    title: 'Force Traveller Night Fleet',
    category: 'fleet',
    categoryLabel: 'Luxury Fleet & Cabs',
    badge: 'Night Tour Fleet',
    location: 'Ramyam Holidays Fleet',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 9,
    src: encodeURI('/images/WhatsApp Image 2026-10-24 at 9.37.31 AM.jpeg'),
    alt: 'Celebration special luxury traveller van with roof monitor, ambient lights, and executive seats',
    title: 'Celebration Luxury Traveller',
    category: 'fleet',
    categoryLabel: 'Luxury Fleet & Cabs',
    badge: 'Family & Group Travel',
    location: 'Ramyam Holidays Fleet',
    aspect: 'aspect-[4/3]',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Photos', count: GALLERY_IMAGES.length, icon: Sparkles },
  { id: 'tours', label: 'Tours & Adventure', count: 3, icon: Compass },
  { id: 'fleet', label: 'Our Luxury Fleet', count: 6, icon: Bus },
];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredImages = useMemo(() => {
    if (activeCategory === 'all') return GALLERY_IMAGES;
    return GALLERY_IMAGES.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % filteredImages.length);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredImages.length]);

  const activeImage = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  return (
    <>
      <SEO
        title="Travel & Fleet Gallery | Ramyam Holidays Coimbatore"
        description="Explore our authentic travel gallery featuring real wildlife safaris, scenic tours, and our premium luxury fleet of AC coaches and executive Tempo Travellers."
        canonicalPath="/gallery"
        breadcrumbs={[{ name: 'Gallery', path: '/gallery' }]}
        keywords="Ramyam Holidays photos, Coimbatore travel gallery, tourist bus photos, tempo traveller interior Coimbatore, Kerala tour photos"
      />

      <main id="main-content">
        {/* Hero */}
        <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden="true" />
          <div className="container-site relative z-10">
            <Breadcrumbs items={[{ label: 'Gallery', path: '/gallery' }]} />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-4">
                <Sparkles size={14} className="text-accent-400" />
                <span className="text-white text-xs font-semibold">Real Memories & Luxury Travel</span>
              </div>
              <h1 className="text-white font-bold text-4xl md:text-5xl mb-4 leading-tight">
                Our Travel & Fleet Gallery
              </h1>
              <p className="text-primary-100 text-lg leading-relaxed">
                Take a look at real moments from our wildlife safaris, mountain lake adventures,
                and our signature fleet of luxury pushback AC coaches and executive Tempo Travellers.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-14 md:py-20 bg-neutral-50/60">
          <div className="container-site">
            {/* Category Filter Pills */}
            <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setLightboxIndex(null);
                    }}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-700 text-white shadow-md shadow-primary-700/20'
                        : 'bg-white text-neutral-600 hover:text-primary-700 hover:bg-neutral-100 border border-neutral-200'
                    }`}
                    aria-pressed={isActive}
                  >
                    <Icon size={14} className={isActive ? 'text-accent-400' : 'text-neutral-400'} aria-hidden="true" />
                    <span>{cat.label}</span>
                    <span
                      className={`text-2xs px-2 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-500'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Masonry Image Grid */}
            <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              <AnimatePresence mode="popLayout">
                {filteredImages.map((img, index) => (
                  <motion.figure
                    key={img.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    onClick={() => setLightboxIndex(index)}
                    className="break-inside-avoid rounded-2xl overflow-hidden bg-white border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  >
                    <div className="relative overflow-hidden bg-neutral-100">
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="badge text-2xs font-bold uppercase tracking-wider bg-white/95 text-neutral-800 backdrop-blur-sm shadow-sm">
                          {img.badge}
                        </span>
                      </div>

                      {/* Hover Overlay with Zoom Icon */}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                        <div className="self-end bg-white/20 backdrop-blur-md text-white p-2 rounded-xl">
                          <Maximize2 size={16} />
                        </div>

                        <div>
                          <p className="text-accent-300 text-xs font-semibold mb-1 flex items-center gap-1">
                            <MapPin size={12} /> {img.location}
                          </p>
                          <figcaption className="text-white text-base font-bold leading-tight">
                            {img.title}
                          </figcaption>
                        </div>
                      </div>
                    </div>

                    {/* Image Footer Caption for Accessibility & Clarity */}
                    <div className="p-4 sm:hidden">
                      <p className="text-xs text-primary-700 font-semibold">{img.badge}</p>
                      <p className="text-sm font-bold text-neutral-900">{img.title}</p>
                    </div>
                  </motion.figure>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Bottom Call to Action */}
            <div className="mt-16 bg-white rounded-3xl border border-neutral-200/80 p-8 md:p-10 text-center shadow-sm max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                Plan Your Journey With Ramyam Holidays
              </h2>
              <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-6 max-w-xl mx-auto">
                Whether you need a custom family holiday, adventure tour, or a luxury AC bus / Tempo Traveller rental from Coimbatore, we provide comfortable, reliable service.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link to="/packages" className="btn btn-primary">
                  Explore Tour Packages
                </Link>
                <a
                  href={`https://wa.me/918668098039?text=${encodeURIComponent('Hello Ramyam Holidays, I saw your travel gallery and would like to enquire about tour packages and vehicle rentals.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline gap-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                >
                  <WhatsAppIcon size={18} />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Full-Screen High-Resolution Lightbox Modal */}
        <AnimatePresence>
          {activeImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Top Bar: Title & Close */}
              <div
                className="flex items-center justify-between text-white max-w-6xl w-full mx-auto pb-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  <span className="badge text-2xs bg-accent-400 text-neutral-950 font-bold uppercase tracking-wider mb-1">
                    {activeImage.badge}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white">{activeImage.title}</h3>
                  <p className="text-neutral-400 text-xs flex items-center gap-1 mt-0.5">
                    <MapPin size={12} className="text-primary-400" /> {activeImage.location}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-neutral-400 font-medium">
                    {lightboxIndex + 1} of {filteredImages.length}
                  </span>
                  <button
                    onClick={() => setLightboxIndex(null)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label="Close modal"
                  >
                    <X size={22} />
                  </button>
                </div>
              </div>

              {/* Center: Image with Prev/Next buttons */}
              <div
                className="relative flex-1 flex items-center justify-center max-w-6xl w-full mx-auto my-auto overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() =>
                    setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
                  }
                  className="absolute left-2 md:left-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-colors backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>

                <img
                  src={activeImage.src}
                  alt={activeImage.alt}
                  className="max-h-[75vh] md:max-h-[80vh] max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl transition-all duration-300"
                />

                <button
                  onClick={() => setLightboxIndex((prev) => (prev + 1) % filteredImages.length)}
                  className="absolute right-2 md:right-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-colors backdrop-blur-sm"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Bottom: Alt text description */}
              <div
                className="text-center text-xs md:text-sm text-neutral-400 max-w-2xl mx-auto pt-3"
                onClick={(e) => e.stopPropagation()}
              >
                {activeImage.alt}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default GalleryPage;
