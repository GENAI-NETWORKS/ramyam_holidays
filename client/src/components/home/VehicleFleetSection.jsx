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
  CheckCircle2,
  Camera,
} from 'lucide-react';
import WhatsAppIcon from '../WhatsAppIcon';
import SectionHeading from '../SectionHeading';
import { FLEET_CATEGORIES, VEHICLE_FLEET } from '../../data/vehicles';
import { SITE_CONFIG } from '../../data/siteConfig';

// ─── ALL 6 AUTHENTIC RAMYAM HOLIDAYS FLEET PHOTOS ─────────────────────────────
const FLEET_PHOTOS = [
  {
    id: 'coach-ext',
    src: encodeURI('/images/WhatsApp Image 2026-10-24 at 8.46.32 AM.jpeg'),
    label: 'Spartan Luxury Coach',
    caption: 'Air-suspension 36/45/54-seater tourist coach for school excursions & college IV tours',
    badge: 'Large Tour Coach',
    seatsRange: '36, 45, 54 Seats',
    categoryKey: 'bus',
    targetSeat: 54,
    features: ['Air Suspension Coach', 'Pushback Recliners', 'Dedicated Luggage Bay', 'Verified Driver'],
  },
  {
    id: 'coach-int',
    src: encodeURI('/images/WhatsApp Image 2026-10-24 at 8.46.30 AM.jpeg'),
    label: 'Coach Recliner Cabin',
    caption: 'Executive 2x2 pushback seats with ample legroom, reading lamps & individual AC vents',
    badge: 'Coach Recliners',
    seatsRange: '36 – 54 Seats',
    categoryKey: 'bus',
    targetSeat: 45,
    features: ['High-Back Recliners', 'Individual AC Vents', 'Overhead Luggage Racks', 'Clean Curtains'],
  },
  {
    id: 'urbania-int',
    src: encodeURI('/images/WhatsApp Image 2026-10-24 at 9.37.30 AM (1).jpeg'),
    label: 'Maharaja Urbania Lounge',
    caption: 'VIP Force Urbania with plush cream leather captain seats & ambient starlight ceiling',
    badge: 'Urbania VIP Lounge',
    seatsRange: '10, 14, 17 Seats',
    categoryKey: 'tempo',
    targetSeat: 17,
    features: ['Plush Leather Seats', 'Ambient Starlight Ceiling', 'High-Fidelity Audio', 'USB Fast Charging'],
  },
  {
    id: 'tempo-neon',
    src: encodeURI('/images/WhatsApp Image 2026-10-24 at 8.46.31 AM.jpeg'),
    label: 'Tempo Neon Mood Interior',
    caption: 'Custom neon mood lighting, captain seats, individual armrests & smooth highway comfort',
    badge: 'Mood Lighting Fleet',
    seatsRange: '12, 14, 18 Seats',
    categoryKey: 'tempo',
    targetSeat: 14,
    features: ['Neon Mood Lighting', 'Captain Armrests', 'Smooth Highway Ride', 'Spacious Center Aisle'],
  },
  {
    id: 'tempo-ext',
    src: encodeURI('/images/WhatsApp Image 2026-10-24 at 9.37.30 AM.jpeg'),
    label: 'Force Traveller Night Fleet',
    caption: 'LED front grille, high-illumination highway beams & certified drivers for safe 24x7 night travel',
    badge: 'Night Tour Ready',
    seatsRange: '9, 10, 14, 17, 18 Seats',
    categoryKey: 'tempo',
    targetSeat: 12,
    features: ['Illuminated LED Grille', 'Highway Safe Beams', 'GPS Tracking', '24x7 Night Travel Support'],
  },
  {
    id: 'celebration-van',
    src: encodeURI('/images/WhatsApp Image 2026-10-24 at 9.37.31 AM.jpeg'),
    label: 'Celebration Luxury Van',
    caption: 'Roof-mounted LED video screen, party sound system & family-friendly wide aisle',
    badge: 'Family & Group Special',
    seatsRange: '10 – 18 Seats',
    categoryKey: 'tempo',
    targetSeat: 18,
    features: ['Overhead LED Screen', 'Surround Sound System', 'Family Comfort Seating', 'Ample Boot Space'],
  },
];

