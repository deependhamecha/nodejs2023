const http = require('http');

// 1. Import
const express = require('express');

// 2. Initiate Express
const app = express();

// 3. Pass the callback function
const server = http.createServer(app);

server.listen(3000);