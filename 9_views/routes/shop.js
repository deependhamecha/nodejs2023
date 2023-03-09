const express = require('express');

const path = require('path');
const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    // res.sendFile('/views/shop.html'); // This doesnt work, coz it points to root folder of the operating system
    // res.sendFile(path.join(rootDir.projectPath, 'views', 'shop.html')); // __dirname = Give path until this file's directory.

    console.log(adminData.products);
    res.sendFile(path.join(rootDir.projectPath, 'views', 'shop.html'));
});

module.exports = router;