const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {

    // It adds content type text/html for us
    // You can also use .. and avoid forward slash for operating system dependency
    // '..'
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    res.sendFile(path.join(rootDir.projectPath, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {

    products.push({title: req.body.title});
    // Since we are using Body Parser, it does data from chunks to Buffer concat for us.
    // console.log("req.body: ", req.body.message.toString());
    // return res.send('<h1>Product Saved!</h1>');

    console.log('[admin.js] products: ', products);
    res.redirect('/');
});

module.exports = {
    router,
    products
}