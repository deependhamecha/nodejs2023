const express = require('express');

const router = express.Router();


router.get('/user', (req, res, next) => {
    console.log(req.body);
    res.redirect('/users');
});

router.use('/user', (req, res, next) => {
    console.log(req.body);
    res.redirect('/users');
});

router.use('/users', (req, res, next) => {
    console.log('In / route.');
    res.send('<h1>The "Users" Page</h1>');
}); 


module.exports = router;