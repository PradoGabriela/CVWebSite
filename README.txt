# Gabriela Prado Portfolio Website

A modern, responsive portfolio web application showcasing my projects as a Software Developer & Game Designer. Built with Node.js, Express, and MySQL with a focus on performance, security, and user experience.

## 🚀 Features

- **Responsive Single-Page Design** - Optimized for all devices with smooth scrolling navigation
- **Dynamic Project Portfolio** - Database-driven project showcase with detailed information
- **Advanced Contact Form** - AJAX-powered submission with comprehensive spam protection
- **Robust Security** - Multi-layer spam detection, rate limiting, and input validation
- **Performance Optimized** - Minimal dependencies, efficient database connection pooling
- **Professional UI/UX** - Clean design with interactive elements and modern styling

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js** - Fast, minimalist web framework
- **MySQL2** - Database with connection pooling for optimal performance
- **Nodemailer** - Professional email handling with HTML templates
- **EJS** - Templating engine for dynamic content rendering

### Frontend
- **HTML5 & CSS3** - Modern, semantic markup with responsive design
- **JavaScript (ES6+)** - Interactive features and AJAX form submission
- **Font Awesome** - Professional icon library
- **jQuery** - DOM manipulation and animations

### Security & Performance
- **express-rate-limit** - Request rate limiting to prevent abuse
- **dotenv** - Secure environment variable management
- **Comprehensive Spam Protection** - Keyword filtering and domain blocking
- **Input Validation** - Server-side validation for all user inputs

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