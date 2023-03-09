const express = require('express');

const router = express.Router();

// Try hitting /dude and it will throw 404(Not Found) with this route
// router.get('/', (req, res, next) => {
//     console.log('In / route.');
//     res.send('<h1>Hello from Express!</h1>');
// });

// But this will handle
router.use('/', (req, res, next) => {
    console.log('In / route.');
    res.send('<h1>Hello from Express!</h1>');
});

module.exports = router;