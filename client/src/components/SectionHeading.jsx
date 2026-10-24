import { motion } from 'framer-motion';

/**
 * SectionHeading consistent heading block used across all sections.
 * Props:
 *   - eyebrow: string small label above the heading
 *   - title: string main H2 (or specified tag)
 *   - description: string optional paragraph
 *   - centered: boolean center-align (default: true)
 *   - as: string heading tag (default: 'h2')
 */
const SectionHeading = ({
  eyebrow,
  title,
  description,
  centered = true,
  as: Tag = 'h2',
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`${centered ? 'text-center' : ''} ${className}`}
    >
      {eyebrow && (
        <div className="inline-block mb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-600">
            {eyebrow}
          </span>
        </div>
      )}
      <Tag className="font-bold text-neutral-900 text-balance">{title}</Tag>
      {description && (
        <p className={`mt-4 text-neutral-600 leading-relaxed text-balance ${centered ? 'max-w-2xl mx-auto' : 'max-w-prose'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
