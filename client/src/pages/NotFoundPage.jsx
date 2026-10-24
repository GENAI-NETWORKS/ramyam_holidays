import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const NotFoundPage = () => {
  return (
    <>
      <SEO
        title="404: Page Not Found | Ramyam Holidays"
        description="The page you are looking for does not exist. Return to Ramyam Holidays homepage to explore our tour packages and travel services."
        canonicalPath="/404"
        noIndex
      />

      <main
        id="main-content"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-white"
      >
        <div className="container-site py-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            {/* 404 illustration */}
            <div className="relative inline-block mb-8">
              <div className="text-[120px] md:text-[160px] font-bold text-primary-100 leading-none select-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-primary-700 flex items-center justify-center shadow-glow">
                  <Search size={36} className="text-white" aria-hidden="true" />
                </div>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              Page Not Found
            </h1>
            <p className="text-neutral-500 text-lg max-w-md mx-auto mb-8 leading-relaxed">
              The page you are looking for may have moved, been renamed, or no longer exists.
              Let us help you find what you need.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="btn btn-primary btn-lg">
                <Home size={18} aria-hidden="true" />
                Back to Home
              </Link>
              <Link to="/packages" className="btn btn-outline btn-lg">
                Browse Packages
              </Link>
              <Link to="/contact" className="btn btn-ghost btn-lg">
                Contact Us
              </Link>
            </div>

            {/* Helpful links */}
            <div className="mt-12">
              <p className="text-neutral-400 text-sm mb-4">Popular pages</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  { label: 'Kerala Packages', path: '/destinations/kerala' },
                  { label: 'Dubai Package', path: '/destinations/dubai' },
                  { label: 'Ooty Package', path: '/destinations/ooty-kodaikanal' },
                  { label: 'Visa Assistance', path: '/services/visa-assistance' },
                  { label: 'Honeymoon Packages', path: '/services/honeymoon-packages' },
                  { label: 'Travel Gallery', path: '/gallery' },
                ].map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="badge badge-primary text-xs hover:bg-primary-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default NotFoundPage;
