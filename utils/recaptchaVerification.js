const axios = require('axios');

class RecaptchaVerification {
    
    /**
     * Verify reCAPTCHA v3 token with Google's API
     * @param {string} token - The reCAPTCHA token from the client
     * @param {string} clientIP - The client's IP address
     * @returns {Object} - Verification result with score and success status
     */
    static async verifyToken(token, clientIP = null) {
        try {
            const secretKey = process.env.RECAPTCHA_SECRET_KEY;
            
            if (!secretKey || secretKey === 'your-secret-key-here') {
                console.log('⚠️ reCAPTCHA not configured - skipping verification');
                return {
                    success: true,
                    score: 0.9, // Assume legitimate if not configured
                    action: 'contact_form',
                    hostname: 'localhost',
                    challenge_ts: new Date().toISOString(),
                    error_codes: [],
                    configured: false
                };
            }

            const verificationURL = 'https://www.google.com/recaptcha/api/siteverify';
            
            const params = new URLSearchParams();
            params.append('secret', secretKey);
            params.append('response', token);
            if (clientIP) {
                params.append('remoteip', clientIP);
            }

            const response = await axios.post(verificationURL, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                timeout: 10000 // 10 second timeout
            });

            const result = response.data;
            result.configured = true;

            console.log('🔍 reCAPTCHA verification result:', {
                success: result.success,
                score: result.score,
                action: result.action,
                errors: result['error-codes'] || []
            });

            return result;

        } catch (error) {
            console.error('❌ reCAPTCHA verification failed:', error.message);
            
            // Return a cautious result if verification fails
            return {
                success: false,
                score: 0.1,
                action: 'contact_form',
                hostname: '',
                challenge_ts: new Date().toISOString(),
                error_codes: ['network-error'],
                configured: true,
                error: error.message
            };
        }
    }

    /**
     * Analyze reCAPTCHA score and determine if submission should be blocked
     * @param {Object} recaptchaResult - Result from verifyToken
     * @returns {Object} - Analysis with spam decision and reasons
     */
    static analyzeScore(recaptchaResult) {
        const analysis = {
            isSpam: false,
            score: 0,
            reasons: [],
            severity: 'low',
            recaptchaScore: recaptchaResult.score
        };

        // If reCAPTCHA is not configured, skip this check
        if (!recaptchaResult.configured) {
            return analysis;
        }

        // Check if reCAPTCHA verification failed
        if (!recaptchaResult.success) {
            analysis.score += 60;
            analysis.reasons.push('reCAPTCHA verification failed');
            
            if (recaptchaResult['error-codes']) {
                const errorCodes = recaptchaResult['error-codes'];
                if (errorCodes.includes('invalid-input-response')) {
                    analysis.score += 40;
                    analysis.reasons.push('Invalid reCAPTCHA token');
                }
                if (errorCodes.includes('timeout-or-duplicate')) {
                    analysis.score += 30;
                    analysis.reasons.push('reCAPTCHA token expired or reused');
                }
            }
        } else {
            // Analyze the score (0.0 = bot, 1.0 = human)
            const score = recaptchaResult.score || 0;
            
            if (score < 0.3) {
                analysis.score += 80;
                analysis.reasons.push(`Very low reCAPTCHA score (${score}) - likely bot`);
            } else if (score < 0.5) {
                analysis.score += 50;
                analysis.reasons.push(`Low reCAPTCHA score (${score}) - suspicious activity`);
            } else if (score < 0.7) {
                analysis.score += 25;
                analysis.reasons.push(`Moderate reCAPTCHA score (${score}) - borderline suspicious`);
            }
            // Scores 0.7+ are considered legitimate
        }

        // Set spam decision based on score
        if (analysis.score >= 80) {
            analysis.isSpam = true;
            analysis.severity = 'high';
        } else if (analysis.score >= 50) {
            analysis.isSpam = true;
            analysis.severity = 'medium';
        } else if (analysis.score >= 25) {
            analysis.severity = 'medium';
        }

        return analysis;
    }

    /**
     * Check if reCAPTCHA is properly configured
     * @returns {boolean} - True if configured, false otherwise
     */
    static isConfigured() {
        const siteKey = process.env.RECAPTCHA_SITE_KEY;
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        
        return siteKey && secretKey && 
               siteKey !== 'your-site-key-here' && 
               secretKey !== 'your-secret-key-here';
    }

    /**
     * Get the site key for client-side implementation
     * @returns {string|null} - Site key or null if not configured
     */
    static getSiteKey() {
        const siteKey = process.env.RECAPTCHA_SITE_KEY;
        return (siteKey && siteKey !== 'your-site-key-here') ? siteKey : null;
    }
}

module.exports = RecaptchaVerification;