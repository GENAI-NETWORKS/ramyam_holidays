import { Link } from 'react-router-dom';
import {
  Phone,
  MapPin,
  Clock,
  Zap,
  Facebook,
  Instagram,
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

const FOOTER_LINKS = {
  services: [
    { label: 'Domestic Tours', path: '/services/domestic-tour-packages' },
    { label: 'International Tours', path: '/services/international-tour-packages' },
    { label: 'Honeymoon Packages', path: '/services/honeymoon-packages' },
    { label: 'Pilgrimage Tours', path: '/services/pilgrimage-tour-packages' },
    { label: 'Flight Booking', path: '/services/flight-ticket-booking' },
    { label: 'Visa Assistance', path: '/services/visa-assistance' },
    { label: 'Car Rental', path: '/services/car-rental-cab-services' },
  ],
  destinations: [
    { label: 'Kerala', path: '/destinations/kerala' },
    { label: 'Ooty & Kodaikanal', path: '/destinations/ooty-kodaikanal' },
    { label: 'Munnar', path: '/destinations/munnar' },
    { label: 'Goa', path: '/destinations/goa' },
    { label: 'Andaman Islands', path: '/destinations/andaman' },
    { label: 'Dubai', path: '/destinations/dubai' },
    { label: 'Kashmir', path: '/destinations/kashmir' },
  ],
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'All Services', path: '/services' },
    { label: 'All Destinations', path: '/destinations' },
    { label: 'Tour Packages', path: '/packages' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms of Service', path: '/terms' },
  ],
};

const SOCIAL_ICONS = {
  facebook: Facebook,
  instagram: Instagram,
};

const Footer = () => {
  const { business, social } = SITE_CONFIG;
  const { address, phones, phonesFormatted, email, openingHours } = business;
  const fullAddress = `${address.street}, ${address.locality}, ${address.city}, ${address.state} ${address.postalCode}`;

  return (
    <footer role="contentinfo" className="bg-neutral-900 text-neutral-300">
      {/* Main footer content */}
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4 transition-transform hover:scale-[1.02]" aria-label="Ramyam Holidays - Home">
              <div className="bg-white px-3.5 py-2 rounded-2xl shadow-md inline-block">
                <img
                  src="/images/logo.png"
                  alt="Ramyam Holidays"
                  className="h-14 sm:h-16 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-sm leading-relaxed mb-5">
              A trusted travel agency in Coimbatore, helping travellers from across Tamil Nadu
              discover India and the world since our founding.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {Object.entries(social).map(([platform, url]) => {
                const Icon = SOCIAL_ICONS[platform];
                if (!Icon) return null;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-primary-600 flex items-center justify-center transition-colors"
                    aria-label={`Ramyam Holidays on ${platform}`}
                  >
                    <Icon size={16} className="text-neutral-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Popular Destinations
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.destinations.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Contact Us
            </h3>

            {/* NAP - Name, Address, Phone (schema-friendly) */}
            <address className="not-italic space-y-4" itemScope itemType="https://schema.org/TravelAgency">
              <meta itemProp="name" content={business.name} />

              <div className="flex gap-3">
                <MapPin size={16} className="text-primary-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-sm leading-relaxed" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <span itemProp="streetAddress">{address.street}</span>,{' '}
                  <span itemProp="addressLocality">{address.locality}</span>,{' '}
                  <span itemProp="addressRegion">{address.city}</span>,{' '}
                  <span itemProp="addressRegion">{address.state}</span>{' '}
                  <span itemProp="postalCode">{address.postalCode}</span>,{' '}
                  <span itemProp="addressCountry">{address.country}</span>
                </p>
              </div>

              <div className="space-y-2">
                {phones.map((phone, i) => (
                  <div key={phone} className="flex gap-3 items-center">
                    <Phone size={16} className="text-primary-400 flex-shrink-0" aria-hidden="true" />
                    <a
                      href={`tel:${phone}`}
                      className="text-sm hover:text-primary-400 transition-colors"
                      itemProp="telephone"
                    >
                      {phonesFormatted[i]}
                    </a>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 items-center pt-1">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <div className="text-sm font-semibold text-emerald-400">
                  Available 24 × 7 (Round the Clock)
                </div>
              </div>
            </address>
          </div>
        </div>

        {/* Local areas served */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <p className="text-xs text-neutral-500 text-center leading-relaxed">
            <span className="text-neutral-400 font-semibold">Serving: </span>
            Coimbatore, Peelamedu, Saibaba Colony, RS Puram, Gandhipuram, Singanallur,
            Race Course, Tiruppur, Pollachi, and all of Tamil Nadu
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="container-site py-5 flex items-center justify-center text-xs">
          <a
            href="https://genaitechnology.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-primary-400 transition-colors group"
          >
            <span>Powered by</span>
            <span className="font-semibold text-neutral-300 group-hover:text-primary-300 underline-offset-4 group-hover:underline">
              Gen-AI Tech | IT Solutions Salem
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
