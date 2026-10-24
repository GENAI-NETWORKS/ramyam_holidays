import { useState, useMemo } from 'react';
import { SlidersHorizontal, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import Breadcrumbs from '../components/Breadcrumbs';
import PackageCard from '../components/PackageCard';
import {
  packages,
  PACKAGE_CATEGORIES,
  PACKAGE_TYPES,
  BUDGET_FILTERS,
  getPackagesByCategory,
  getPackagesByType,
  getPackagesByBudget,
} from '../data/packages';

const PackagesPage = () => {
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let result = packages;
    if (typeFilter !== 'all') result = result.filter((p) => p.type === typeFilter);
    if (categoryFilter !== 'all') result = result.filter((p) => p.category === categoryFilter);
    if (budgetFilter !== 'all') result = result.filter((p) => p.price <= Number(budgetFilter));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.destination.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [typeFilter, categoryFilter, budgetFilter, searchQuery]);

  const clearFilters = () => {
    setTypeFilter('all');
    setCategoryFilter('all');
    setBudgetFilter('all');
    setSearchQuery('');
  };

  const hasActiveFilters =
    typeFilter !== 'all' || categoryFilter !== 'all' || budgetFilter !== 'all' || searchQuery;

  return (
    <>
      <SEO
        title="Tour Packages from Coimbatore | Domestic & International | Ramyam Holidays"
        description="Browse 10+ curated tour packages from Coimbatore: family tours, honeymoon packages, pilgrimage tours, and international holidays. Filter by type, category and budget."
        canonicalPath="/packages"
        breadcrumbs={[{ name: 'Packages', path: '/packages' }]}
        keywords="tour packages from Coimbatore, holiday packages Coimbatore, domestic tour packages, international tour packages, honeymoon packages Coimbatore"
      />

      <main id="main-content">
        {/* Hero */}
        <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary-800 to-primary-600 overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden="true" />
          <div className="container-site relative z-10">
            <Breadcrumbs items={[{ label: 'Packages', path: '/packages' }]} />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <h1 className="text-white font-bold text-4xl md:text-5xl mb-4">Tour Packages</h1>
              <p className="text-primary-200 text-lg max-w-2xl">
                Hand-crafted packages from Coimbatore, domestic and international, at the best prices.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section">
          <div className="container-site">
            {/* Filters */}
            <div className="bg-white rounded-3xl shadow-card p-5 mb-8 border border-neutral-100">
              <div className="flex flex-wrap gap-4 items-end">
                {/* Search */}
                <div className="flex-1 min-w-[200px]">
                  <label htmlFor="pkg-search" className="form-label">
                    Search
                  </label>
                  <div className="relative">
                    <Search
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                      aria-hidden="true"
                    />
                    <input
                      id="pkg-search"
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search packages..."
                      className="form-input pl-9"
                    />
                  </div>
                </div>

                {/* Type */}
                <div className="min-w-[140px]">
                  <label htmlFor="pkg-type" className="form-label">Type</label>
                  <select
                    id="pkg-type"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="form-input"
                  >
                    {PACKAGE_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div className="min-w-[160px]">
                  <label htmlFor="pkg-category" className="form-label">Category</label>
                  <select
                    id="pkg-category"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="form-input"
                  >
                    {PACKAGE_CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>

                {/* Budget */}
                <div className="min-w-[160px]">
                  <label htmlFor="pkg-budget" className="form-label">Budget</label>
                  <select
                    id="pkg-budget"
                    value={budgetFilter}
                    onChange={(e) => setBudgetFilter(e.target.value)}
                    className="form-input"
                  >
                    {BUDGET_FILTERS.map((b) => (
                      <option key={b.value} value={b.value}>{b.label}</option>
                    ))}
                  </select>
                </div>

                {/* Clear */}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="btn btn-ghost btn-sm gap-1.5 mt-1.5"
                    aria-label="Clear all filters"
                  >
                    <X size={14} aria-hidden="true" />
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Results count */}
            <div className="flex items-center gap-2 mb-6 text-sm text-neutral-500">
              <SlidersHorizontal size={15} aria-hidden="true" />
              <span>
                Showing <strong className="text-neutral-800">{filtered.length}</strong> package
                {filtered.length !== 1 ? 's' : ''}
                {hasActiveFilters ? ' (filtered)' : ''}
              </span>
            </div>

            {/* Grid */}
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-20 text-neutral-400"
                >
                  <SlidersHorizontal size={48} className="mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium">No packages match your filters.</p>
                  <button onClick={clearFilters} className="btn btn-primary btn-sm mt-4">
                    Clear Filters
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  {filtered.map((pkg, i) => (
                    <PackageCard key={pkg.id} pkg={pkg} index={i} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </>
  );
};

export default PackagesPage;
