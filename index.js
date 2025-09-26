const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { rateLimit, ipKeyGenerator } = require('express-rate-limit'); 
const cors = require('cors');
require('dotenv').config();

const app = express();

// Trust proxy - IMPORTANT for CloudPanel/reverse proxy setups
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdn.jsdelivr.net"],
      scriptSrc: ["'self'", "'unsafe-inline'"], // Allow inline scripts for functionality
      scriptSrcAttr: ["'unsafe-inline'"], // Allow inline event handlers if needed
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"]
    }
  }
}));

// Rate limiting with proxy-friendly configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Increased from 100 to 1000 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,

    keyGenerator: (req, res) => ipKeyGenerator(req.ip)  
});
app.use(limiter);

// Contact form specific rate limiting with proxy-friendly configuration
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Increased from 5 to 10 contact form submissions per hour
  message: 'Too many contact form submissions, please try again later.',
    keyGenerator: (req, res) => ipKeyGenerator(req.ip)  
});

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://pradogabriela.dev', 'https://www.pradogabriela.dev'] // Your actual domain
    : ['http://localhost:3000', 'http://127.0.0.1:3000']
}));

app.set('view engine', 'ejs'); // Set the template engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // For JSON payloads

const path = require('path');

app.use(express.static("views"));
app.use(express.static("images"));
app.use(express.static("public"));
app.use(express.static("partials"));
app.use(express.static("css"));
app.use(express.static("components"));
app.use(express.static("controller"));
app.use(express.static("assets"));
app.use(express.static("assets/css"));
app.use(express.static("assets/js"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes.js'));

// SEO routes
app.get('/sitemap.xml', (req, res) => {
    res.type('application/xml');
    res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'));
});

app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.sendFile(path.join(__dirname, 'public', 'robots.txt'));
});

// Apply contact rate limiting to contact route
app.use('/contact', contactLimiter);


// Handling 404 errors
app.use((req, res, next) => {
    res.status(404);
     res.json({ error: 'Not Found' }); // Send a JSON response
  });



  app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500);
    res.json({ error: 'Internal Server Error' }); // Send a JSON response
  });




app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", () => {
    console.log("Website server has started");
});