# Gabriela Prado Portfolio Website

🌟 **Live Website**: [www.pradogabriela.dev](https://www.pradogabriela.dev)

A modern, responsive portfolio web application showcasing my projects as a Software Developer & Game Designer. Built with Node.js, Express, and MySQL with a focus on performance, security, and user experience.

## 🚀 Features

- **📱 Responsive Single-Page Design** - Optimized for all devices with smooth scrolling navigation
- **🎯 Dynamic Project Portfolio** - Database-driven project showcase with expandable descriptions
- **📧 Advanced Contact Form** - AJAX-powered with enterprise-level spam protection
- **🛡️ Multi-Layer Security** - Honeypot fields, rate limiting, keyword filtering, domain blocking
- **⚡ Performance Optimized** - Connection pooling, minimal dependencies, optimized assets
- **🎨 Professional UI/UX** - Clean design with interactive elements and modern tech stack icons
- **🔍 SEO Optimized** - Structured data, meta tags, sitemap, and robots.txt
- **📊 Health Monitoring** - Built-in health check endpoint for monitoring

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js 5.1.0** - Fast, minimalist web framework
- **MySQL2 3.14.3** - Database with SSL and connection pooling
- **Nodemailer 7.0.6** - Professional email handling with HTML templates
- **EJS 3.1.10** - Server-side templating engine

### Frontend
- **HTML5 & CSS3** - Modern, semantic markup with responsive grid system
- **JavaScript (ES6+)** - Interactive features, AJAX, and expandable content
- **Font Awesome** - Professional icon library
- **DevIcon CDN** - Technology stack icons
- **SASS** - Advanced CSS preprocessing

### Security & Performance
- **Helmet 8.1.0** - Security headers and CSP
- **express-rate-limit 8.1.0** - Advanced rate limiting with IP tracking
- **CORS 2.8.5** - Cross-origin request handling
- **dotenv 17.2.0** - Environment variable management
- **Multi-layer Spam Protection** - 4 honeypot fields, keyword filtering, domain blocking
- **Comprehensive Input Validation** - Server-side validation and sanitization

## 📁 Project Structure

```
CVWebSite/
├── index.js                 # Main Express server with security middleware
├── routes.js               # Route definitions and middleware
├── db.js                   # MySQL connection pool with SSL
├── package.json            # Dependencies and scripts
├── .env                    # Environment variables (not in repo)
├── controller/
│   ├── staticpages.js      # Home page, projects, and health check
│   └── formcontroller.js   # Contact form with enterprise spam protection
├── views/
│   ├── home.ejs           # Main SPA template with dynamic content
│   └── partials/          # Header, footer, and reusable components
├── assets/
│   ├── css/               # Compiled CSS and source maps
│   ├── sass/              # SASS source files
│   ├── js/                # Client-side JavaScript and AJAX
│   ├── images/            # Optimized project images
│   └── webfonts/          # Font files
├── images/                # Static images and profile photos
├── database/              # Database schema and data (create manually)
└── utils/                 # Utility functions and helpers
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

### Database Setup
Create a MySQL database and add a `projects` table:

```sql
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500),
    img_description VARCHAR(255),
    link VARCHAR(500),
    type VARCHAR(100),
    platforms VARCHAR(500), -- Comma-separated: "android,ios,web"
    technologies VARCHAR(500) -- Comma-separated: "flutter,dart,firebase"
);
```

### API Endpoints
```
GET  /              # Main portfolio page
GET  /health        # Health check endpoint
POST /contact       # Contact form submission
GET  /sitemap.xml   # SEO sitemap
GET  /robots.txt    # Search engine instructions
```

### Contact Form Spam Protection
The form includes multiple protection layers:
- **Honeypot Fields**: 4 hidden fields that bots typically fill
- **Keyword Filtering**: Blocks spam phrases like "free money", "buy now"
- **Domain Blocking**: Prevents temporary email services
- **Rate Limiting**: 10 submissions per hour per IP
- **Silent Blocking**: Returns fake success to prevent bot feedback

## 🛡️ Security Features

### Contact Form Protection
- **🍯 4 Honeypot Fields** - Hidden fields to catch bots (`website`, `url`, `confirm_email`, `phone`)
- **🔤 Keyword Filtering** - Blocks common spam phrases and adult content
- **🌐 Domain Blacklisting** - Prevents submissions from temporary/disposable email services
- **⏱️ Rate Limiting** - 10 submissions per hour per IP, 1000 general requests per 15min
- **✅ Input Validation** - Comprehensive server-side validation

### Application Security
- **🛡️ Helmet.js** - Security headers, CSP, and HSTS
- **🔒 Environment Variables** - All sensitive data in `.env`
- **🚫 SQL Injection Prevention** - Parameterized queries with MySQL2
- **🛡️ XSS Protection** - Template engine escapes all user data
- **🌍 CORS Protection** - Configured for production domain only
- **📡 Proxy Trust** - Secure reverse proxy configuration

## 📊 Performance Optimizations

- **Connection Pooling** - Efficient database connection management
- **Minimal Dependencies** - Only essential packages included
- **Optimized Assets** - Compressed CSS and minified JavaScript
- **Responsive Images** - Optimized images for different screen sizes

## 🚀 Deployment

### Production Environment
```bash
# Environment variables for production
NODE_ENV=production
PORT=3000
IP=0.0.0.0

# Database (with SSL)
DB_HOST=your-mysql-host
DB_PORT=3306
DB_USER=your-username
DB_PASSWORD=your-secure-password
DB_DATABASE=portfolio_db

# Email service
EMAIL_HOST=smtp.your-provider.com
EMAIL_PORT=587
EMAIL_USER=your-email@domain.com
EMAIL_PASS=your-app-password
RECIPIENT_EMAIL=contact@yourdomain.com
```

### Hosting Setup
1. **Server Requirements**: Node.js 14+, MySQL 8.0+
2. **Reverse Proxy**: Configure nginx/Apache with SSL
3. **Database**: MySQL with SSL enabled
4. **Email**: SMTP service (Gmail, SendGrid, etc.)
5. **Domain**: Configure DNS and SSL certificates

### Health Monitoring
- Health check endpoint: `GET /health`
- Returns server status, uptime, and memory usage
- Perfect for monitoring services and load balancers




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
