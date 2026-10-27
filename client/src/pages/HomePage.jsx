import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  Users,
  ChevronRight,
  MapPin,
  Phone,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';

import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import DestinationCard from '../components/DestinationCard';
import FeaturedPackagesSection from '../components/home/FeaturedPackagesSection';
import VehicleFleetSection from '../components/home/VehicleFleetSection';

import FAQAccordion from '../components/FAQAccordion';
import EnquiryForm from '../components/EnquiryForm';

import { destinations } from '../data/destinations';
import { SITE_CONFIG } from '../data/siteConfig';

// Curated 6 destinations for HomePage (Kerala, Ooty, Munnar, Goa, Mysore, Bangalore)
const HOME_DESTINATION_IDS = [
  'kerala',
  'ooty-kodaikanal',
  'munnar',
  'goa',
  'mysore',
  'bangalore',
];

const homeDestinations = HOME_DESTINATION_IDS
  .map((id) => destinations.find((d) => d.id === id))
  .filter(Boolean);



// ─── WHY CHOOSE US ────────────────────────────────────────────────────────────
const WHY_CHOOSE = [
  { stat: '15+', label: 'Years of Experience', desc: 'Trusted by thousands of travellers from Coimbatore since our founding.' },
  { stat: '5,000+', label: 'Happy Travellers', desc: 'From honeymooners to pilgrim groups, we have served them all with care.' },
  { stat: '100+', label: 'Destinations', desc: 'Domestic and international destinations covered from Coimbatore.' },
  { stat: '4.9', label: 'Google Rating', desc: 'Consistently rated 4.9/5 by our customers on Google Reviews.' },
];



// ─── HOME FAQ ─────────────────────────────────────────────────────────────────
const HOME_FAQS = [
  {
    question: 'What types of tour packages does Ramyam Holidays offer from Coimbatore?',
    answer: 'Ramyam Holidays offers a comprehensive range of tour packages from Coimbatore including domestic packages (Kerala, Ooty, Munnar, Goa, Andaman, Kashmir, Rajasthan), international packages (Dubai, Singapore, Malaysia, Thailand, Bali, Maldives, Sri Lanka, Europe), honeymoon packages, family tours, pilgrimage tours, corporate tours, school and college tours, and group tours.',
  },
  {
    question: 'How do I book a tour package with Ramyam Holidays?',
    answer: 'You can book a tour package by calling us at +91 86680 98039 or +91 94424 68039, by filling out our online enquiry form on this website, by WhatsApp message, or by visiting our office at 92, Ellaithottam Road, Peelamedu, Coimbatore 641004. We respond to all enquiries within 24 hours.',
  },
  {
    question: 'Does Ramyam Holidays provide visa assistance?',
    answer: 'Yes. Ramyam Holidays provides comprehensive visa assistance for popular international destinations including UAE (Dubai), Singapore, Malaysia, Thailand, Bali (Indonesia), Sri Lanka, Europe (Schengen), UK, USA, Australia, and more. We assist with document preparation, application submission, and tracking.',
  },
  {
    question: 'Can Ramyam Holidays arrange customised tour packages?',
    answer: 'Absolutely. We specialise in creating fully customised tour packages based on your specific destination preferences, budget, travel dates, group size, and special requirements. Every package we create is tailored; we do not do one-size-fits-all tours.',
  },
  {
    question: 'Does Ramyam Holidays provide cab and car rental services in Coimbatore?',
    answer: 'Yes. We operate a fleet of well-maintained AC vehicles including hatchbacks, sedans, Innova Crysta SUVs, Tempo Travellers, and luxury coaches for local city rides, airport transfers, outstation travel, and multi-day tour trips across Tamil Nadu and beyond.',
  },
  {
    question: 'What is the best time to book a tour package from Coimbatore?',
    answer: 'We recommend booking at least 4 to 6 weeks in advance for domestic packages, and 6 to 12 weeks for international packages (especially those involving international flights and visas). For peak season travel (December–January, April–May), booking earlier is strongly advised as popular hotels and houseboat slots fill up fast.',
  },
  {
    question: 'Where is Ramyam Holidays located?',
    answer: 'Ramyam Holidays is located at 92, Ellaithottam Road, Peelamedu, Coimbatore, Tamil Nadu 641004. We are easily accessible from Gandhipuram, RS Puram, Saibaba Colony, and all areas of Coimbatore. We are available 24 × 7 — call or WhatsApp us anytime at +91 86680 98039.',
  },
  {
    question: 'Does Ramyam Holidays offer travel insurance?',
    answer: 'Yes. We offer both domestic and international travel insurance policies covering medical emergencies, trip cancellation, lost baggage, flight delays, and personal accident coverage. We strongly recommend travel insurance for all international tours.',
  },
];

