import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Breadcrumbs component
 * Props:
 *   - items: Array<{ label: string, path?: string }>  last item is current page (no link)
 */
const Breadcrumbs = ({ items = [], lightBg = false, className = '' }) => {
  const allItems = [{ label: 'Home', path: '/' }, ...items];

  const linkColor = lightBg
    ? 'text-neutral-600 hover:text-primary-600 font-medium'
    : 'text-white/90 hover:text-white font-medium hover:underline transition-colors';
  const sepColor = lightBg ? 'text-neutral-400' : 'text-white/60';
  const activeColor = lightBg ? 'text-neutral-900 font-semibold' : 'text-white font-semibold';

  return (
    <nav
      aria-label="Breadcrumb"
      className={
        lightBg
          ? `breadcrumb flex items-center gap-2 text-xs sm:text-sm flex-wrap ${className}`
          : `breadcrumb inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-xs sm:text-sm text-white flex-wrap shadow-md ${className}`
      }
    >
      {allItems.map((item, index) => {
        const isLast = index === allItems.length - 1;
        const isFirst = index === 0;

        return (
          <span key={index} className="flex items-center gap-1.5 sm:gap-2">
            {index > 0 && (
              <ChevronRight size={13} className={`${sepColor} flex-shrink-0`} aria-hidden="true" />
            )}
            {isLast ? (
              <span
                className={`${activeColor} truncate max-w-[200px] sm:max-w-xs md:max-w-md`}
                aria-current="page"
                title={item.label}
              >
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className={`${linkColor} flex items-center gap-1.5`}
              >
                {isFirst && <Home size={14} className="flex-shrink-0" aria-hidden="true" />}
                <span>{item.label}</span>
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