const VehicleFleetSection = () => {
  // Default to 17-seater
  const [selectedSeat, setSelectedSeat] = useState(17);
  // Active photo ID out of the 6 authentic images
  const [activePhotoId, setActivePhotoId] = useState('urbania-int');

  // Active vehicle data
  const activeVehicle = useMemo(() => {
    return VEHICLE_FLEET.find((v) => v.seats === selectedSeat) || VEHICLE_FLEET[0];
  }, [selectedSeat]);

  // Active photo object
  const activePhoto = useMemo(() => {
    return FLEET_PHOTOS.find((p) => p.id === activePhotoId) || FLEET_PHOTOS[0];
  }, [activePhotoId]);

  // When seat size changes, smartly auto-select the best matching photo
  const handleSelectSeat = (seats) => {
    setSelectedSeat(seats);
    if (seats >= 34) {
      setActivePhotoId('coach-ext');
    } else if (seats >= 21) {
      setActivePhotoId('coach-int');
    } else if (seats >= 14) {
      setActivePhotoId('urbania-int');
    } else if (seats >= 9) {
      setActivePhotoId('tempo-neon');
    } else {
      setActivePhotoId('celebration-van');
    }
  };

  // Active category key
  const activeCategoryKey = activeVehicle.categoryKey;

  // WhatsApp link generator for spotlight vehicle
  const waUrl = useMemo(() => {
    const text = encodeURIComponent(
      `Hello Ramyam Holidays, I want to check rates and book the ${activeVehicle.name} (${activeVehicle.seats} Seater) for our upcoming trip.`
    );
    return `https://wa.me/${SITE_CONFIG.business.whatsapp}?text=${text}`;
  }, [activeVehicle]);

  return (
    <section className="section bg-white text-neutral-800 relative" id="tourist-vehicles">
      <div className="container-site">
        
        {/* ─── 1. SECTION HEADER (CLEAN WHITE THEME + BRAND PALETTE) ─────────── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8">
          {/* 24x7 Highlight Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span>Available 24 × 7 • Instant Dispatch Across Coimbatore</span>
          </div>

          <SectionHeading
            eyebrow="Comprehensive Tourist Vehicle Fleet"
            title={<>All Types of Tourist Vehicles from <span className="gradient-text">4 to 54 Seater</span></>}
            description="Whether it's a family getaway, school excursion, college industrial visit, or corporate offsite, we have the exact seating capacity you need."
            center
          />
        </div>

        {/* ─── 2. VALUE HIGHLIGHTS (LOGO PALETTE: GOLD, ROSE & EMERALD) ─────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* School: Golden Sun Yellow */}
          <div className="bg-amber-50/50 border border-amber-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center flex-shrink-0">
              <GraduationCap size={22} />
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                <span>School Excursions</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-200/60 text-amber-800 font-bold">Safety Certified</span>
              </div>
              <div className="text-xs text-neutral-600 mt-0.5">36, 45 & 54 Seater AC Coaches • Teachers Stay Free</div>
            </div>
          </div>

          {/* College IV: Logo Coral / Rose Red */}
          <div className="bg-rose-50/50 border border-rose-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-rose-500/15 text-rose-600 flex items-center justify-center flex-shrink-0">
              <Sparkles size={22} />
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                <span>College IV Packages</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-200/60 text-rose-800 font-bold">DJ & Campfire</span>
              </div>
              <div className="text-xs text-neutral-600 mt-0.5">Pushback Recliners • Powerful Audio • IV Permissions</div>
            </div>
          </div>

          {/* Corporate: Logo Palm Emerald */}
          <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/15 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <Briefcase size={22} />
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                <span>Corporate Offsites</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-200/60 text-emerald-800 font-bold">GST Invoice</span>
              </div>
              <div className="text-xs text-neutral-600 mt-0.5">Executive Innova Crystas & Luxury Coaches</div>
            </div>
          </div>
        </div>

        {/* ─── 3. CATEGORY SWITCHER CARDS (4 CLEAN CARDS ON WHITE) ─────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
          {FLEET_CATEGORIES.map((cat) => {
            const isCatActive = activeCategoryKey === cat.id;
            const IconComponent =
              cat.id === 'cabs' ? Car : cat.id === 'tempo' ? Bus : cat.id === 'minibus' ? Users : ShieldCheck;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelectSeat(cat.seatNumbers[0])}
                className={`text-left p-4 rounded-2xl transition-all duration-200 cursor-pointer border ${
                  isCatActive
                    ? 'bg-primary-700 text-white border-primary-700 shadow-md scale-[1.01]'
                    : 'bg-neutral-50/80 border-neutral-200/90 text-neutral-800 hover:bg-white hover:border-primary-400 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isCatActive ? 'bg-white/20 text-white' : 'bg-primary-100/70 text-primary-700'
                    }`}
                  >
                    <IconComponent size={19} />
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isCatActive
                        ? 'bg-amber-300 text-primary-950'
                        : 'bg-neutral-200/80 text-neutral-700'
                    }`}
                  >
                    {cat.seatsRange}
                  </span>
                </div>
                <h4 className={`font-bold text-sm ${isCatActive ? 'text-white' : 'text-neutral-900'}`}>{cat.title}</h4>
                <p className={`text-[11px] mt-0.5 line-clamp-1 ${isCatActive ? 'text-primary-100' : 'text-neutral-500'}`}>
                  {cat.topModels}
                </p>
              </button>
            );
          })}
        </div>

        {/* ─── 4. INTERACTIVE SEATING CAPACITY RAIL (ALL 15 SIZES) ─────────── */}
        <div className="bg-neutral-100/70 border border-neutral-200 rounded-2xl p-3 sm:p-4 mb-8">
          <div className="flex items-center justify-between gap-2 mb-2 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
              <span>Select Exact Seating Capacity:</span>
            </span>
            <span className="text-xs text-primary-700 font-semibold">
              Currently Selected: <strong className="underline text-neutral-900">{activeVehicle.seats} Seater</strong>
            </span>
          </div>

          {/* Horizontal scrollable pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 pt-1 scrollbar-thin">
            {VEHICLE_FLEET.map((v) => {
              const isSelected = v.seats === selectedSeat;
              return (
                <button
                  key={v.id}
                  onClick={() => handleSelectSeat(v.seats)}
                  className={`flex-shrink-0 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-primary-700 text-white shadow-md shadow-primary-700/30 scale-105 border-primary-700'
                      : 'bg-white text-neutral-700 hover:bg-neutral-50 hover:text-primary-700 border border-neutral-200'
                  }`}
                >
                  <span>{v.seats}</span>
                  <span className={`text-[10px] font-normal ${isSelected ? 'text-primary-100' : 'text-neutral-400'}`}>
                    Seats
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── 5. SPOTLIGHT CARD WITH INTERACTIVE 6-PHOTO SELECTOR ─────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVehicle.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-card hover:shadow-xl transition-shadow"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Real Vehicle Photo Showcase with 6-Photo Thumbnail Selector (5 cols) */}
              <div className="lg:col-span-5 space-y-3">
                <div className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm aspect-[4/3] group">
                  <img
                    src={activePhoto.src}
                    alt={activePhoto.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Photo tag badge */}
                  <div className="absolute top-3 left-3 bg-primary-900/85 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
                    <Camera size={13} className="text-amber-300" />
                    <span>{activePhoto.label}</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-amber-400 text-neutral-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-sm">
                    {activePhoto.badge}
                  </div>
                  {/* Caption bar */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-3 pt-6 text-white text-xs leading-snug">
                    {activePhoto.caption}
                  </div>
                </div>

                {/* 6 Clickable Thumbnails to switch spotlight photo */}
                <div>
                  <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span>Click to View Fleet Photos (6 Authentic Photos):</span>
                    <span className="text-primary-700 font-semibold lowercase">
                      {activePhoto.seatsRange}
                    </span>
                  </div>
                  <div className="grid grid-cols-6 gap-1.5">
                    {FLEET_PHOTOS.map((photo) => {
                      const isActive = photo.id === activePhotoId;
                      return (
                        <button
                          key={photo.id}
                          onClick={() => setActivePhotoId(photo.id)}
                          title={`${photo.label} (${photo.badge})`}
                          className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                            isActive
                              ? 'border-primary-700 ring-2 ring-primary-500/40 scale-105 shadow-md'
                              : 'border-neutral-200 opacity-70 hover:opacity-100 hover:border-primary-400'
                          }`}
                        >
                          <img
                            src={photo.src}
                            alt={photo.label}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Middle Column: Seating Specs & Details (4 cols) */}
              <div className="lg:col-span-4 space-y-4">
                {/* Category & Status */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-100">
                    {activeVehicle.categoryName}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    24x7 Ready
                  </span>
                </div>

                {/* Seat Number & Title */}
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-black text-primary-700 tracking-tight">
                    {activeVehicle.seats}
                  </span>
                  <div>
                    <div className="text-xs uppercase font-extrabold text-amber-600 tracking-wider">Seater AC Tourist Vehicle</div>
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-800">{activeVehicle.name}</h3>
                  </div>
                </div>

                {/* Fleet models available */}
                <div>
                  <div className="text-[11px] uppercase font-bold text-neutral-500 tracking-wider mb-1.5">
                    Available Models:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeVehicle.models.map((model) => (
                      <span
                        key={model}
                        className="text-xs px-2.5 py-1 rounded-lg bg-neutral-100 border border-neutral-200/80 text-neutral-800 font-semibold"
                      >
                        {model}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 4 Crisp Visual Spec Tiles on Light Cards */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-2.5">
                    <div className="flex items-center gap-1.5 text-primary-700 text-[11px] font-bold uppercase">
                      <Armchair size={14} />
                      <span>Comfort</span>
                    </div>
                    <div className="text-xs font-semibold text-neutral-700 mt-0.5 leading-snug">{activeVehicle.seatingType}</div>
                  </div>

                  <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-2.5">
                    <div className="flex items-center gap-1.5 text-teal-700 text-[11px] font-bold uppercase">
                      <Wind size={14} />
                      <span>AC System</span>
                    </div>
                    <div className="text-xs font-semibold text-neutral-700 mt-0.5 leading-snug">{activeVehicle.acType}</div>
                  </div>

                  <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-2.5">
                    <div className="flex items-center gap-1.5 text-amber-700 text-[11px] font-bold uppercase">
                      <Luggage size={14} />
                      <span>Luggage</span>
                    </div>
                    <div className="text-xs font-semibold text-neutral-700 mt-0.5 leading-snug">{activeVehicle.luggage}</div>
                  </div>

                  <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-2.5">
                    <div className="flex items-center gap-1.5 text-emerald-700 text-[11px] font-bold uppercase">
                      <ShieldCheck size={14} />
                      <span>Safety</span>
                    </div>
                    <div className="text-xs font-semibold text-neutral-700 mt-0.5 leading-snug">Verified Chauffeur • GPS</div>
                  </div>
                </div>

                {/* Recommended For */}
                <div className="text-xs text-neutral-600 bg-amber-50/40 border border-amber-200/60 rounded-xl p-2.5">
                  <strong className="text-neutral-800">Best For: </strong>
                  <span>{activeVehicle.idealFor} ({activeVehicle.useTags.join(', ')})</span>
                </div>
              </div>

              {/* Right Column: Unified Clean Action Card (3 cols) */}
              <div className="lg:col-span-3 flex flex-col justify-center space-y-3.5 p-5 rounded-2xl bg-gradient-to-b from-primary-800 to-primary-900 text-white text-center shadow-lg">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center justify-center gap-1">
                    <Zap size={13} /> Instant Dispatch 24×7
                  </div>
                  <div className="text-base font-bold text-white">
                    Need the {activeVehicle.seats}-Seater?
                  </div>
                  <p className="text-xs text-primary-100/90 leading-snug">
                    Get best tariff quote & vehicle confirmation in 2 minutes.
                  </p>
                </div>

                {/* Instant Action Buttons */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-4 rounded-xl text-sm font-bold shadow-md justify-center inline-flex items-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <WhatsAppIcon size={18} className="text-white" />
                  <span>Enquire on WhatsApp</span>
                </a>

                <a
                  href={`tel:${SITE_CONFIG.business.phones[0]}`}
                  className="btn bg-white text-primary-900 hover:bg-neutral-100 py-2.5 px-4 rounded-xl text-xs font-bold justify-center inline-flex items-center gap-2 transition-all shadow-sm"
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
