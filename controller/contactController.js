const express = require('express');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const SpamDetection = require('../utils/spamDetection');
const RecaptchaVerification = require('../utils/recaptchaVerification');

const router = express.Router();

// Rate limiting middleware - max 3 submissions per 15 minutes per IP
const contactRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // Max 3 requests per window
    message: {
        error: 'Too many contact form submissions. Please wait 15 minutes before trying again.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    // Skip rate limiting for successful non-spam submissions
    skip: (req) => {
        return req.spamAnalysis && !req.spamAnalysis.isSpam;
    }
});

// Email configuration
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Contact form submission handler
router.post('/contact', contactRateLimit, async (req, res) => {
    console.log('�🚨🚨 CONTACT HANDLER CALLED 🚨🚨🚨');
    console.log('�🔍 Contact form submission received:', {
        body: req.body,
        ip: req.ip || req.connection.remoteAddress,
        timestamp: new Date().toISOString()
    });
    try {
        const formData = {
            name: req.body.name?.trim(),
            email: req.body.email?.trim(),
            subject: req.body.subject?.trim(),
            message: req.body.message?.trim(),
            website: req.body.website?.trim(), // Honeypot field
            formTime: req.body.formTime,
            recaptchaToken: req.body['g-recaptcha-response'] // reCAPTCHA token
        };

        const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
        
        // Verify reCAPTCHA first (if configured)
        let recaptchaAnalysis = { isSpam: false, score: 0, reasons: [] };
        if (RecaptchaVerification.isConfigured()) {
            console.log('🤖 Verifying reCAPTCHA...');
            const recaptchaResult = await RecaptchaVerification.verifyToken(
                formData.recaptchaToken, 
                clientIP
            );
            recaptchaAnalysis = RecaptchaVerification.analyzeScore(recaptchaResult);
        } else {
            console.log('⚠️ reCAPTCHA not configured - skipping verification');
        }
        
        // Run spam analysis
        const spamAnalysis = SpamDetection.analyzeSubmission(formData);
        console.log('🔍 Spam analysis result:', spamAnalysis);
        console.log('🤖 reCAPTCHA analysis result:', recaptchaAnalysis);
        
        // Combine spam analysis results
        const combinedAnalysis = {
            isSpam: spamAnalysis.isSpam || recaptchaAnalysis.isSpam,
            score: spamAnalysis.score + recaptchaAnalysis.score,
            reasons: [...spamAnalysis.reasons, ...recaptchaAnalysis.reasons],
            severity: (spamAnalysis.severity === 'high' || recaptchaAnalysis.severity === 'high') ? 'high' : 
                     (spamAnalysis.severity === 'medium' || recaptchaAnalysis.severity === 'medium') ? 'medium' : 'low',
            recaptchaScore: recaptchaAnalysis.recaptchaScore
        };
        
        req.spamAnalysis = combinedAnalysis; // Store for rate limit skip function

        // Handle spam
        if (combinedAnalysis.isSpam) {
            SpamDetection.logSpamAttempt(formData, combinedAnalysis, clientIP);
            
            console.log('🚫 SPAM BLOCKED - returning fake success message');
            console.log('🚫 Spam reasons:', combinedAnalysis.reasons);
            // Return success to avoid revealing spam detection (security best practice)
            return res.status(200).json({
                success: true,
                message: 'Thank you for your message. We\'ll get back to you soon!'
            });
        }

        // Basic validation for legitimate submissions
        if (!formData.name || !formData.email || !formData.message) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields.'
            });
        }

        // Send email notification (for legitimate submissions only)
        await sendEmailNotification(formData, clientIP);

        // Success response
        res.status(200).json({
            success: true,
            message: 'Thank you for your message! I\'ll get back to you within 24 hours.'
        });

        console.log('✅ Legitimate contact form submission received:', {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            ip: clientIP,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Sorry, there was a problem sending your message. Please try again later.'
        });
    }
});

// API endpoint to get reCAPTCHA site key
router.get('/recaptcha-config', (req, res) => {
    res.json({
        siteKey: RecaptchaVerification.getSiteKey(),
        enabled: RecaptchaVerification.isConfigured()
    });
});

/**
 * Send email notification for legitimate submissions
 */
async function sendEmailNotification(formData, ip) {
    try {
        // Email to you (notification)
        const notificationEmail = {
            from: process.env.EMAIL_USER,
            to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
            subject: `Portfolio Contact: ${formData.subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Subject:</strong> ${formData.subject}</p>
                <p><strong>Message:</strong></p>
                <p>${formData.message.replace(/\n/g, '<br>')}</p>
                <hr>
                <p><small>IP: ${ip} | Time: ${new Date().toISOString()}</small></p>
            `
        };

        // Auto-reply to sender
        const autoReply = {
            from: process.env.EMAIL_USER,
            to: formData.email,
            subject: 'Thank you for contacting me!',
            html: `
                <h2>Hi ${formData.name},</h2>
                <p>Thanks for reaching out! I've received your message about "${formData.subject}" and I'll get back to you within 24 hours.</p>
                <p>Best regards,<br>Gabriela Prado</p>
                <hr>
                <p><small>This is an automated response. Please don't reply to this email.</small></p>
            `
        };

        // Send both emails
        await Promise.all([
            transporter.sendMail(notificationEmail),
            transporter.sendMail(autoReply)
        ]);

    } catch (error) {
        console.error('Failed to send email notification:', error);
        // Don't throw - email failure shouldn't break the contact form
    }
}

module.exports = router;