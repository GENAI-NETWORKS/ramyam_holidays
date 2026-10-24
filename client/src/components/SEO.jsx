import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_CONFIG } from '../data/siteConfig';

/**
 * SEO component  per-page metadata, Open Graph, Twitter Cards, structured data.
 * Usage: <SEO title="..." description="..." canonicalPath="/about" />
 */
const SEO = ({
  title,
  description,
  canonicalPath = '',
  ogImage,
  ogType = 'website',
  article,
  breadcrumbs,
  structuredData,
  noIndex = false,
  keywords,
}) => {
  const fullTitle = title
    ? `${title} | Ramyam Holidays`
    : 'Ramyam Holidays | Travel Agency in Coimbatore';

  const metaDescription =
    description ||
    'Ramyam Holidays is a trusted travel agency in Coimbatore offering holiday packages, tour packages, flight bookings, visa assistance and more. Call +91 86680 98039.';

  const canonicalUrl = `${SITE_CONFIG.url}${canonicalPath}`;
  const shareImage = ogImage || `${SITE_CONFIG.url}/images/og-image.jpg`;

  // Base structured data array
  const schemas = [];

  // WebSite schema with SearchAction
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/packages?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  });

  // TravelAgency schema on every page
  schemas.push({
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'LocalBusiness'],
    name: SITE_CONFIG.business.name,
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
    sameAs: Object.values(SITE_CONFIG.social),
  });

  // Breadcrumb schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_CONFIG.url,
        },
        ...breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 2,
          name: crumb.name,
          item: `${SITE_CONFIG.url}${crumb.path}`,
        })),
      ],
    });
  }

  // Article schema for blog posts
  if (article) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: metaDescription,
      image: shareImage,
      author: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_CONFIG.url}/images/logo.png`,
        },
      },
      datePublished: article.publishDate,
      dateModified: article.updateDate || article.publishDate,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
    });
  }

  // Custom structured data (e.g., TouristTrip, FAQPage)
  if (structuredData) {
    if (Array.isArray(structuredData)) {
      schemas.push(...structuredData);
    } else {
      schemas.push(structuredData);
    }
  }

  return (
    <Helmet>
      {/* Primary meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Geo meta */}
      <meta name="geo.region" content="IN-TN" />
      <meta name="geo.placename" content="Coimbatore" />
      <meta name="geo.position" content="11.0168;76.9558" />
      <meta name="ICBM" content="11.0168, 76.9558" />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={shareImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE_CONFIG.name} - Travel Agency in Coimbatore`} />
      <meta property="og:site_name" content={SITE_CONFIG.name} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={shareImage} />
      <meta name="twitter:site" content="@ramyamholidays" />

      {/* Structured Data */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
