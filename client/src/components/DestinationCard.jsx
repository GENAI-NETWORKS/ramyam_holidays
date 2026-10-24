import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * DestinationCard used in the destinations grid.
 * Props: destination object from destinations.js data
 */
const DestinationCard = ({ destination, index = 0, className = '' }) => {
  const {
    slug,
    name,
    tagline,
    region,
    image,
    imageAlt,
    rating,
    reviewCount,
    startingPrice,
    duration,
    bestTime,
  } = destination;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      className={`h-full ${className}`.trim()}
    >
      <Link
        to={`/destinations/${slug}`}
        className="card-hover group block h-full"
        aria-label={`Explore ${name} tour packages`}
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            width={400}
            height={300}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Rating badge */}
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 shadow">
              <Star size={12} className="text-amber-500 fill-amber-500" aria-hidden="true" />
              <span className="text-xs font-bold text-neutral-800">{rating}</span>
              <span className="text-xs text-neutral-500">({reviewCount})</span>
            </div>
          </div>

          {/* Region badge */}
          <div className="absolute top-3 left-3">
            <div className="badge badge-primary text-xs">{region}</div>
          </div>

          {/* Name overlay on image */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-bold text-lg leading-tight">{name}</h3>
            <p className="text-white/80 text-sm">{tagline}</p>
          </div>
        </div>

        {/* Card body */}
        <div className="p-4">
          <div className="flex flex-wrap gap-3 text-xs text-neutral-500 mb-3">
            <div className="flex items-center gap-1">
              <Clock size={12} aria-hidden="true" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={12} aria-hidden="true" />
              <span>Best: {bestTime}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-500">Starting from</p>
              <p className="text-primary-700 font-bold text-lg">
                ₹{startingPrice.toLocaleString('en-IN')}
                <span className="text-xs text-neutral-400 font-normal">/person</span>
              </p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-primary-50 group-hover:bg-primary-700 flex items-center justify-center transition-all duration-300">
              <ArrowRight
                size={16}
                className="text-primary-700 group-hover:text-white transition-colors"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default DestinationCard;
