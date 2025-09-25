// Test if contact endpoint is working
const http = require('http');

const postData = JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Subject',
    message: 'This is a test message with spam keywords: viagra sex casino',
    website: 'http://spam-bot.com', // This should trigger honeypot
    formTime: Date.now() - 1000 // Too fast submission
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/contact',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

console.log('🧪 Testing /contact endpoint...');
console.log('Sending spam data (should be blocked):\n');

const req = http.request(options, (res) => {
    let data = '';
    
    console.log(`Status Code: ${res.statusCode}`);
    console.log(`Headers:`, res.headers);
    
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        console.log('\nResponse Body:', data);
        console.log('\n✅ Test completed - check server terminal for spam detection logs');
    });
});

req.on('error', (err) => {
    console.error('❌ Request failed:', err.message);
});

req.write(postData);
req.end();