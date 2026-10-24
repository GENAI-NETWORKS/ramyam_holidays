import { Link } from 'react-router-dom';
import { Award, Heart, Users, MapPin, Phone, CheckCircle, Plane, Shield, ThumbsUp, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import Breadcrumbs from '../components/Breadcrumbs';
import { SITE_CONFIG } from '../data/siteConfig';

const VALUES = [
  { icon: Heart, title: 'Personalised Service', desc: 'Every trip is unique. We listen to your needs and craft itineraries that reflect your preferences, not a cookie-cutter package.' },
  { icon: Award, title: 'Transparent Pricing', desc: 'No hidden charges, no last-minute surprises. The price we quote is the price you pay, period.' },
  { icon: Users, title: 'End-to-End Support', desc: 'From the first enquiry call to the day you return home, we are available 24/7 to assist you.' },
  { icon: CheckCircle, title: 'Trusted & Reliable', desc: 'Over 15 years of experience and thousands of happy travellers make Ramyam Holidays the most trusted travel agency in Coimbatore.' },
];

const SERVICES = [
  { icon: Plane, title: 'Domestic & International Tours', desc: 'Curated packages to 50+ destinations across India and the world, tailored to your budget and dates.', link: '/services/domestic-tour-packages' },
  { icon: Shield, title: 'Visa & Passport Assistance', desc: 'Hassle-free visa and passport guidance for UAE, Singapore, Thailand, Schengen and more.', link: '/services/visa-assistance' },
  { icon: Users, title: 'Honeymoon & Family Packages', desc: 'Romantic escapes and family adventures crafted with special touches, from Maldives villas to Ooty hills.', link: '/services/honeymoon-packages' },
  { icon: MapPin, title: 'Car Rental & Cab Services', desc: 'AC cabs, Innova Crystas, Tempo Travellers, and coaches for local, outstation, and airport transfers.', link: '/services/car-rental-cab-services' },
  { icon: Award, title: 'Pilgrimage Tours', desc: 'Sacred journeys to Char Dham, Tirupati, Vaishno Devi, Rameshwaram and more, managed with devotion.', link: '/services/pilgrimage-tour-packages' },
  { icon: ThumbsUp, title: 'Corporate & Group Tours', desc: 'Professional corporate offsites, incentive tours, and group packages with GST billing for businesses.', link: '/services/corporate-tour-packages' },
];

const AboutPage = () => {
  const { business } = SITE_CONFIG;

  const breadcrumbs = [{ name: 'About', path: '/about' }];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.url },
      { '@type': 'ListItem', position: 2, name: 'About Us', item: `${SITE_CONFIG.url}/about` },
    ],
  };

  return (
    <>
      <SEO
        title="About Ramyam Holidays | Travel Agency in Coimbatore"
        description="Learn about Ramyam Holidays, a trusted travel agency in Coimbatore run by proprietor N. Rathinakumar. Serving travellers from Peelamedu and Coimbatore for over 15 years."
        canonicalPath="/about"
        breadcrumbs={breadcrumbs}
        structuredData={breadcrumbSchema}
        keywords="Ramyam Holidays about, travel agency Coimbatore history, N Rathinakumar travel agent"
      />

      <main id="main-content">
        {/* Page Hero */}
        <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary-800 to-primary-600 overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden="true" />
          <div className="container-site relative z-10">
            <Breadcrumbs items={[{ label: 'About Us', path: '/about' }]} />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <h1 className="text-white font-bold text-4xl md:text-5xl mb-4">About Ramyam Holidays</h1>
              <p className="text-primary-200 text-lg max-w-2xl">
                Your trusted travel partner in Coimbatore, crafting unforgettable journeys since our founding.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story */}
        <section className="section">
          <div className="container-site">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <motion.div
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-7"
              >
                <div className="inline-block badge badge-primary mb-4">Our Story</div>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-5">
                  From a Small Office in Peelamedu to Thousands of Happy Travellers
                </h2>
                <div className="space-y-4 text-neutral-600 leading-relaxed text-justify">
                  <p>
                    Ramyam Holidays was founded by <strong className="text-neutral-800">N. Rathinakumar</strong> with
                    a single, simple dream: to make quality travel accessible to every family in
                    Coimbatore. Located at 92, Ellaithottam Road, Peelamedu, we started as a small
                    travel desk and grew through word of mouth, honest service, and a genuine
                    passion for travel into one of Coimbatore's most trusted travel agencies.
                  </p>
                  <p>
                    Over the years, we have helped thousands of families discover Kerala's
                    backwaters, honeymooners find romance in the Maldives, pilgrim groups reach
                    the Char Dham temples, school children learn through educational tours, and
                    corporate teams bond in exotic destinations. Every trip we plan carries our
                    personal commitment to quality and reliability.
                  </p>
                  <p>
                    We are not just a travel agency; we are your travel partner. When you travel
                    with Ramyam Holidays, you travel with the confidence of knowing an experienced
                    team is with you every step of the way.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { value: '15+', label: 'Years of Service' },
                    { value: '5,000+', label: 'Happy Travellers' },
                    { value: '100+', label: 'Destinations Covered' },
                    { value: '4.9/5', label: 'Google Rating' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-primary-50 rounded-2xl p-4">
                      <div className="text-2xl font-bold text-primary-700">{stat.value}</div>
                      <div className="text-sm text-neutral-600 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-5 flex justify-center lg:justify-end w-full"
              >
                <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-xs xl:max-w-sm">
                  <div className="aspect-[4/5] max-h-[420px] rounded-3xl overflow-hidden bg-neutral-200 shadow-lg">
                    {/* TODO: Replace with actual office/proprietor photo */}
                    <img
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&auto=format&fit=crop"
                      alt="Ramyam Holidays office at Peelamedu, Coimbatore, exterior view"
                      className="w-full h-full object-cover"
                      width={600}
                      height={750}
                    />
                  </div>

                  {/* Floating card */}
                  <div className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 bg-white rounded-2xl shadow-xl p-4 sm:p-5 max-w-[180px] sm:max-w-[200px]">
                    <div className="text-primary-700 font-bold text-2xl sm:text-3xl mb-1">4.9</div>
                    <div className="flex gap-0.5 mb-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span key={i} className="text-amber-500 text-sm" aria-hidden="true">★</span>
                      ))}
                    </div>
                    <div className="text-xs text-neutral-500">from 500+ Google Reviews</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Proprietor */}
        <section className="section bg-neutral-50">
          <div className="container-site">
            <div className="max-w-3xl mx-auto text-center">
              <SectionHeading
                eyebrow="Meet the Founder"
                title="N. Rathinakumar, Proprietor"
                description="A passionate traveller and seasoned travel professional with over 15 years of experience in the tourism industry."
              />
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mt-8 bg-white rounded-3xl p-8 shadow-card"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-700 flex items-center justify-center mx-auto mb-4">
                  {/* TODO: Replace with actual proprietor photo */}
                  <span className="text-white text-3xl font-bold">NR</span>
                </div>
                <h3 className="font-bold text-xl text-neutral-900 mb-1">N. Rathinakumar</h3>
                <p className="text-primary-600 font-semibold text-sm mb-4">Proprietor, Ramyam Holidays</p>
                <p className="text-neutral-600 leading-relaxed text-sm text-justify">
                  With a deep love for travel and an unwavering commitment to customer satisfaction,
                  N. Rathinakumar founded Ramyam Holidays to make travel accessible, enjoyable, and
                  stress-free for every family in Coimbatore. His hands-on approach, attention to
                  detail, and personal involvement in every client's trip have been the cornerstone
                  of Ramyam Holidays' reputation. He is personally reachable at{' '}
                  <a href={`tel:${business.phones[0]}`} className="text-primary-700 font-semibold">
                    {business.phonesFormatted[0]}
                  </a>.
                </p>
                {/* TODO: Add more biographical details about N. Rathinakumar */}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section" aria-labelledby="values-heading">
          <div className="container-site">
            <SectionHeading
              eyebrow="Our Principles"
              title="What Sets Us Apart"
              description="At Ramyam Holidays, our values are not just words; they define every interaction we have with our clients."
              id="values-heading"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {VALUES.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center p-6 rounded-3xl bg-white shadow-card"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                    <value.icon size={26} className="text-primary-700" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-neutral-800 mb-2">{value.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="section bg-neutral-50" aria-labelledby="services-about-heading">
          <div className="container-site">
            <SectionHeading
              eyebrow="What We Offer"
              title="Complete Travel Services Under One Roof"
              description="From booking flights to arranging visas, from planning honeymoons to organising group tours, Ramyam Holidays handles it all."
              id="services-about-heading"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
              {SERVICES.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                >
                  <Link
                    to={service.link}
                    className="card-hover group flex gap-4 p-5 h-full"
                    aria-label={service.title}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-primary-50 group-hover:bg-primary-700 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                      <service.icon
                        size={22}
                        className="text-primary-700 group-hover:text-white transition-colors duration-300"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-800 text-sm mb-1 group-hover:text-primary-700 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-neutral-500 text-xs leading-relaxed">{service.desc}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/services" className="btn btn-primary">
                View All Services
                <ChevronRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="section bg-primary-50">
          <div className="container-site">
            <div className="max-w-2xl mx-auto text-center">
              <SectionHeading
                eyebrow="Find Us"
                title="Visit Our Office"
                description="We are conveniently located in Peelamedu, Coimbatore, easily accessible from all parts of the city."
              />
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mt-8 space-y-4"
              >
                <div className="flex items-start gap-3 text-left bg-white rounded-2xl p-4 shadow-sm">
                  <MapPin size={20} className="text-primary-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-neutral-800">Address</p>
                    <p className="text-neutral-600 text-sm">
                      {business.address.street}, {business.address.locality},{' '}
                      {business.address.city}, {business.address.state}{' '}
                      {business.address.postalCode}, {business.address.country}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-left bg-white rounded-2xl p-4 shadow-sm">
                  <Phone size={20} className="text-primary-600 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-neutral-800">Phone</p>
                    <div className="flex flex-wrap gap-3">
                      {business.phones.map((phone, i) => (
                        <a key={phone} href={`tel:${phone}`} className="text-primary-700 font-medium text-sm">
                          {business.phonesFormatted[i]}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="mt-8 flex gap-4 justify-center">
                <Link to="/contact" className="btn btn-primary">
                  Get Directions
                  <MapPin size={16} aria-hidden="true" />
                </Link>
                <a href={`tel:${business.phones[0]}`} className="btn btn-outline">
                  <Phone size={16} aria-hidden="true" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
