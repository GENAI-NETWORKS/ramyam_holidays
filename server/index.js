require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const contactRouter = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", 'https:'],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'self'", 'https://www.google.com'],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// CORS
const allowedOrigins = (
  process.env.ALLOWED_ORIGINS ||
  'http://localhost:5173,https://ramyamholidays.com,https://www.ramyamholidays.com'
)
  .split(',')
  .map((o) => o.trim());
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        /^http:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+)(:\d+)?$/.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Global rate limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});
app.use(globalLimiter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Ramyam Holidays API', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/contact', contactRouter);

// Serve static client build if client/dist exists (enables unified single-process hosting)
const clientDistPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// 404 handler (for unmatched /api routes or missing assets)
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found.' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'An internal server error occurred.' : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Ramyam Holidays API server running on port ${PORT}`);
});

module.exports = app;
