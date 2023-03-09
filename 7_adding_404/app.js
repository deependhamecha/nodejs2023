/**
 * Exporting Routes to a separate file using Express Router
 */
const http = require('http');

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(adminRoutes);
app.use(shopRoutes);

// This will handle last ** request.
app.use((req, res, next) => {
    // Status will set status code
    res.status(404).send('<h1>Page not found</h1>');
});

const server = http.createServer(app);

server.listen(3000, () => {console.log('Server Started at port 3000.')});