import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Zap,
  GraduationCap,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import SectionHeading from '../SectionHeading';
import WhatsAppIcon from '../WhatsAppIcon';
import { VEHICLE_FLEET } from '../../data/vehicles';
import { SITE_CONFIG } from '../../data/siteConfig';

const FILTER_GROUPS = [
  { id: 'all', label: 'All Vehicles (4 to 54 Seater)' },
  { id: 'cabs', label: 'Cars & SUVs (4, 6, 7 Seater)', filter: [4, 6, 7] },
  { id: 'tempo', label: 'Tempo Travellers (9, 10, 14, 17, 18 Seater)', filter: [9, 10, 14, 17, 18] },
  { id: 'mini', label: 'Mini Buses (21, 25, 30 Seater)', filter: [21, 25, 30] },
  { id: 'coaches', label: 'Large Coaches (34, 36, 45, 54 Seater)', filter: [34, 36, 45, 54] },
];

const VehicleFleetSection = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredFleet = VEHICLE_FLEET.filter((vehicle) => {
    if (activeTab === 'all') return true;
    const group = FILTER_GROUPS.find((g) => g.id === activeTab);
    return group?.filter ? group.filter.includes(vehicle.seats) : true;
  });

  return (
    <section className="section bg-gradient-to-b from-white via-primary-50/20 to-white" id="tourist-vehicles">
      <div className="container-site">
        <div className="flex flex-col items-center text-center">
          {/* 24x7 Highlight Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 rounded-full px-4 py-1.5 mb-4 shadow-sm">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-800 text-xs sm:text-sm font-bold tracking-wide uppercase">
              24 × 7 Available • Instant Booking • No Waiting
            </span>
          </div>

          <SectionHeading
            eyebrow="Comprehensive Tourist Vehicle Fleet"
            title={<>All Types of Tourist Vehicles from <span className="gradient-text">4 to 54 Seater</span></>}
            description="Whether it's a family getaway, school excursion, college industrial visit, or corporate offsite, we have the exact seating capacity you need."
            center
          />
        </div>

        {/* Specialized Tours Banner */}
        <div className="mt-8 mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center flex-shrink-0">
              <GraduationCap size={24} />
            </div>
            <div>
              <h4 className="font-bold text-neutral-800 text-sm">School Student Tours</h4>
              <p className="text-xs text-neutral-600 mt-0.5">36, 45 & 54 Seater AC coaches with safety certification & teacher-friendly amenities.</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Sparkles size={24} />
            </div>
            <div>
              <h4 className="font-bold text-neutral-800 text-sm">College IV Packages</h4>
              <p className="text-xs text-neutral-600 mt-0.5">Pushback luxury coaches, DJ sound setup, verified drivers for hassle-free IV trips.</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Briefcase size={24} />
            </div>
            <div>
              <h4 className="font-bold text-neutral-800 text-sm">Corporate Tour Packages</h4>
              <p className="text-xs text-neutral-600 mt-0.5">Executive Innova Crystas, Tempo Travellers & luxury buses with official GST billing.</p>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {FILTER_GROUPS.map((group) => {
            const isActive = activeTab === group.id;
            return (
              <button
                key={group.id}
                onClick={() => setActiveTab(group.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-primary-700 text-white shadow-md shadow-primary-700/25 scale-[1.02]'
                    : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300'
                }`}
              >
                {group.label}
              </button>
            );
          })}
        </div>

        {/* Fleet Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredFleet.map((vehicle) => {
              const waText = encodeURIComponent(
                `Hello Ramyam Holidays, I want to enquire / book your ${vehicle.name} (${vehicle.capacity}). Please share rates and availability.`
              );

              return (
                <motion.div
                  layout
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl p-6 shadow-card border border-neutral-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:border-primary-200 group"
                >
                  <div>
                    {/* Top Row: Capacity Badge & 24x7 status */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary-50 text-primary-700 border border-primary-100">
                        <Users size={13} />
                        {vehicle.capacity}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                        <Zap size={11} className="text-emerald-500" />
                        24x7 Available
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-neutral-800 group-hover:text-primary-700 transition-colors">
                      {vehicle.name}
                    </h3>
                    <p className="text-xs text-neutral-500 font-medium mt-0.5">
                      {vehicle.models}
                    </p>

                    {/* Best for */}
                    <div className="mt-3.5 p-3 rounded-2xl bg-neutral-50/80 border border-neutral-100 text-xs text-neutral-600">
                      <span className="font-bold text-neutral-700">Best for: </span>
                      {vehicle.bestFor}
                    </div>

                    {/* Key features checklist */}
                    <div className="mt-4 space-y-1.5">
                      {vehicle.features.slice(0, 4).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-neutral-600">
                          <CheckCircle2 size={14} className="text-primary-600 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-2.5">
                    <a
                      href={`https://wa.me/${SITE_CONFIG.business.whatsapp}?text=${waText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn bg-[#25D366] hover:bg-[#20bd5a] text-white flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold shadow-sm justify-center inline-flex items-center gap-1.5 transition-all"
                    >
                      <WhatsAppIcon size={15} className="text-white" />
                      Book on WhatsApp
                    </a>
                    <a
                      href={`tel:${SITE_CONFIG.business.phones[0]}`}
                      className="btn bg-neutral-100 hover:bg-neutral-200 text-neutral-800 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold justify-center inline-flex items-center gap-1.5 transition-all"
                      aria-label="Call for vehicle booking"
                    >
                      <Phone size={14} />
                      Call
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Callout */}
        <div className="mt-12 bg-primary-800 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-accent-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck size={16} /> Verified Tourist Vehicles & Experienced Drivers
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">Need a Customized Seating Capacity or Multi-Vehicle Fleet?</h3>
            <p className="text-primary-200 text-xs sm:text-sm max-w-xl">
              We manage transport for school excursions, large college batches, corporate conferences, and multi-bus wedding convoys. Available 24 × 7.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${SITE_CONFIG.business.phones[0]}`}
              className="btn bg-white text-primary-800 hover:bg-neutral-100 px-5 py-3 rounded-xl font-bold text-sm shadow-md"
            >
              <Phone size={16} className="mr-2" />
              Call {SITE_CONFIG.business.phonesFormatted[0]}
            </a>
            <a
              href={`https://wa.me/${SITE_CONFIG.business.whatsapp}?text=Hello%20Ramyam%20Holidays%2C%20I%20need%20a%20tourist%20vehicle%20quote.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md"
            >
              <WhatsAppIcon size={16} className="mr-2 text-white" />
              WhatsApp Us 24x7
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleFleetSection;
