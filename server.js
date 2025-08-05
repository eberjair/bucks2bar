const http = require('http');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    // Use your own SMTP settings here (e.g. Gmail, Outlook, or your own server)
    host: 'smtp.email.com',
    port: 587,
    secure: false,
    auth: {
        user: 'user@email.com',
        pass: 'password'
    }
});

const server = http.createServer((req, res) => {
    console.log(`Received request: ${req.method} ${req.url}`);

    // Add CORS headers for all responses
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:52330');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/send-chart') {
        console.log('Received request to send chart');
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                const { email, image } = JSON.parse(body);

                // Basic email validation
                if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
                    res.writeHead(400);
                    return res.end(JSON.stringify({ message: 'Invalid email' }));
                }
                await transporter.sendMail({
                    from: 'user@email.com',
                    to: email,
                    subject: 'Your Chart Image',
                    text: 'Attached is your chart image.',
                    attachments: [{
                        filename: 'chart.png',
                        content: image.split(',')[1],
                        encoding: 'base64'
                    }]
                });
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Email sent!' }));
            } catch (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ message: 'Error sending email' }));
            }
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(3000, () => console.log('Server running on port 3000'));