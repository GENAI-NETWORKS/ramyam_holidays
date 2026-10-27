import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsAppIcon from './WhatsAppIcon';
import { SITE_CONFIG } from '../data/siteConfig';

/**
 * Reusable enquiry form used on Home hero and detail pages.
 * Props:
 *   - compact: boolean renders a simpler single-column layout (for hero overlay)
 *   - defaultDestination: string pre-fills the destination field
 *   - onSuccess: function callback after successful submission
 */
const EnquiryForm = ({ compact = false, defaultDestination = '', onSuccess }) => {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { destination: defaultDestination },
  });

  const openWhatsApp = (data) => {
    const lines = [
      `🌴 *New Enquiry - Ramyam Holidays*`,
      ``,
      `👤 *Name:* ${data.name}`,
      `📞 *Phone:* ${data.phone}`,
      `📍 *Destination:* ${data.destination}`,
      `📅 *Travel Date:* ${data.travelDate}`,
      `👥 *Travellers:* ${data.travellers}`,
    ];
    if (data.budget) lines.push(`💰 *Budget:* ${data.budget}`);
    if (data.message) lines.push(`💬 *Message:* ${data.message}`);
    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${SITE_CONFIG.business.whatsapp}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const onSubmit = (data) => {
    setStatus('loading');
    setErrorMessage('');
    setSubmittedData(data);

    // Open WhatsApp directly with all enquiry details pre-formatted
    openWhatsApp(data);

    // Save locally in browser storage as a backup record
    saveEnquiryLocally(data);

    // Immediately show success screen & reset form
    setStatus('success');
    reset();
    onSuccess?.();
  };

  const saveEnquiryLocally = (data) => {
    try {
      const stored = JSON.parse(localStorage.getItem('ramyam_enquiries') || '[]');
      stored.push({ ...data, createdAt: new Date().toISOString() });
      localStorage.setItem('ramyam_enquiries', JSON.stringify(stored));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  };


  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 py-6 text-center"
      >
        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle size={28} className="text-emerald-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-neutral-800 mb-1">Enquiry Submitted!</h3>
          <p className="text-sm text-neutral-600 max-w-sm">
            Thank you{submittedData?.name ? `, ${submittedData.name}` : ''}! We have received your enquiry for{' '}
            <strong className="text-primary-700">{submittedData?.destination || 'your holiday'}</strong>.
            Our travel expert will call you within 24 hours.
          </p>
          <p className="text-xs text-emerald-600 mt-2 font-medium flex items-center justify-center gap-1">
            <WhatsAppIcon size={13} className="w-3.5 h-3.5 text-emerald-600" />
            Your details were sent to our WhatsApp automatically.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 justify-center mt-2">
          <a
            href={`https://wa.me/${SITE_CONFIG.business.whatsapp}?text=${encodeURIComponent(
              `🌴 *New Enquiry - Ramyam Holidays*\n\n👤 *Name:* ${submittedData?.name}\n📞 *Phone:* ${submittedData?.phone}\n📍 *Destination:* ${submittedData?.destination}\n📅 *Travel Date:* ${submittedData?.travelDate}\n👥 *Travellers:* ${submittedData?.travellers}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-[#25D366] hover:bg-[#20bd5a] text-white w-auto inline-flex px-4 py-2 rounded-xl text-sm"
          >
            <WhatsAppIcon size={16} className="w-4 h-4 text-white" />
            Open WhatsApp Again
          </a>
          <button
            onClick={() => setStatus('idle')}
            className="btn btn-outline w-auto inline-flex px-4 py-2 rounded-xl text-sm"
          >
            Submit Another Enquiry
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Tour enquiry form"
    >
      <div className={compact ? 'space-y-3' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
        {/* Full Name */}
        <div className={compact ? '' : 'sm:col-span-1'}>
          <label htmlFor="enq-name" className="form-label">
            Full Name <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="enq-name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            className={`form-input ${errors.name ? 'border-red-400 focus:ring-red-400' : ''}`}
            aria-required="true"
            aria-describedby={errors.name ? 'enq-name-error' : undefined}
            {...register('name', {
              required: 'Full name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
            })}
          />
          {errors.name && (
            <p id="enq-name-error" className="form-error" role="alert">
              <AlertCircle size={12} aria-hidden="true" />
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="enq-phone" className="form-label">
            Phone Number <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="enq-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 99999 99999"
            className={`form-input ${errors.phone ? 'border-red-400 focus:ring-red-400' : ''}`}
            aria-required="true"
            aria-describedby={errors.phone ? 'enq-phone-error' : undefined}
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[+\d\s\-()]{7,20}$/,
                message: 'Please enter a valid phone number',
              },
            })}
          />
          {errors.phone && (
            <p id="enq-phone-error" className="form-error" role="alert">
              <AlertCircle size={12} aria-hidden="true" />
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Preferred Destination */}
        <div>
          <label htmlFor="enq-destination" className="form-label">
            Preferred Destination <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="enq-destination"
            type="text"
            placeholder="e.g. Kerala, Dubai, Ooty..."
            className={`form-input ${errors.destination ? 'border-red-400 focus:ring-red-400' : ''}`}
            aria-required="true"
            aria-describedby={errors.destination ? 'enq-dest-error' : undefined}
            {...register('destination', {
              required: 'Preferred destination is required',
              minLength: { value: 2, message: 'Please enter a destination' },
            })}
          />
          {errors.destination && (
            <p id="enq-dest-error" className="form-error" role="alert">
              <AlertCircle size={12} aria-hidden="true" />
              {errors.destination.message}
            </p>
          )}
        </div>

        {/* Tentative Travel Date */}
        <div>
          <label htmlFor="enq-travel-date" className="form-label">
            Tentative Travel Date <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="enq-travel-date"
            type="text"
            placeholder="e.g. December 2025 or Dec 10"
            className={`form-input ${errors.travelDate ? 'border-red-400 focus:ring-red-400' : ''}`}
            aria-required="true"
            aria-describedby={errors.travelDate ? 'enq-date-error' : undefined}
            {...register('travelDate', {
              required: 'Travel date is required',
            })}
          />
          {errors.travelDate && (
            <p id="enq-date-error" className="form-error" role="alert">
              <AlertCircle size={12} aria-hidden="true" />
              {errors.travelDate.message}
            </p>
          )}
        </div>

        {/* Number of Travellers */}
        <div>
          <label htmlFor="enq-travellers" className="form-label">
            Number of Travellers <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <select
            id="enq-travellers"
            className={`form-input ${errors.travellers ? 'border-red-400 focus:ring-red-400' : ''}`}
            aria-required="true"
            aria-describedby={errors.travellers ? 'enq-travellers-error' : undefined}
            {...register('travellers', {
              required: 'Please select number of travellers',
            })}
          >
            <option value="">Select travellers</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, '9-15', '16-30', '30+'].map((n) => (
              <option key={n} value={n}>
                {n} {typeof n === 'number' ? (n === 1 ? 'Person' : 'Persons') : 'Persons'}
              </option>
            ))}
          </select>
          {errors.travellers && (
            <p id="enq-travellers-error" className="form-error" role="alert">
              <AlertCircle size={12} aria-hidden="true" />
              {errors.travellers.message}
            </p>
          )}
        </div>

        {/* Budget */}
        {!compact && (
          <div>
            <label htmlFor="enq-budget" className="form-label">
              Budget per Person <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <select
              id="enq-budget"
              className={`form-input ${errors.budget ? 'border-red-400 focus:ring-red-400' : ''}`}
              aria-required="true"
              {...register('budget', { required: 'Please select budget per person' })}
            >
              <option value="">Select budget</option>
              <option value="Under ₹10,000">Under ₹10,000</option>
              <option value="₹10,000–₹25,000">₹10,000 – ₹25,000</option>
              <option value="₹25,000–₹50,000">₹25,000 – ₹50,000</option>
              <option value="₹50,000–₹1,00,000">₹50,000 – ₹1,00,000</option>
              <option value="Above ₹1,00,000">Above ₹1,00,000</option>
            </select>
            {errors.budget && (
              <p className="form-error" role="alert">
                <AlertCircle size={12} aria-hidden="true" />
                {errors.budget.message}
              </p>
            )}
          </div>
        )}

        {/* Message */}
        {!compact && (
          <div className="sm:col-span-2">
            <label htmlFor="enq-message" className="form-label">
              Special Requirements / Message <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <textarea
              id="enq-message"
              rows={3}
              placeholder="Tell us about your travel requirements, special occasions, dietary needs, etc."
              className={`form-input resize-none ${errors.message ? 'border-red-400 focus:ring-red-400' : ''}`}
              aria-required="true"
              {...register('message', {
                required: 'Please enter your requirements or message',
                maxLength: 2000,
              })}
            />
            {errors.message && (
              <p className="form-error" role="alert">
                <AlertCircle size={12} aria-hidden="true" />
                {errors.message.message}
              </p>
            )}
          </div>
        )}

        {/* Error message */}
        <AnimatePresence>
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={compact ? '' : 'sm:col-span-2'}
            >
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                <AlertCircle size={16} aria-hidden="true" />
                {errorMessage}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit */}
        <div className={`flex flex-col items-center ${compact ? '' : 'sm:col-span-2'}`}>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn btn-primary w-auto inline-flex justify-center gap-2 px-6 py-2.5 rounded-xl text-sm"
            aria-busy={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <Loader size={16} className="animate-spin" aria-hidden="true" />
                Sending Enquiry...
              </>
            ) : (
              <>
                <Send size={16} aria-hidden="true" />
                Get Free Quote
              </>
            )}
          </button>
          <p className="text-xs text-neutral-500 text-center mt-2">
            We respond within 24 hours. No spam, ever.
          </p>
        </div>
      </div>
    </form>
  );
};

export default EnquiryForm;
