const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

// Validate environment variables
const requiredEnvVars = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS', 'RECIPIENT_EMAIL'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars.join(', '));
  console.error('Please check your .env file');
}

// Create transporter for sending emails
const createTransporter = () => {
  if (missingVars.length > 0) {
    throw new Error('Email configuration is incomplete');
  }
  
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    // Add timeout settings
    connectionTimeout: 60000, // 60 seconds
    greetingTimeout: 30000, // 30 seconds
    socketTimeout: 60000 // 60 seconds
  });
};

// Handle contact form submission
router.post('/contact', async (req, res) => {
  console.log('🔥 CONTACT FORM SUBMITTED - Request received!');
  console.log('Request body:', req.body);
  console.log('Content-Type:', req.headers['content-type']);
  

  // ✅ Normalize all fields (default to empty string if missing)
  const name = (req.body.name || '').toString().trim();
  const email = (req.body.email || '').toString().trim();
  const subject = (req.body.subject || '').toString().trim();
  const message = (req.body.message || '').toString().trim();

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide a valid email address' 
    });
  }

  // Add spam protection with case-insensitive matching
  const spamKeywords = ['spam', 'buy now', 'click here', 'free', 'winner', 'sexual', 'sex', 'viagra', 'casino'];
  const messageContent = (name + ' ' + subject + ' ' + message).toLowerCase();
  
  // Debug logging
  console.log('=== SPAM DETECTION DEBUG ===');
  console.log('Name:', name);
  console.log('Subject:', subject);
  console.log('Message:', message);
  console.log('Combined content (lowercase):', messageContent);
  console.log('Checking for keywords:', spamKeywords);
  
  const isSpam = spamKeywords.some(keyword => {
    const found = messageContent.includes(keyword.toLowerCase());
    if (found) {
      console.log('SPAM KEYWORD FOUND:', keyword);
    }
    return found;
  });
  
  console.log('Is spam detected?', isSpam);
  console.log('=== END SPAM DEBUG ===');
  
  if (isSpam) {
    console.log('🚫 SPAM BLOCKED - Returning fake success for:', email);
    // Pretend to be successful to avoid giving feedback to spammers
    return res.json({ 
      success: true, 
      message: 'Thank you! Your message has been sent successfully.' 
    });
  }

  // Block spam domains
  const blockedDomains = ['spam.com', 'fakeemail.com', 'tempmail.com', 'mailinator.com', '10minutemail.com', 'gmx.de', 'testform.xyz'];
  const emailDomain = email.split('@')[1]?.toLowerCase();
  
  console.log('Email domain check:', emailDomain, 'in blocked list?', blockedDomains.includes(emailDomain));
  
  if (blockedDomains.includes(emailDomain)) {
    console.log('🚫 DOMAIN BLOCKED - Returning fake success for:', emailDomain);
    // Success trap response
    return res.json({ 
      success: true, 
      message: 'Thank you! Your message has been sent successfully.' 
    });
  }

  if (isSpam || blockedDomains.includes(emailDomain)) {
  const reason = isSpam ? 'Keyword spam' : `Blocked domain: ${emailDomain}`;
  console.error(`🚫 SPAM BLOCKED: ${reason} | From: ${email}`);
  
  try {
    throw new Error(`Spam detected: ${reason}`);
  } catch (err) {
    // Backend sees it as a failure, logs error
    console.error(err);
    
    // Client still gets fake success
    return res.json({ 
      success: true, 
      message: 'Thank you! Your message has been sent successfully.' 
    });
  }
}



  try {
    console.log('✅ LEGITIMATE EMAIL - Proceeding to send email from:', email);
    const transporter = createTransporter();

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #43B3E0; border-bottom: 2px solid #43B3E0; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #43B3E0;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e8f4f8; border-radius: 5px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong>Reply to:</strong> ${email}<br>
              <strong>Sent from:</strong> Portfolio Website Contact Form<br>
              <strong>Date:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
      replyTo: email
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('📧 EMAIL SENT SUCCESSFULLY to recipient');

    // Success response
    res.json({ 
      success: true, 
      message: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!' 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Sorry, there was an error sending your message. Please try again later.' 
    });
  }
});

module.exports = router;