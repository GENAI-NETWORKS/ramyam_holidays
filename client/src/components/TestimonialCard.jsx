import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * TestimonialCard component
 */
const TestimonialCard = ({ testimonial, index = 0 }) => {
  const { name, location, rating, text, destination, avatar } = testimonial;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
      className="card p-6 flex flex-col gap-4 h-full"
    >
      <div className="flex items-start justify-between gap-3">
        <Quote size={32} className="text-primary-200 flex-shrink-0 -mt-1" aria-hidden="true" />
        <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < rating ? 'text-amber-500 fill-amber-500' : 'text-neutral-200'}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      <p className="text-neutral-600 text-sm leading-relaxed flex-1 italic">"{text}"</p>

      {destination && (
        <div className="badge badge-primary text-xs self-start">{destination}</div>
      )}

      <div className="flex items-center gap-3 pt-2 border-t border-neutral-100">
        <div
          className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          aria-hidden="true"
        >
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-neutral-800 text-sm">{name}</p>
          <p className="text-xs text-neutral-500">{location}</p>
        </div>
      </div>
    </motion.article>
  );
};

export default TestimonialCard;
