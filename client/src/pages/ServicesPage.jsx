import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import Breadcrumbs from '../components/Breadcrumbs';
import FAQAccordion from '../components/FAQAccordion';
import { services } from '../data/services';
import { SITE_CONFIG } from '../data/siteConfig';

const SERVICES_FAQ = [
  {
    question: 'Does Ramyam Holidays arrange customised tour packages?',
    answer: 'Yes, we specialise in fully customised tour packages. Tell us your destination, dates, group size, and budget, and we will design a personalised itinerary just for you, with no pre-packaged one-size-fits-all solutions.',
  },
  {
    question: 'Does Ramyam Holidays book international flight tickets from Coimbatore?',
    answer: 'Yes. We book both domestic and international flight tickets from Coimbatore (CBE) airport and nearby airports. We compare fares across airlines to get you the best available price.',
  },
  {
    question: 'Can Ramyam Holidays help with passport applications from Coimbatore?',
    answer: 'Yes. We guide you through the online Passport Seva Portal application process, prepare your document checklist, and help schedule your appointment at the Passport Seva Kendra in Coimbatore.',
  },
  {
    question: 'Does Ramyam Holidays arrange group tours?',
    answer: 'Yes. We organise group tours for friend groups, office teams, social clubs, school and college groups, and religious groups of all sizes. We offer special group discounts for 15+ travellers.',
  },
];

const servicesFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: SERVICES_FAQ.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

const ServicesPage = () => {
  return (
    <>
      <SEO
        title="Travel Services in Coimbatore | Tour Packages, Visa, Flights | Ramyam Holidays"
        description="Ramyam Holidays offers complete travel services in Coimbatore: domestic & international tours, honeymoon packages, visa assistance, flight booking, car rental and more. Call +91 86680 98039."
        canonicalPath="/services"
        breadcrumbs={[{ name: 'Services', path: '/services' }]}
        structuredData={servicesFaqSchema}
        keywords="travel services Coimbatore, tour packages Coimbatore, visa assistance Coimbatore, flight booking Coimbatore"
      />

      <main id="main-content">
        {/* Hero */}
        <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary-800 to-primary-600 overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden="true" />
          <div className="container-site relative z-10">
            <Breadcrumbs items={[{ label: 'Services', path: '/services' }]} />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <h1 className="text-white font-bold text-4xl md:text-5xl mb-4">
                Our Travel Services
              </h1>
              <p className="text-primary-200 text-lg max-w-2xl">
                Everything you need for a perfect holiday, under one roof in Coimbatore.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services grid */}
        <section className="section">
          <div className="container-site">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => {
                // Dynamically get icon from lucide
                const Icon = LucideIcons[service.icon] || LucideIcons.Star;

                return (
                  <motion.article
                    key={service.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Link
                      to={`/services/${service.slug}`}
                      className="card-hover group flex flex-col h-full p-6"
                      aria-label={service.name}
                    >
                      <div className="w-14 h-14 rounded-2xl bg-primary-50 group-hover:bg-primary-700 flex items-center justify-center mb-4 transition-colors duration-300 flex-shrink-0">
                        <Icon
                          size={26}
                          className="text-primary-700 group-hover:text-white transition-colors duration-300"
                          aria-hidden="true"
                        />
                      </div>

                      <h2 className="font-bold text-neutral-800 text-lg mb-2 group-hover:text-primary-700 transition-colors">
                        {service.name}
                      </h2>
                      <p className="text-neutral-500 text-sm leading-relaxed flex-1">
                        {service.shortDescription}
                      </p>

                      {service.destinations?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {service.destinations.slice(0, 4).map((dest) => (
                            <span key={dest} className="badge badge-primary text-xs">
                              {dest}
                            </span>
                          ))}
                          {service.destinations.length > 4 && (
                            <span className="badge bg-neutral-100 text-neutral-600 text-xs">
                              +{service.destinations.length - 4} more
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center gap-1.5 mt-4 text-primary-700 text-sm font-semibold group-hover:gap-2 transition-all">
                        Learn More
                        <ArrowRight size={14} aria-hidden="true" />
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section bg-neutral-50">
          <div className="container-site max-w-3xl mx-auto">
            <SectionHeading
              eyebrow="Common Questions"
              title="Services FAQs"
              description="Answers to the most common questions about our travel services."
            />
            <div className="mt-10">
              <FAQAccordion faqs={SERVICES_FAQ} />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-sm bg-primary-700">
          <div className="container-site text-center">
            <h2 className="text-white font-bold text-2xl mb-3">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-primary-200 mb-6 max-w-lg mx-auto text-sm">
              Talk to our travel experts. We will help you find the right package and services for your specific travel needs.
            </p>
            <Link to="/contact" className="btn btn-accent btn-lg">
              Contact Us Today
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default ServicesPage;
