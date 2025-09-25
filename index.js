const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');


const app = express();
app.set('view engine', 'ejs'); // Set the template engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Parse JSON bodies

// Trust proxy for accurate IP detection (important for rate limiting)
app.set('trust proxy', 1);

// Global rate limiting - 100 requests per 15 minutes per IP
const globalRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max requests per window
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(globalRateLimit);

const path = require('path');

app.use(express.static("views"));
app.use(express.static("images"));
app.use(express.static("public"));
app.use(express.static("partials"));
app.use(express.static("css"));
app.use(express.static("components"));
app.use(express.static("controller"));
app.use(express.static("assets"));
app.use(express.static("assets/css"));
app.use(express.static("utils"));


app.use(require('./routes.js'));


// Handling 404 errors
app.use((req, res, next) => {
    res.status(404);
    //res.redirect('/error'); // Render a specific 404 page
    // or
     res.json({ error: 'Not Found' }); // Send a JSON response
  });



  app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500);
    //res.redirect('/servererror'); // Render a general error page
    // or
     res.json({ error: 'Internal Server Error' }); // Send a JSON response
  });




app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", () => {
    console.log("Web site is live");
});