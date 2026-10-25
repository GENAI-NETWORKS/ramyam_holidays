import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car,
  Bus,
  Users,
  ShieldCheck,
  Zap,
  Phone,
  Luggage,
  Wind,
  Armchair,
  CheckCircle,
  GraduationCap,
  Sparkles,
  Briefcase,
  ChevronRight,
} from 'lucide-react';
import SectionHeading from '../SectionHeading';
import WhatsAppIcon from '../WhatsAppIcon';
import { FLEET_CATEGORIES, VEHICLE_FLEET } from '../../data/vehicles';
import { SITE_CONFIG } from '../../data/siteConfig';

const VehicleFleetSection = () => {
  // Default to 17-seater (very popular group size) or 7-seater
  const [selectedSeat, setSelectedSeat] = useState(17);

  // Active vehicle data
  const activeVehicle = useMemo(() => {
    return VEHICLE_FLEET.find((v) => v.seats === selectedSeat) || VEHICLE_FLEET[0];
  }, [selectedSeat]);

  // Active category key
  const activeCategoryKey = activeVehicle.categoryKey;

  // WhatsApp link generator
  const waUrl = useMemo(() => {
    const text = encodeURIComponent(
      `Hello Ramyam Holidays, I want to check rates and book the ${activeVehicle.name} (${activeVehicle.seats} Seater) for our upcoming trip.`
    );
    return `https://wa.me/${SITE_CONFIG.business.whatsapp}?text=${text}`;
  }, [activeVehicle]);

  return (
    <section className="section bg-slate-900 text-white relative overflow-hidden" id="tourist-vehicles">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-site relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* 24x7 Status Indicator */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm backdrop-blur-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            Available 24 × 7 • Instant Dispatch Across Coimbatore
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
            Choose Your <span className="bg-gradient-to-r from-accent-400 via-primary-300 to-accent-300 bg-clip-text text-transparent">Exact Vehicle Size</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            From 4-seater executive sedans to 54-seater luxury coaches. Pure comfort, verified hill & highway chauffeurs, and zero breakdown guarantee.
          </p>
        </div>

        {/* 3 Value Highlights: School, College, Corporate */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 my-8">
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3.5 flex items-center gap-3 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center flex-shrink-0">
              <GraduationCap size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">School Excursions</div>
              <div className="text-xs text-slate-300">36, 45 & 54 Seater • Teachers Stay Free</div>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3.5 flex items-center gap-3 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center flex-shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">College IV Trips</div>
              <div className="text-xs text-slate-300">Pushback Recliners • DJ Sound • IV Permits</div>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3.5 flex items-center gap-3 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Briefcase size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Corporate Offsites</div>
              <div className="text-xs text-slate-300">Executive Innova Crystas • Official GST Bills</div>
            </div>
          </div>
        </div>

        {/* Category Switcher Cards (4 Clean Tabs) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {FLEET_CATEGORIES.map((cat) => {
            const isCatActive = activeCategoryKey === cat.id;
            const IconComponent =
              cat.id === 'cabs' ? Car : cat.id === 'tempo' ? Bus : cat.id === 'minibus' ? Users : ShieldCheck;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedSeat(cat.seatNumbers[0])}
                className={`text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-200 cursor-pointer border ${
                  isCatActive
                    ? 'bg-gradient-to-br from-primary-700 to-primary-900 border-primary-500/80 shadow-lg shadow-primary-950/50 scale-[1.01]'
                    : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isCatActive ? 'bg-white/20 text-white' : 'bg-slate-700/50 text-primary-400'
                    }`}
                  >
                    <IconComponent size={18} />
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isCatActive
                        ? 'bg-accent-400 text-slate-900'
                        : 'bg-slate-700/60 text-slate-300'
                    }`}
                  >
                    {cat.seatsRange}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white">{cat.title}</h4>
                <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-1">{cat.topModels}</p>
              </button>
            );
          })}
        </div>

        {/* Interactive Seating Capacity Rail (All 15 Sizes) */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-3 sm:p-4 mb-8">
          <div className="flex items-center justify-between gap-2 mb-2 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <span>Select Exact Seating Capacity:</span>
            </span>
            <span className="text-xs text-accent-300 font-semibold">
              Currently Viewing: <span className="underline font-bold">{activeVehicle.seats} Seater</span>
            </span>
          </div>

          {/* Horizontal scrollable pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 pt-1 scrollbar-thin">
            {VEHICLE_FLEET.map((v) => {
              const isSelected = v.seats === selectedSeat;
              return (
                <button
                  key={v.id}
                  onClick={() => setSelectedSeat(v.seats)}
                  className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-accent-400 text-slate-900 shadow-md shadow-accent-400/20 scale-105'
                      : 'bg-slate-700/60 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-600/40'
                  }`}
                >
                  <span>{v.seats}</span>
                  <span className="text-[10px] font-normal opacity-75">Seats</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Insight Spotlight Card (High-Impact Master Panel) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVehicle.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="bg-gradient-to-br from-slate-800 via-slate-800/95 to-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Big Visual Badge & Vehicle Identity (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-xs font-bold border border-primary-500/30">
                  <span>{activeVehicle.categoryName}</span>
                  <span>•</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    24x7 Ready
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                    {activeVehicle.seats}
                  </span>
                  <div>
                    <div className="text-xs uppercase font-extrabold text-accent-400 tracking-wider">Seater AC Coach</div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{activeVehicle.name}</h3>
                  </div>
                </div>

                {/* Models available */}
                <div>
                  <div className="text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                    Fleet Models Available:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeVehicle.models.map((model) => (
                      <span
                        key={model}
                        className="text-xs px-2.5 py-1 rounded-lg bg-slate-700/80 border border-slate-600/60 text-slate-200 font-medium"
                      >
                        {model}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Best for trip pill */}
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/70 text-xs">
                  <span className="text-accent-400 font-bold block mb-0.5">Recommended For:</span>
                  <span className="text-slate-200 font-medium">{activeVehicle.idealFor}</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {activeVehicle.useTags.map((tag) => (
                      <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Middle Column: 4 Clean Visual Spec Tiles (4 cols) */}
              <div className="lg:col-span-4 grid grid-cols-2 gap-3">
                <div className="bg-slate-900/60 border border-slate-700/60 rounded-2xl p-3.5">
                  <div className="w-8 h-8 rounded-lg bg-primary-500/15 text-primary-400 flex items-center justify-center mb-2">
                    <Armchair size={17} />
                  </div>
                  <div className="text-[11px] text-slate-400 font-semibold uppercase">Seating Comfort</div>
                  <div className="text-xs font-bold text-white mt-0.5 leading-snug">{activeVehicle.seatingType}</div>
                </div>

                <div className="bg-slate-900/60 border border-slate-700/60 rounded-2xl p-3.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/15 text-sky-400 flex items-center justify-center mb-2">
                    <Wind size={17} />
                  </div>
                  <div className="text-[11px] text-slate-400 font-semibold uppercase">Air Conditioning</div>
                  <div className="text-xs font-bold text-white mt-0.5 leading-snug">{activeVehicle.acType}</div>
                </div>

                <div className="bg-slate-900/60 border border-slate-700/60 rounded-2xl p-3.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center mb-2">
                    <Luggage size={17} />
                  </div>
                  <div className="text-[11px] text-slate-400 font-semibold uppercase">Luggage Capacity</div>
                  <div className="text-xs font-bold text-white mt-0.5 leading-snug">{activeVehicle.luggage}</div>
                </div>

                <div className="bg-slate-900/60 border border-slate-700/60 rounded-2xl p-3.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-2">
                    <ShieldCheck size={17} />
                  </div>
                  <div className="text-[11px] text-slate-400 font-semibold uppercase">Driver & Safety</div>
                  <div className="text-xs font-bold text-white mt-0.5 leading-snug">Verified Chauffeur • GPS Monitored</div>
                </div>
              </div>

              {/* Right Column: Unified Clean Action Center (3 cols - ONE clear CTA) */}
              <div className="lg:col-span-3 flex flex-col justify-center space-y-3 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-primary-950/60 border border-slate-700/80 text-center">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-center gap-1">
                    <Zap size={13} /> Instant Dispatch 24×7
                  </div>
                  <div className="text-sm font-bold text-white">
                    Need the {activeVehicle.seats}-Seater?
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    Get best round-trip tariff & driver confirmation in 2 minutes.
                  </p>
                </div>

                {/* THE ONLY 2 BUTTONS NEEDED */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-4 rounded-xl text-sm font-bold shadow-lg shadow-emerald-950/50 justify-center inline-flex items-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <WhatsAppIcon size={18} className="text-white" />
                  <span>Enquire on WhatsApp</span>
                </a>

                <a
                  href={`tel:${SITE_CONFIG.business.phones[0]}`}
                  className="btn bg-white/10 hover:bg-white/20 text-white py-2.5 px-4 rounded-xl text-xs font-semibold justify-center inline-flex items-center gap-2 transition-all"
                >
                  <Phone size={14} />
                  <span>Call {SITE_CONFIG.business.phonesFormatted[0]}</span>
                </a>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default VehicleFleetSection;