// ─── FAQ SCHEMA ───────────────────────────────────────────────────────────────
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: HOME_FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
const HomePage = () => {
  return (
    <>
      <SEO
        title="Travel Agency in Coimbatore | Tour Packages | Ramyam Holidays"
        description="Ramyam Holidays, trusted travel agency in Coimbatore. Domestic & international tour packages, honeymoon packages, flight bookings, visa assistance. Call +91 86680 98039."
        canonicalPath="/"
        structuredData={faqSchema}
        keywords="travel agency in Coimbatore, tour packages from Coimbatore, holiday packages Coimbatore, Ramyam Holidays, travel agents Peelamedu"
      />

      <main id="main-content">
        {/* ─── HERO ─────────────────────────────────────────────────────────── */}
        <section
          className="relative min-h-screen flex items-center"
          aria-label="Hero section"
        >
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80&auto=format&fit=crop"
              alt="Beautiful travel destination landscape"
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
              fetchpriority="high"
            />
            <div className="hero-overlay absolute inset-0" aria-hidden="true" />
            {/* Pattern overlay */}
            <div className="absolute inset-0 bg-hero-pattern opacity-20" aria-hidden="true" />
          </div>

          <div className="container-site relative z-10 py-16 pt-24 sm:py-20 sm:pt-28 md:pt-32">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
              {/* Hero text */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="-mt-4 sm:-mt-6 lg:-mt-10"
              >
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-4">
                  <MapPin size={13} className="text-accent-400" aria-hidden="true" />
                  <span className="text-white text-xs font-semibold">
                    Peelamedu, Coimbatore, Tamil Nadu
                  </span>
                </div>

                <h1 className="text-white font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 text-balance">
                  Your Dream
                  <br />
                  <span className="text-accent-400">Holiday</span> Awaits
                </h1>

                <p className="text-white/85 text-base sm:text-lg leading-relaxed mb-6 max-w-lg">
                  Ramyam Holidays, Coimbatore's trusted travel agency. We craft unforgettable
                  journeys across India and the world, tailored just for you.
                </p>

                <div className="flex flex-wrap gap-2.5">
                  <Link to="/packages" className="btn btn-accent text-sm px-4 py-2 rounded-xl">
                    <span>Explore Packages</span>
                    <ChevronRight size={15} aria-hidden="true" />
                  </Link>
                  <a
                    href={`tel:${SITE_CONFIG.business.phones[0]}`}
                    className="btn bg-white/15 backdrop-blur-sm border border-white/30 text-white hover:bg-white/25 text-sm px-4 py-2 rounded-xl"
                  >
                    <Phone size={14} aria-hidden="true" />
                    <span>Call Us Now</span>
                  </a>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap gap-4 mt-6">
                  {[
                    { icon: Zap, label: '24 × 7 Available' },
                    { icon: Users, label: '5,000+ Happy Travellers' },
                    { icon: Clock, label: '15+ Years Experience' },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 text-white/85 text-sm">
                      <Icon size={14} className="text-accent-400" aria-hidden="true" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Enquiry Form */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl"
              >
                <div className="mb-5">
                  <h2 className="text-lg font-bold text-neutral-800">Get a Free Quote</h2>
                  <p className="text-sm text-neutral-500 mt-1">
                    Fill in your details and we will respond within 24 hours.
                  </p>
                </div>
                <EnquiryForm compact />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── COMPREHENSIVE TOURIST VEHICLE FLEET (4 TO 54 SEATER) ──────── */}
        <VehicleFleetSection />

        {/* ─── STATS ────────────────────────────────────────────────────────── */}
        <section className="bg-primary-700 py-12" aria-label="Ramyam Holidays statistics">
          <div className="container-site">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_CHOOSE.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-white mb-1">{item.stat}</div>
                  <div className="text-primary-200 font-semibold text-sm mb-1">{item.label}</div>
                  <div className="text-primary-300 text-xs leading-relaxed hidden md:block">
                    {item.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── POPULAR DESTINATIONS ─────────────────────────────────────────── */}
        <section className="section" aria-labelledby="destinations-heading">
          <div className="container-site">
            <SectionHeading
              eyebrow="Explore India & the World"
              title={<>Popular Destinations from <span className="gradient-text">Coimbatore</span></>}
              description="From the misty hills of Munnar and Ooty to the heritage palaces of Mysore and Bangalore, discover our most-booked destinations."
              id="destinations-heading"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6 mt-12">
              {homeDestinations.map((dest, i) => (
                <div key={dest.id} className="h-full">
                  <DestinationCard destination={dest} index={i} />
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link to="/destinations" className="btn btn-outline">
                View All Destinations
                <ChevronRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>



        {/* ─── FEATURED PACKAGES (UNIQUE HORIZONTAL TRAVEL VOUCHER PATTERN) ── */}
        <FeaturedPackagesSection />



        {/* ─── LOCAL AREA SECTION ───────────────────────────────────────────── */}
        <section className="section-sm bg-primary-900" aria-label="Service areas">
          <div className="container-site text-center">
            <h2 className="text-white font-bold text-xl mb-3">
              Serving Coimbatore & Surrounding Areas
            </h2>
            <p className="text-primary-300 text-sm leading-relaxed max-w-3xl mx-auto">
              Ramyam Holidays proudly serves travellers from{' '}
              <strong className="text-white">Coimbatore</strong>,{' '}
              <strong className="text-white">Peelamedu</strong>,{' '}
              <strong className="text-white">Saibaba Colony</strong>,{' '}
              <strong className="text-white">RS Puram</strong>,{' '}
              <strong className="text-white">Gandhipuram</strong>,{' '}
              <strong className="text-white">Singanallur</strong>,{' '}
              <strong className="text-white">Race Course</strong>,{' '}
              <strong className="text-white">Tiruppur</strong>,{' '}
              <strong className="text-white">Pollachi</strong>, and all of{' '}
              <strong className="text-white">Tamil Nadu</strong>. We are conveniently located at
              92, Ellaithottam Road, Peelamedu. Call us to plan your next holiday.
            </p>
          </div>
        </section>

        {/* ─── FAQ SECTION ──────────────────────────────────────────────────── */}
        <section className="section" aria-labelledby="faq-heading">
          <div className="container-site">
            <div className="max-w-3xl mx-auto">
              <SectionHeading
                eyebrow="Questions Answered"
                title="Frequently Asked Questions"
                description="Everything you need to know about booking with Ramyam Holidays."
                id="faq-heading"
              />
              <div className="mt-10">
                <FAQAccordion faqs={HOME_FAQS} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;
