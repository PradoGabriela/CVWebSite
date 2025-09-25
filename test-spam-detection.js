// Test script to verify spam detection is working
const SpamDetection = require('./utils/spamDetection');

console.log('🧪 Testing Spam Detection System...\n');

// Test 1: Honeypot Detection
console.log('TEST 1: Honeypot Field Test');
const honeypotTest = {
    name: 'John Doe',
    email: 'test@gmail.com',
    subject: 'Hello',
    message: 'This is a test message',
    website: 'http://spam-site.com', // This should trigger spam detection
    formTime: Date.now() - 5000
};

const result1 = SpamDetection.analyzeSubmission(honeypotTest);
console.log('Result:', result1);
console.log('Expected: isSpam = true (honeypot filled)\n');

// Test 2: Legitimate Submission
console.log('TEST 2: Legitimate Submission Test');
const legitTest = {
    name: 'Jane Smith',
    email: 'jane@gmail.com',
    subject: 'Business Inquiry',
    message: 'I would like to discuss a potential project with you.',
    website: '', // Empty honeypot = good
    formTime: Date.now() - 10000
};

const result2 = SpamDetection.analyzeSubmission(legitTest);
console.log('Result:', result2);
console.log('Expected: isSpam = false (legitimate)\n');

// Test 3: Spam Keywords
console.log('TEST 3: Spam Keywords Test');
const spamKeywordsTest = {
    name: 'Spammer',
    email: 'spammer@test.com',
    subject: 'Amazing offer!',
    message: 'Buy viagra now! Make money fast! Click here to win lottery! Sex casino porn!',
    website: '', 
    formTime: Date.now() - 8000
};

const result3 = SpamDetection.analyzeSubmission(spamKeywordsTest);
console.log('Result:', result3);
console.log('Expected: isSpam = true (multiple spam keywords)\n');

// Test 4: Speed Test
console.log('TEST 4: Too Fast Submission Test');
const speedTest = {
    name: 'Bot',
    email: 'bot@test.com',
    subject: 'Fast',
    message: 'Quick message',
    website: '',
    formTime: Date.now() - 1000 // Submitted 1 second after load = too fast
};

const result4 = SpamDetection.analyzeSubmission(speedTest);
console.log('Result:', result4);
console.log('Expected: isSpam = true (too fast)\n');

// Summary
console.log('='.repeat(50));
console.log('SUMMARY:');
console.log(`Test 1 (Honeypot): ${result1.isSpam ? '✅ PASS' : '❌ FAIL'}`);
console.log(`Test 2 (Legitimate): ${!result2.isSpam ? '✅ PASS' : '❌ FAIL'}`);
console.log(`Test 3 (Keywords): ${result3.isSpam ? '✅ PASS' : '❌ FAIL'}`);
console.log(`Test 4 (Speed): ${result4.isSpam ? '✅ PASS' : '❌ FAIL'}`);

if (result1.isSpam && !result2.isSpam && result3.isSpam && result4.isSpam) {
    console.log('\n🎉 ALL TESTS PASSED! Spam detection is working correctly.');
} else {
    console.log('\n❌ Some tests failed. Check the SpamDetection logic.');
}