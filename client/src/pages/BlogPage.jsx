import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import Breadcrumbs from '../components/Breadcrumbs';
import { blogPosts, BLOG_CATEGORIES } from '../data/blog';

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <>
      <SEO
        title="Travel Blog | Tips, Guides & Destination Stories | Ramyam Holidays"
        description="Read travel tips, destination guides, visa guides and honeymoon inspiration on the Ramyam Holidays blog. Helping Coimbatore travellers plan better holidays."
        canonicalPath="/blog"
        breadcrumbs={[{ name: 'Blog', path: '/blog' }]}
        keywords="travel blog Coimbatore, travel tips India, destination guides, honeymoon travel guide"
      />

      <main id="main-content">
        {/* Hero */}
        <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary-800 to-primary-600 overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden="true" />
          <div className="container-site relative z-10">
            <Breadcrumbs items={[{ label: 'Blog', path: '/blog' }]} />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <h1 className="text-white font-bold text-4xl md:text-5xl mb-4">Travel Blog</h1>
              <p className="text-primary-200 text-lg max-w-2xl">
                Expert travel tips, destination guides, visa information, and honeymoon inspiration, all from Coimbatore's favourite travel agency.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section">
          <div className="container-site">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-10" role="list" aria-label="Blog categories">
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  role="listitem"
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-primary-700 text-white shadow-md'
                      : 'bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-700 border border-neutral-200'
                  }`}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Blog grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="card-hover group flex flex-col h-full"
                    aria-label={`Read: ${post.title}`}
                  >
                    {/* Cover image */}
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={post.coverImage}
                        alt={post.coverImageAlt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        width={480}
                        height={270}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="badge badge-primary text-xs">{post.category}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      {/* Meta */}
                      <div className="flex items-center gap-3 text-xs text-neutral-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar size={11} aria-hidden="true" />
                          <time dateTime={post.publishDate}>
                            {new Date(post.publishDate).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </time>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={11} aria-hidden="true" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <h2 className="font-bold text-neutral-800 text-base leading-snug mb-2 line-clamp-3 group-hover:text-primary-700 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-neutral-500 text-sm leading-relaxed flex-1 line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="flex items-center gap-1 text-xs text-neutral-400">
                            <Tag size={10} aria-hidden="true" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 mt-4 text-primary-700 text-sm font-semibold">
                        Read Article
                        <ArrowRight size={14} aria-hidden="true" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-neutral-400">
                <p className="text-lg">No posts in this category yet.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default BlogPage;
