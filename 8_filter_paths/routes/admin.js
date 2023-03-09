const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.send('<form action="/admin/add-product" method="POST"><input type="text" name="message" /><button>Save</button></form>');
});

router.post('/add-product', (req, res, next) => {

    // Since we are using Body Parser, it does data from chunks to Buffer concat for us.
    console.log("req.body: ", req.body.message.toString());
    return res.send('<h1>Product Saved!</h1>');
});

module.exports = router;