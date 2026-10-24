const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');

const router = express.Router();

// Strict rate limit for contact form: 5 submissions per hour per IP
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many enquiries submitted. Please try again in an hour.' },
});

// Validation rules
const validateContact = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required.')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters.')
    .escape(),
  body('email')
    .optional({ checkFalsy: true })
    .trim()
    .isEmail().withMessage('Please enter a valid email address.')
    .normalizeEmail(),
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required.')
    .matches(/^[+\d\s\-()]{7,20}$/).withMessage('Please enter a valid phone number.'),
  body('destination')
    .trim()
    .notEmpty().withMessage('Destination is required.')
    .isLength({ max: 200 }).withMessage('Destination must be under 200 characters.')
    .escape(),
  body('travelDate')
    .trim()
    .notEmpty().withMessage('Travel date is required.')
    .isLength({ max: 50 }),
  body('travellers')
    .trim()
    .notEmpty().withMessage('Number of travellers is required.'),
  body('budget')
    .optional()
    .trim()
    .isLength({ max: 100 }),
  body('message')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Message must be under 2000 characters.')
    .escape(),
];

// Create transporter
function createTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

router.post('/', contactLimiter, validateContact, async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed.',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }

  const { name, email, phone, destination, travelDate, travellers, budget, message } = req.body;

  // Build email content
  const textBody = `
New Enquiry - Ramyam Holidays
==============================
Name        : ${name}
Phone       : ${phone}
Destination : ${destination || 'Not specified'}
Travel Date : ${travelDate || 'Not specified'}
Travellers  : ${travellers || 'Not specified'}
Budget      : ${budget || 'Not specified'}
Message     :
${message || 'No message provided.'}
==============================
Received at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
  `.trim();

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9fafb; border-radius: 8px;">
      <div style="background: #0f766e; padding: 20px; border-radius: 8px 8px 0 0;">
        <h2 style="color: #ffffff; margin: 0; font-size: 20px;">New Enquiry - Ramyam Holidays</h2>
      </div>
      <div style="background: #ffffff; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold; color: #374151; width: 140px;">Name</td><td style="padding: 8px 0; color: #111827;">${name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone</td><td style="padding: 8px 0; color: #111827;"><a href="tel:${phone}">${phone}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Destination</td><td style="padding: 8px 0; color: #111827;">${destination || '-'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Travel Date</td><td style="padding: 8px 0; color: #111827;">${travelDate || '-'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Travellers</td><td style="padding: 8px 0; color: #111827;">${travellers || '-'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Budget</td><td style="padding: 8px 0; color: #111827;">${budget || '-'}</td></tr>
        </table>
        ${message ? `<div style="margin-top: 16px; padding: 16px; background: #f3f4f6; border-radius: 6px;"><strong>Message:</strong><p style="margin: 8px 0 0; color: #374151;">${message}</p></div>` : ''}
        <p style="margin-top: 20px; color: #6b7280; font-size: 13px;">Received at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
      </div>
    </div>
  `;

  console.log('[ENQUIRY RECEIVED]', { name, phone, destination, travelDate, travellers });

  try {
    const transporter = createTransporter();

    if (transporter) {
      // Send to business owner
      await transporter.sendMail({
        from: `"Ramyam Holidays Website" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to: process.env.ENQUIRY_TO || 'ramyamholidays@gmail.com',
        subject: `New Enquiry from ${name} - ${destination || 'General'}`,
        text: textBody,
        html: htmlBody,
        replyTo: email || undefined,
      });

      if (email) {
        // Auto-reply to enquirer if email was provided
        await transporter.sendMail({
          from: `"Ramyam Holidays" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
          to: email,
          subject: 'Thank you for your enquiry - Ramyam Holidays',
          text: `Dear ${name},\n\nThank you for reaching out to Ramyam Holidays! We have received your enquiry and our travel expert will get back to you within 24 hours.\n\nFor urgent assistance, please call us:\n+91 86680 98039 | +91 94424 68039\n\nWarm regards,\nN. Rathinakumar\nProprietor, Ramyam Holidays\n92, Ellaithottam Road, Peelamedu, Coimbatore - 641004`,
          html: `<p>Dear <strong>${name}</strong>,</p><p>Thank you for reaching out to <strong>Ramyam Holidays</strong>! We have received your enquiry and our travel expert will get back to you within 24 hours.</p><p>For urgent assistance, please call us:<br><a href="tel:+918668098039">+91 86680 98039</a> | <a href="tel:+919442468039">+91 94424 68039</a></p><p>Warm regards,<br><strong>N. Rathinakumar</strong><br>Proprietor, Ramyam Holidays<br>92, Ellaithottam Road, Peelamedu, Coimbatore - 641004</p>`,
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Your enquiry has been submitted successfully. We will contact you within 24 hours.',
    });
  } catch (err) {
    console.error('[CONTACT] Email send error:', err);
    // Still acknowledge enquiry so user is not stuck
    return res.status(200).json({
      success: true,
      message: 'Your enquiry has been received. We will contact you within 24 hours.',
    });
  }
});

module.exports = router;
