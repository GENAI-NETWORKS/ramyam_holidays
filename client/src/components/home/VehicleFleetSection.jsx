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
  GraduationCap,
  Sparkles,
  Briefcase,
  MapPin,
} from 'lucide-react';
import WhatsAppIcon from '../WhatsAppIcon';
import { FLEET_CATEGORIES, VEHICLE_FLEET } from '../../data/vehicles';
import { SITE_CONFIG } from '../../data/siteConfig';

const VehicleFleetSection = () => {
  // Default to 17-seater (popular group size)
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
    <section className="section relative overflow-hidden text-white" id="tourist-vehicles">
      {/* ─── 1. REAL VEHICLE BACKGROUND WITH BRAND TEAL/PINE OVERLAY ─────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <img
          src="/images/WhatsApp Image 2026-10-24 at 9.37.31 AM.jpeg"
          alt="Ramyam Holidays tourist vehicle interior"
          className="w-full h-full object-cover object-center filter brightness-[0.22] contrast-[1.12]"
        />
        {/* Deep Pine Green / Teal brand gradient overlay (Matching Ramyam Holidays Logo) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#042f2e]/96 via-[#093c38]/92 to-[#042f2e]/98 backdrop-blur-[2px]" />
        {/* Subtle radial ambient glow using logo teal and warm amber */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#14b8a6]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#f59e0b]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="container-site relative z-10">
        
        {/* ─── 2. SECTION HEADER (BRAND COLOUR COMBO) ───────────────────────── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* 24x7 Highlight Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#14b8a6]/15 border border-[#2dd4bf]/35 text-[#2dd4bf] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2dd4bf] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2dd4bf]"></span>
            </span>
            <span>Available 24 × 7 • Instant Dispatch Across Coimbatore</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
            Choose Your <span className="bg-gradient-to-r from-amber-300 via-emerald-300 to-rose-300 bg-clip-text text-transparent">Exact Vehicle Size</span>
          </h2>
          <p className="text-primary-100/90 text-sm sm:text-base leading-relaxed max-w-2xl">
            From 4-seater executive sedans to 54-seater luxury coaches. Pure comfort, verified hill & highway chauffeurs, and zero breakdown guarantee.
          </p>
        </div>

        {/* ─── 3. VALUE HIGHLIGHTS (LOGO PALETTE: GOLD, ROSE & EMERALD) ─────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 my-8">
          {/* School: Golden Sun Yellow */}
          <div className="bg-[#063a36]/80 border border-amber-400/30 rounded-2xl p-3.5 flex items-center gap-3 backdrop-blur-md shadow-sm hover:border-amber-400/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-400/15 text-amber-300 flex items-center justify-center flex-shrink-0">
              <GraduationCap size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span>School Excursions</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-semibold">Verified</span>
              </div>
              <div className="text-xs text-primary-100/80 mt-0.5">36, 45 & 54 Seater • Teachers Stay Free</div>
            </div>
          </div>

          {/* College IV: Logo Coral / Rose Red */}
          <div className="bg-[#063a36]/80 border border-rose-400/30 rounded-2xl p-3.5 flex items-center gap-3 backdrop-blur-md shadow-sm hover:border-rose-400/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-300 flex items-center justify-center flex-shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span>College IV Packages</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 font-semibold">Special</span>
              </div>
              <div className="text-xs text-primary-100/80 mt-0.5">Pushback Recliners • DJ Sound • IV Permits</div>
            </div>
          </div>

          {/* Corporate: Logo Palm Emerald */}
          <div className="bg-[#063a36]/80 border border-emerald-400/30 rounded-2xl p-3.5 flex items-center gap-3 backdrop-blur-md shadow-sm hover:border-emerald-400/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/15 text-emerald-300 flex items-center justify-center flex-shrink-0">
              <Briefcase size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span>Corporate Offsites</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-400/20 text-emerald-300 font-semibold">GST Billing</span>
              </div>
              <div className="text-xs text-primary-100/80 mt-0.5">Executive Crystas & Buses • On-Time Guarantee</div>
            </div>
          </div>
        </div>

        {/* ─── 4. CATEGORY SWITCHER CARDS (BRAND TEAL & GOLD ACCENT) ────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {FLEET_CATEGORIES.map((cat) => {
            const isCatActive = activeCategoryKey === cat.id;
            const IconComponent =
              cat.id === 'cabs' ? Car : cat.id === 'tempo' ? Bus : cat.id === 'minibus' ? Users : ShieldCheck;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedSeat(cat.seatNumbers[0])}
                className={`text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-200 cursor-pointer border backdrop-blur-md ${
                  isCatActive
                    ? 'bg-gradient-to-br from-[#0f766e] to-[#042f2e] border-emerald-400/80 shadow-lg shadow-emerald-950/60 scale-[1.01]'
                    : 'bg-[#063a36]/70 border-primary-700/40 hover:bg-[#084843]/80 hover:border-primary-500/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isCatActive ? 'bg-emerald-400/20 text-emerald-300' : 'bg-primary-900/60 text-primary-300'
                    }`}
                  >
                    <IconComponent size={18} />
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isCatActive
                        ? 'bg-amber-400 text-[#042f2e]'
                        : 'bg-primary-950/70 text-primary-200 border border-primary-800/60'
                    }`}
                  >
                    {cat.seatsRange}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white">{cat.title}</h4>
                <p className="text-[11px] text-primary-200/80 mt-0.5 line-clamp-1">{cat.topModels}</p>
              </button>
            );
          })}
        </div>

        {/* ─── 5. INTERACTIVE SEATING CAPACITY RAIL (ALL 15 SIZES) ─────────── */}
        <div className="bg-[#05322e]/85 border border-primary-700/50 rounded-2xl p-3 sm:p-4 mb-8 backdrop-blur-md shadow-md">
          <div className="flex items-center justify-between gap-2 mb-2 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-200 flex items-center gap-1.5">
              <span>Select Exact Seating Capacity:</span>
            </span>
            <span className="text-xs text-amber-300 font-semibold">
              Selected: <span className="underline font-bold text-white">{activeVehicle.seats} Seater</span>
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
                  className={`flex-shrink-0 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-400 text-[#042f2e] shadow-md shadow-amber-400/25 scale-105 border-transparent'
                      : 'bg-[#08413b]/80 text-primary-100 hover:bg-[#0c564f] hover:text-white border border-primary-700/40'
                  }`}
                >
                  <span>{v.seats}</span>
                  <span className="text-[10px] font-medium opacity-80">Seats</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── 6. INSIGHT SPOTLIGHT CARD (BRAND COMBO: DEEP TEAL, GOLD & CORAL) ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVehicle.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="bg-gradient-to-br from-[#063834]/95 via-[#084540]/90 to-[#042825]/98 border border-primary-600/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Seating Count & Identity (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-800/60 text-primary-200 text-xs font-bold border border-primary-600/50">
                  <span>{activeVehicle.categoryName}</span>
                  <span>•</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    24x7 Ready
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-5xl sm:text-6xl font-black text-amber-300 tracking-tight">
                    {activeVehicle.seats}
                  </span>
                  <div>
                    <div className="text-xs uppercase font-extrabold text-emerald-400 tracking-wider">Seater AC Coach</div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{activeVehicle.name}</h3>
                  </div>
                </div>

                {/* Fleet models available */}
                <div>
                  <div className="text-[11px] uppercase font-bold text-primary-200 tracking-wider mb-1.5">
                    Fleet Models Available:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeVehicle.models.map((model) => (
                      <span
                        key={model}
                        className="text-xs px-2.5 py-1 rounded-lg bg-[#042f2e]/80 border border-primary-700/60 text-primary-100 font-medium"
                      >
                        {model}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommended for pill */}
                <div className="p-3.5 rounded-2xl bg-[#032320]/80 border border-primary-800/70 text-xs">
                  <span className="text-amber-300 font-bold block mb-0.5">Recommended For:</span>
                  <span className="text-white font-medium">{activeVehicle.idealFor}</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {activeVehicle.useTags.map((tag) => (
                      <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md bg-[#073934] text-primary-100 border border-primary-700/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Middle Column: 4 Clean Visual Spec Tiles (4 cols) */}
              <div className="lg:col-span-4 grid grid-cols-2 gap-3">
                {/* Tile 1: Seating */}
                <div className="bg-[#032421]/75 border border-primary-700/45 rounded-2xl p-3.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-300 flex items-center justify-center mb-2">
                    <Armchair size={17} />
                  </div>
                  <div className="text-[11px] text-primary-200 font-semibold uppercase">Seating Comfort</div>
                  <div className="text-xs font-bold text-white mt-0.5 leading-snug">{activeVehicle.seatingType}</div>
                </div>

                {/* Tile 2: AC */}
                <div className="bg-[#032421]/75 border border-primary-700/45 rounded-2xl p-3.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/15 text-teal-300 flex items-center justify-center mb-2">
                    <Wind size={17} />
                  </div>
                  <div className="text-[11px] text-primary-200 font-semibold uppercase">Air Conditioning</div>
                  <div className="text-xs font-bold text-white mt-0.5 leading-snug">{activeVehicle.acType}</div>
                </div>

                {/* Tile 3: Luggage */}
                <div className="bg-[#032421]/75 border border-primary-700/45 rounded-2xl p-3.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/15 text-amber-300 flex items-center justify-center mb-2">
                    <Luggage size={17} />
                  </div>
                  <div className="text-[11px] text-primary-200 font-semibold uppercase">Luggage Capacity</div>
                  <div className="text-xs font-bold text-white mt-0.5 leading-snug">{activeVehicle.luggage}</div>
                </div>

                {/* Tile 4: Driver */}
                <div className="bg-[#032421]/75 border border-primary-700/45 rounded-2xl p-3.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-400/15 text-rose-300 flex items-center justify-center mb-2">
                    <ShieldCheck size={17} />
                  </div>
                  <div className="text-[11px] text-primary-200 font-semibold uppercase">Driver & Safety</div>
                  <div className="text-xs font-bold text-white mt-0.5 leading-snug">Verified Chauffeur • GPS Monitored</div>
                </div>
              </div>

              {/* Right Column: Unified Clean Action Center (3 cols) */}
              <div className="lg:col-span-3 flex flex-col justify-center space-y-3 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#032421]/95 to-[#06332f]/80 border border-primary-600/50 text-center shadow-lg">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-center gap-1">
                    <Zap size={13} /> Instant Dispatch 24×7
                  </div>
                  <div className="text-sm font-bold text-white">
                    Need the {activeVehicle.seats}-Seater?
                  </div>
                  <p className="text-[11px] text-primary-200/90 leading-snug">
                    Get best round-trip tariff & driver confirmation in 2 minutes.
                  </p>
                </div>

                {/* THE ONLY 2 BUTTONS NEEDED */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-4 rounded-xl text-sm font-bold shadow-lg shadow-emerald-950/60 justify-center inline-flex items-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <WhatsAppIcon size={18} className="text-white" />
                  <span>Enquire on WhatsApp</span>
                </a>

                <a
                  href={`tel:${SITE_CONFIG.business.phones[0]}`}
                  className="btn bg-white/10 hover:bg-white/20 text-white py-2.5 px-4 rounded-xl text-xs font-semibold justify-center inline-flex items-center gap-2 transition-all border border-white/15"
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
