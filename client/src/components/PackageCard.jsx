import { Link } from 'react-router-dom';
import { Star, Clock, Users, ArrowRight, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * PackageCard used in the packages grid.
 */
const PackageCard = ({ pkg, index = 0 }) => {
  const {
    slug,
    name,
    destination,
    type,
    image,
    imageAlt,
    duration,
    price,
    pricePerPerson,
    groupSize,
    rating,
    reviewCount,
    tags,
    inclusions,
    itinerarySummary,
  } = pkg;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: 'easeOut' }}
    >
      <Link
        to={`/packages/${slug}`}
        className="card-hover group flex flex-col h-full"
        aria-label={`View ${name} package details`}
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-video">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            width={480}
            height={270}
          />
          {/* Type badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`badge text-xs ${
                type === 'international'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-primary-100 text-primary-800'
              }`}
            >
              {type === 'international' ? 'International' : 'Domestic'}
            </span>
          </div>
          {/* Tags */}
          {tags?.[0] && (
            <div className="absolute top-3 right-3">
              <span className="badge badge-accent text-xs">
                <Tag size={10} aria-hidden="true" />
                {tags[0]}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <div className="mb-1">
            <p className="text-xs text-primary-600 font-semibold mb-0.5">{destination}</p>
            <h3 className="font-bold text-neutral-800 text-sm leading-snug line-clamp-2">{name}</h3>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-2 text-xs text-neutral-500 my-2">
            <div className="flex items-center gap-1">
              <Clock size={11} aria-hidden="true" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={11} aria-hidden="true" />
              <span>{groupSize}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={11} className="text-amber-500 fill-amber-500" aria-hidden="true" />
              <span className="font-medium text-neutral-700">{rating}</span>
              <span>({reviewCount})</span>
            </div>
          </div>

          {/* Itinerary summary */}
          {itinerarySummary && (
            <p className="text-xs text-neutral-500 italic mb-3 line-clamp-1">{itinerarySummary}</p>
          )}

          {/* Key inclusions */}
          {inclusions?.slice(0, 3).map((inc) => (
            <div key={inc} className="flex items-center gap-1.5 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-xs text-neutral-600 line-clamp-1">{inc}</span>
            </div>
          ))}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Price + CTA */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-100">
            <div>
              <p className="text-xs text-neutral-400">Starting from</p>
              <p className="text-primary-700 font-bold text-xl leading-none">
                ₹{price.toLocaleString('en-IN')}
              </p>
              <p className="text-xs text-neutral-400">
                {pricePerPerson ? 'per person' : 'per couple'}
              </p>
            </div>
            <div className="btn btn-primary btn-sm gap-1">
              View
              <ArrowRight size={14} aria-hidden="true" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default PackageCard;
