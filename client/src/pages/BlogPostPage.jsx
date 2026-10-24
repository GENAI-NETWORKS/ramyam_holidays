import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Tag, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { getBlogPostBySlug, blogPosts } from '../data/blog';
import { SITE_CONFIG } from '../data/siteConfig';

/**
 * Renders blog post markdown-like content with basic formatting.
 * For production, consider using a markdown parser like marked or react-markdown.
 */
const BlogContent = ({ content }) => {
  const lines = content.split('\n');
  const elements = [];
  let i = 0;
  let tableBuffer = null;

  while (i < lines.length) {
    const line = lines[i];

    // Table row
    if (line.startsWith('|')) {
      if (!tableBuffer) tableBuffer = [];
      tableBuffer.push(line);
      i++;
      continue;
    } else if (tableBuffer) {
      // Flush table
      const rows = tableBuffer.filter((r) => !/^\|-+/.test(r.replace(/\s/g, '')));
      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto my-6 rounded-xl border border-neutral-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-primary-50">
              {rows.slice(0, 1).map((row, ri) => (
                <tr key={ri}>
                  {row.split('|').filter(Boolean).map((cell, ci) => (
                    <th key={ci} className="px-4 py-2.5 font-semibold text-neutral-700 whitespace-nowrap">
                      {cell.trim()}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {rows.slice(1).map((row, ri) => (
                <tr key={ri} className="hover:bg-neutral-50">
                  {row.split('|').filter(Boolean).map((cell, ci) => (
                    <td key={ci} className="px-4 py-2.5 text-neutral-600">{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableBuffer = null;
      continue;
    }

    if (line.startsWith('# ')) {
      elements.push(<h1 key={i} className="text-3xl font-bold text-neutral-900 mt-6 mb-4">{line.slice(2)}</h1>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-2xl font-bold text-neutral-800 mt-8 mb-3">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-xl font-bold text-neutral-800 mt-6 mb-2">{line.slice(4)}</h3>);
    } else if (line.startsWith('- ')) {
      // Collect list items
      const listItems = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc list-inside space-y-1.5 my-4 text-neutral-600 pl-4">
          {listItems.map((item, li) => (
            <li key={li} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}
        </ul>
      );
      continue;
    } else if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />);
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(<p key={i} className="font-bold text-neutral-800 my-2">{line.replace(/\*\*/g, '')}</p>);
    } else if (line.trim()) {
      elements.push(
        <p
          key={i}
          className="text-neutral-600 leading-relaxed my-3"
          dangerouslySetInnerHTML={{
            __html: line
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/`(.*?)`/g, '<code class="bg-neutral-100 px-1.5 py-0.5 rounded text-primary-700 text-sm font-mono">$1</code>'),
          }}
        />
      );
    }
    i++;
  }

  return <div className="prose-like">{elements}</div>;
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) return <Navigate to="/blog" replace />;

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  const breadcrumbs = [
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${slug}` },
  ];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_CONFIG.url}${post.coverImage}`,
    author: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/images/logo.png`,
      },
    },
    datePublished: post.publishDate,
    dateModified: post.updateDate || post.publishDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/blog/${slug}`,
    },
    keywords: post.tags.join(', '),
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (e) { /* user cancelled */ }
    }
  };

  return (
    <>
      <SEO
        title={post.metaTitle || `${post.title} | Ramyam Holidays Blog`}
        description={post.metaDescription || post.excerpt}
        canonicalPath={`/blog/${slug}`}
        breadcrumbs={breadcrumbs}
        structuredData={articleSchema}
        ogImage={`${SITE_CONFIG.url}${post.coverImage}`}
        ogType="article"
        article={{ publishDate: post.publishDate, updateDate: post.updateDate }}
        keywords={post.tags.join(', ')}
      />

      <main id="main-content">
        {/* Hero */}
        <section className="relative pt-24 overflow-hidden" style={{ minHeight: '50vh' }}>
          <div className="absolute inset-0 z-0">
            <img
              src={post.coverImage}
              alt={post.coverImageAlt}
              className="w-full h-full object-cover"
              width={1200}
              height={600}
              fetchpriority="high"
            />
            <div className="hero-overlay absolute inset-0" aria-hidden="true" />
          </div>

          <div className="container-site relative z-10 py-16">
            <Breadcrumbs items={[
              { label: 'Blog', path: '/blog' },
              { label: post.category, path: '/blog' },
            ]} />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 max-w-3xl"
            >
              <span className="badge bg-accent-500 text-white mb-3">{post.category}</span>
              <h1 className="text-white font-bold text-3xl md:text-4xl leading-tight mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                <time
                  dateTime={post.publishDate}
                  className="flex items-center gap-1.5"
                >
                  <Calendar size={13} aria-hidden="true" />
                  {new Date(post.publishDate).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </time>
                <div className="flex items-center gap-1.5">
                  <Clock size={13} aria-hidden="true" />
                  {post.readTime}
                </div>
                <div>By {post.author}</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article body */}
        <section className="section">
          <div className="container-site">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Content */}
              <article className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <BlogContent content={post.content} />
                </motion.div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-neutral-100">
                  {post.tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1 badge bg-neutral-100 text-neutral-600 text-xs">
                      <Tag size={11} aria-hidden="true" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Share + back */}
                <div className="flex items-center gap-3 mt-6">
                  <Link to="/blog" className="btn btn-ghost btn-sm gap-1.5">
                    <ArrowLeft size={14} aria-hidden="true" />
                    Back to Blog
                  </Link>
                  {typeof navigator !== 'undefined' && navigator.share && (
                    <button onClick={handleShare} className="btn btn-outline btn-sm gap-1.5">
                      <Share2 size={14} aria-hidden="true" />
                      Share
                    </button>
                  )}
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* CTA Card */}
                  <div className="bg-primary-700 rounded-3xl p-6 text-white">
                    <h3 className="font-bold text-lg mb-2">Plan Your Trip</h3>
                    <p className="text-primary-200 text-sm mb-4 leading-relaxed">
                      Ready to visit? Get a personalised quote from Ramyam Holidays.
                    </p>
                    <div className="flex">
                      <Link to="/contact" className="btn bg-white text-primary-700 hover:bg-neutral-100 w-fit inline-flex px-5 py-2.5 rounded-xl text-sm">
                        Get Free Quote
                      </Link>
                    </div>
                  </div>

                  {/* Related posts */}
                  {relatedPosts.length > 0 && (
                    <div>
                      <h3 className="font-bold text-neutral-800 mb-4">Related Articles</h3>
                      <div className="space-y-4">
                        {relatedPosts.map((related) => (
                          <Link
                            key={related.id}
                            to={`/blog/${related.slug}`}
                            className="flex gap-3 group"
                          >
                            <img
                              src={related.coverImage}
                              alt={related.coverImageAlt}
                              className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                              width={64}
                              height={64}
                              loading="lazy"
                            />
                            <div>
                              <p className="text-sm font-medium text-neutral-700 group-hover:text-primary-700 transition-colors line-clamp-2 leading-snug">
                                {related.title}
                              </p>
                              <p className="text-xs text-neutral-400 mt-1">{related.readTime}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default BlogPostPage;
