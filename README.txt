# Gabriela Prado Portfolio Website

🌟 **Live Website**: www.pradogabriela.dev

A modern, responsive portfolio web application showcasing my projects as a Software Developer & Game Designer. Built with Node.js, Express, and MySQL with enterprise-level security and performance optimizations.

## 🚀 Features

- **📱 Responsive Single-Page Design** - Optimized for all devices with smooth scrolling
- **🎯 Dynamic Project Portfolio** - Database-driven showcase with expandable descriptions
- **📧 Advanced Contact Form** - AJAX-powered with multi-layer spam protection
- **🛡️ Enterprise Security** - Honeypot fields, rate limiting, domain blocking
- **⚡ High Performance** - Connection pooling, optimized assets, health monitoring
- **🎨 Modern UI/UX** - Clean design with tech stack icons and animations
- **🔍 SEO Optimized** - Structured data, meta tags, sitemap
- **📊 Production Ready** - SSL support, proxy trust, error handling

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js 5.1.0** - Fast, secure web framework
- **MySQL2 3.14.3** - Database with SSL and connection pooling
- **Nodemailer 7.0.6** - Professional email with HTML templates
- **EJS 3.1.10** - Server-side templating engine

### Frontend
- **HTML5 & CSS3** - Semantic markup with responsive grid
- **JavaScript (ES6+)** - Interactive features and AJAX
- **Font Awesome** - Professional icon library
- **DevIcon CDN** - Technology stack icons
- **SASS** - Advanced CSS preprocessing

### Security & Performance
- **Helmet 8.1.0** - Security headers and CSP
- **express-rate-limit 8.1.0** - Advanced rate limiting
- **CORS 2.8.5** - Cross-origin protection
- **4-Layer Spam Protection** - Honeypots, keywords, domains, rate limits
- **Comprehensive Validation** - All inputs sanitized and validated

## � Project Structure

```
CVWebSite/
├── index.js                 # Main Express server configuration
├── routes.js               # Route definitions and middleware
├── db.js                   # MySQL connection pool setup
├── controller/
│   ├── staticpages.js      # Home page and project data
│   └── formcontroller.js   # Contact form handling with spam protection
├── views/
│   ├── home.ejs           # Main page template with AJAX form
│   └── partials/          # Reusable template components
├── assets/
│   ├── css/               # Stylesheets and SASS files
│   ├── js/                # Client-side JavaScript
│   └── images/            # Static images and assets
└── database/              # Database schema and data
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL database
- SMTP email service (for contact form)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PradoGabriela/CVWebSite.git
   cd CVWebSite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_DATABASE=your_database

   # Email Configuration
   EMAIL_HOST=smtp.your-provider.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@domain.com
   EMAIL_PASS=your-email-password
   RECIPIENT_EMAIL=where-to-receive@domain.com

   # Server Configuration
   PORT=3000
   ```

4. **Set up the database**
   - Create a MySQL database
   - Import the database schema from the `database/` folder
   - Add your project data to the `projects` table

5. **Run the application**
   ```bash
   npm start
   # or for development
   node index.js
   ```

6. **Visit the website**
   Open `http://localhost:3000` in your browser

## 🔧 Configuration

### Contact Form Spam Protection
The contact form includes multiple layers of spam protection:
- **Keyword filtering** - Blocks common spam phrases
- **Domain blocking** - Prevents submissions from known spam domains  
- **Rate limiting** - Limits requests per IP address
- **Input validation** - Server-side validation of all fields

### Database Schema
The `projects` table should include:
- `id` (Primary Key)
- `title` - Project name
- `description` - Project description
- `image_url` - Project image path
- `link` - Project URL
- `type` - Project category
- `platforms` - JSON array of platforms
- `technologies` - JSON array of technologies used

## 🛡️ Security Features

- **Environment Variable Protection** - Sensitive data stored in `.env`
- **Rate Limiting** - Prevents brute force attacks
- **Input Sanitization** - All user inputs are validated and sanitized
- **Spam Detection** - Multi-layer spam protection for contact form
- **SQL Injection Prevention** - Parameterized queries with MySQL2
- **XSS Protection** - Template engine escapes user data

## 📊 Performance Optimizations

- **Connection Pooling** - Efficient database connection management
- **Minimal Dependencies** - Only essential packages included
- **Optimized Assets** - Compressed CSS and minified JavaScript
- **Responsive Images** - Optimized images for different screen sizes

## 🚀 Deployment

### Environment Setup
1. Set `NODE_ENV=production` in your environment
2. Configure your production database credentials
3. Set up SMTP for email functionality
4. Configure reverse proxy (nginx recommended)

### Hosting Recommendations
- **Backend:** Heroku, DigitalOcean, AWS, or VPS
- **Database:** MySQL hosting service or cloud database
- **Static Assets:** CDN for optimal performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE.txt](LICENSE.txt) file for details.

## 👤 Author

**Gabriela Prado**
- Portfolio: www.pradogabriela.dev
- GitHub: [@PradoGabriela](https://github.com/PradoGabriela)


## 🙏 Acknowledgments

- Font Awesome for the icon library
- The Express.js community for excellent documentation
- All the open-source contributors who made this project possible

---

⭐ **Star this repository if you found it helpful!**