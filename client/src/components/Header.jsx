import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  {
    label: 'Services',
    path: '/services',
    children: [
      { label: 'Domestic Tours', path: '/services/domestic-tour-packages' },
      { label: 'International Tours', path: '/services/international-tour-packages' },
      { label: 'Honeymoon Packages', path: '/services/honeymoon-packages' },
      { label: 'Family Holidays', path: '/services/family-holiday-packages' },
      { label: 'Pilgrimage Tours', path: '/services/pilgrimage-tour-packages' },
      { label: 'Corporate Tours', path: '/services/corporate-tour-packages' },
      { label: 'Flight Booking', path: '/services/flight-ticket-booking' },
      { label: 'Visa Assistance', path: '/services/visa-assistance' },
      { label: 'Car Rental', path: '/services/car-rental-cab-services' },
    ],
  },
  { label: 'Destinations', path: '/destinations' },
  { label: 'Packages', path: '/packages' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const mobileMenuRef = useRef(null);
  const menuBtnRef = useRef(null);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileOpen]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const menu = mobileMenuRef.current;
    if (!menu) return;

    const focusable = menu.querySelectorAll(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        menuBtnRef.current?.focus();
      }
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    first?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const toggleDropdown = useCallback((label) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  }, []);

  const isHome = location.pathname === '/';
  const isDarkHero = !isScrolled && isHome;
  const headerBg = isScrolled || !isHome
    ? 'bg-white shadow-md'
    : 'bg-transparent';

  const navColor = isDarkHero ? 'text-white' : 'text-neutral-700';

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center transition-transform hover:scale-[1.02]"
              aria-label="Ramyam Holidays - Home"
            >
              <div
                className={`py-1 px-2 sm:px-2.5 rounded-xl transition-all duration-300 flex items-center ${
                  isDarkHero
                    ? 'bg-white/95 backdrop-blur-md shadow-sm'
                    : ''
                }`}
              >
                <img
                  src="/images/logo.png"
                  alt="Ramyam Holidays"
                  className="h-12 sm:h-14 md:h-16 w-auto object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <div key={link.label} className="relative group">
                    <button
                      onClick={() => toggleDropdown(link.label)}
                      onMouseEnter={() => setActiveDropdown(link.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all
                        ${navColor} hover:bg-primary-50 hover:text-primary-700`}
                      aria-expanded={activeDropdown === link.label}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          activeDropdown === link.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          onMouseEnter={() => setActiveDropdown(link.label)}
                          onMouseLeave={() => setActiveDropdown(null)}
                          className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden"
                        >
                          {link.children.map((child) => (
                            <NavLink
                              key={child.path}
                              to={child.path}
                              className={({ isActive }) =>
                                `block px-4 py-2.5 text-sm font-medium transition-colors
                                ${isActive
                                  ? 'bg-primary-50 text-primary-700'
                                  : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-700'
                                }`
                              }
                            >
                              {child.label}
                            </NavLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg text-sm font-medium transition-all
                      ${isActive
                        ? 'bg-primary-50 text-primary-700'
                        : `${navColor} hover:bg-primary-50 hover:text-primary-700`
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )
              )}
            </nav>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center lg:hidden">
              <button
                ref={menuBtnRef}
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`p-2 rounded-xl transition-colors ${
                  isScrolled || !isHome
                    ? 'text-neutral-700 hover:bg-neutral-100'
                    : 'text-white hover:bg-white/20'
                }`}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              id="mobile-menu"
              ref={mobileMenuRef}
              role="navigation"
              aria-label="Mobile navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-1/2 sm:w-72 bg-white z-[60] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-end p-3.5 sm:p-4 border-b border-neutral-100">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-3 sm:p-4">
                {NAV_LINKS.map((link) => (
                  <div key={link.label}>
                    {link.children ? (
                      <div>
                        <button
                          onClick={() => toggleDropdown(link.label)}
                          className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                          aria-expanded={activeDropdown === link.label}
                        >
                          {link.label}
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${
                              activeDropdown === link.label ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === link.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden ml-3"
                            >
                              {link.children.map((child) => (
                                <NavLink
                                  key={child.path}
                                  to={child.path}
                                  className={({ isActive }) =>
                                    `block px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors mb-0.5
                                    ${isActive
                                      ? 'bg-primary-50 text-primary-700'
                                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-primary-700'
                                    }`
                                  }
                                >
                                  {child.label}
                                </NavLink>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <NavLink
                        to={link.path}
                        end={link.path === '/'}
                        className={({ isActive }) =>
                          `block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors mb-0.5
                          ${isActive
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary-700'
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                    )}
                  </div>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
