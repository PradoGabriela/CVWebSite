const validator = require('validator');

// Comprehensive list of explicit and spam keywords
const SPAM_KEYWORDS = [
    // Explicit sexual content
    'sex', 'porn', 'naked', 'nude', 'penis', 'vagina', 'fuck', 'fucking', 'bitch', 
    'whore', 'slut', 'cock', 'dick', 'pussy', 'ass', 'boobs', 'tits', 'masturbate',
    'orgasm', 'erotic', 'xxx', 'adult', 'escort', 'hookup', 'camgirl', 'webcam',
    
    // Common spam patterns
    'viagra', 'cialis', 'casino', 'lottery', 'winner', 'congratulations',
    'click here', 'buy now', 'limited time', 'act now', 'guaranteed',
    'make money fast', 'work from home', 'earn $', 'free money',
    'bitcoin', 'crypto', 'investment opportunity', 'loan', 'credit repair',
    
    // Suspicious patterns
    'nigerian prince', 'inheritance', 'million dollars', 'bank transfer',
    'urgent', 'confidential', 'selected', 'beneficiary', 'claim',
    'verify account', 'suspended account', 'update payment',
    
    // Link spam indicators
    'http://', 'https://', 'www.', '.com', '.net', '.org', 'bit.ly',
    'tinyurl', 'shorturl', 'click', 'visit', 'download'
];

// Suspicious email domains (disposable email services)
const SUSPICIOUS_DOMAINS = [
    '10minutemail.com', 'tempmail.org', 'guerrillamail.com', 'mailinator.com',
    'yopmail.com', 'temp-mail.org', 'getairmail.com', 'maildrop.cc',
    'throwaway.email', 'sharklasers.com', 'grr.la', 'guerrillamailblock.com', 'gmx.de',
    'mail.com', 'dispostable.com', 'spamgourmet.com', 'trashmail.com', 'testform.xyz'  
];

class SpamDetection {
    
    /**
     * Main spam detection function
     * @param {Object} formData - Form submission data
     * @returns {Object} - Detection results with score and reasons
     */
    static analyzeSubmission(formData) {
        const results = {
            isSpam: false,
            score: 0,
            reasons: [],
            severity: 'low'
        };

        // Check honeypot field
        if (formData.website && formData.website.trim() !== '') {
            results.score += 100;
            results.reasons.push('Honeypot field filled (bot detected)');
        }

        // Check submission timing (less than 3 seconds is suspicious)
        if (formData.formTime) {
            const submissionTime = Date.now() - parseInt(formData.formTime);
            if (submissionTime < 3000) {
                results.score += 50;
                results.reasons.push('Form submitted too quickly (likely bot)');
            }
        }

        // Content analysis
        const contentScore = this.analyzeContent(formData);
        results.score += contentScore.score;
        results.reasons.push(...contentScore.reasons);

        // Email validation
        const emailScore = this.analyzeEmail(formData.email);
        results.score += emailScore.score;
        results.reasons.push(...emailScore.reasons);

        // Pattern analysis
        const patternScore = this.analyzePatterns(formData);
        results.score += patternScore.score;
        results.reasons.push(...patternScore.reasons);

        // Determine final result
        if (results.score >= 100) {
            results.isSpam = true;
            results.severity = 'high';
        } else if (results.score >= 50) {
            results.isSpam = true;
            results.severity = 'medium';
        } else if (results.score >= 25) {
            results.severity = 'medium';
        }

        return results;
    }

    /**
     * Analyze message content for spam keywords
     */
    static analyzeContent(formData) {
        const results = { score: 0, reasons: [] };
        const allText = `${formData.name || ''} ${formData.subject || ''} ${formData.message || ''}`.toLowerCase();

        let keywordMatches = 0;
        SPAM_KEYWORDS.forEach(keyword => {
            if (allText.includes(keyword.toLowerCase())) {
                keywordMatches++;
            }
        });

        if (keywordMatches >= 5) {
            results.score += 80;
            results.reasons.push(`High spam keyword density (${keywordMatches} matches)`);
        } else if (keywordMatches >= 3) {
            results.score += 40;
            results.reasons.push(`Moderate spam keywords detected (${keywordMatches} matches)`);
        } else if (keywordMatches >= 1) {
            results.score += 15;
            results.reasons.push(`Spam keywords detected (${keywordMatches} matches)`);
        }

        // Check for excessive links
        const linkMatches = (allText.match(/(http|www\.|\.com|\.net|\.org)/g) || []).length;
        if (linkMatches >= 3) {
            results.score += 40;
            results.reasons.push(`Multiple links detected (${linkMatches})`);
        } else if (linkMatches >= 1) {
            results.score += 15;
            results.reasons.push(`Links detected in message`);
        }

        // Check for excessive capitalization
        const capsPercentage = (allText.match(/[A-Z]/g) || []).length / allText.length;
        if (capsPercentage > 0.5) {
            results.score += 25;
            results.reasons.push('Excessive capitalization detected');
        }

        return results;
    }

    /**
     * Analyze email address for validity and suspicious patterns
     */
    static analyzeEmail(email) {
        const results = { score: 0, reasons: [] };

        if (!email) {
            results.score += 30;
            results.reasons.push('Missing email address');
            return results;
        }

        // Basic email validation
        if (!validator.isEmail(email)) {
            results.score += 50;
            results.reasons.push('Invalid email format');
            return results;
        }

        // Check for suspicious domains
        const domain = email.split('@')[1]?.toLowerCase();
        if (SUSPICIOUS_DOMAINS.includes(domain)) {
            results.score += 40;
            results.reasons.push('Disposable email domain detected');
        }

        // Check for suspicious patterns in email
        if (/\d{5,}/.test(email)) {
            results.score += 20;
            results.reasons.push('Email contains long number sequence');
        }

        if (/[+\-_\.]{3,}/.test(email)) {
            results.score += 15;
            results.reasons.push('Email contains suspicious character patterns');
        }

        return results;
    }

    /**
     * Analyze general patterns in the submission
     */
    static analyzePatterns(formData) {
        const results = { score: 0, reasons: [] };

        // Check for identical name/email/subject
        if (formData.name === formData.email || formData.name === formData.subject) {
            results.score += 30;
            results.reasons.push('Identical fields detected');
        }

        // Check for very short messages
        if (formData.message && formData.message.trim().length < 10) {
            results.score += 25;
            results.reasons.push('Message too short');
        }

        // Check for very long messages (common in spam)
        if (formData.message && formData.message.length > 2000) {
            results.score += 20;
            results.reasons.push('Unusually long message');
        }

        // Check for repeated characters
        if (/(.)\1{4,}/.test(formData.message || '')) {
            results.score += 25;
            results.reasons.push('Repeated character patterns detected');
        }

        return results;
    }

    /**
     * Log spam attempt to console (privacy-friendly - no personal data stored)
     */
    static logSpamAttempt(formData, analysis, ip) {
        console.log('🚨 SPAM DETECTED:', {
            timestamp: new Date().toISOString(),
            ip: ip.substring(0, 8) + '***', // Partially mask IP for privacy
            score: analysis.score,
            severity: analysis.severity,
            reasons: analysis.reasons,
            stats: {
                hasName: !!formData.name,
                hasEmail: !!formData.email,
                hasSubject: !!formData.subject,
                messageLength: formData.message?.length || 0,
                honeypotFilled: !!(formData.website && formData.website.trim())
            }
        });
    }
}

module.exports = SpamDetection;