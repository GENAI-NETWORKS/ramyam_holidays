import { motion } from 'framer-motion';
import WhatsAppIcon from './WhatsAppIcon';
import { SITE_CONFIG } from '../data/siteConfig';

/**
 * Floating WhatsApp Action Button.
 * Fixed in bottom-right corner, opens chat with owner with pre-filled greeting.
 */
const FloatingActions = () => {
  const { whatsapp } = SITE_CONFIG.business;
  const greetingMessage = 'Hello Ramyam Holidays, I would like to enquire about tour packages.';
  const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(greetingMessage)}`;

  return (
    <div
      className="fixed bottom-6 right-6 z-40"
      aria-label="Quick contact"
    >
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Ramyam Holidays on WhatsApp"
        title="Chat with Ramyam Holidays on WhatsApp"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg hover:shadow-2xl flex items-center justify-center transition-shadow duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 280, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
      >
        <WhatsAppIcon size={32} className="w-8 h-8 text-white drop-shadow-sm" />
      </motion.a>
    </div>
  );
};

export default FloatingActions;
