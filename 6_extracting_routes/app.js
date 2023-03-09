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


const server = http.createServer(app);

server.listen(3000, () => {console.log('Server Started at port 3000.')});