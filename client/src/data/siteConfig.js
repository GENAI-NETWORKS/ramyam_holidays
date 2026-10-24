/**
 * RAMYAM HOLIDAYS - Site Configuration
 * Central source of truth for business info, NAP, and schema data.
 */

export const SITE_CONFIG = {
  name: 'Ramyam Holidays',
  tagline: 'Your Dream Journey Begins Here',
  description:
    'Ramyam Holidays is a trusted travel agency in Coimbatore, Tamil Nadu. We offer customised holiday packages, domestic and international tour packages, flight & train ticket booking, visa assistance, and more.',
  url: 'https://www.ramyamholidays.com', // TODO: Update to actual domain
  logo: '/images/logo.png', // TODO: Replace with actual logo
  ogImage: '/images/og-image.jpg', // 1200x630 share image

  // NAP (Name, Address, Phone) - IDENTICAL everywhere and in schema
  business: {
    name: 'Ramyam Holidays',
    proprietor: 'N. Rathinakumar',
    address: {
      street: '92, Ellaithottam Road',
      locality: 'Peelamedu',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      stateCode: 'TN',
      postalCode: '641004',
      country: 'India',
      countryCode: 'IN',
    },
    phones: ['+918668098039', '+919442468039'],
    phonesFormatted: ['+91 86680 98039', '+91 94424 68039'],
    whatsapp: '918668098039', // without + for wa.me link
    email: 'ramyamholidays@gmail.com', // TODO: Replace with actual email
    geo: {
      latitude: 11.0168,
      longitude: 76.9558,
    },
    openingHours: [
      'Mo-Sa 09:00-19:00',
      'Su 10:00-16:00',
    ],
    priceRange: '₹₹',
    areaServed: [
      'Coimbatore',
      'Peelamedu',
      'Saibaba Colony',
      'RS Puram',
      'Gandhipuram',
      'Singanallur',
      'Race Course',
      'Tiruppur',
      'Pollachi',
      'Tamil Nadu',
    ],
  },

  // Social media
  social: {
    facebook: 'https://facebook.com/ramyamholidays',
    instagram: 'https://instagram.com/ramyamholidays',
  },
};

export const SCHEMA_URLS = {
  travelAgency: {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'LocalBusiness'],
    name: SITE_CONFIG.business.name,
    alternateName: 'Ramyam Tours and Travels',
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/logo.png`,
    image: `${SITE_CONFIG.url}/images/og-image.jpg`,
    telephone: SITE_CONFIG.business.phones,
    email: SITE_CONFIG.business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.business.address.street,
      addressLocality: SITE_CONFIG.business.address.locality,
      addressRegion: SITE_CONFIG.business.address.stateCode,
      postalCode: SITE_CONFIG.business.address.postalCode,
      addressCountry: SITE_CONFIG.business.address.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.business.geo.latitude,
      longitude: SITE_CONFIG.business.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '10:00',
        closes: '16:00',
      },
    ],
    priceRange: SITE_CONFIG.business.priceRange,
    areaServed: SITE_CONFIG.business.areaServed.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    sameAs: Object.values(SITE_CONFIG.social),
    founder: {
      '@type': 'Person',
      name: SITE_CONFIG.business.proprietor,
    },
  },
};
