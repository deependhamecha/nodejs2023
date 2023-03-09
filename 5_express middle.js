const http = require('http');

// 1. Import
const express = require('express');

// 2. Initiate Express
const app = express();

// 3. Middleware
// app.use( (req, res, next) => {}); // A simple middleware


// 4. Multiple middlewares
app.use( (req, res, next) => {
    console.log('In 1st middleware!');
    next();
});

app.use( (req, res, next) => {
    console.log('In 2nd middleware!');
    next();
});

// A simple middleware (This is an endpoint)
// app.use( (req, res, next) => {
//     console.log('In another middleware!');
//     res.send('<h1>Hello from Express!</h1>');
// }); // A simple middleware

// 7 - Request doesnt parse incoming body
// Install npm install body-parser
app.use(bodyParser.urlencoded({extended: false}));


// 8. Use will use for all type of request.
// For only get,  use get() instead of use()
app.get('/user', (req, res, next) => {
    console.log(req.body);
    res.redirect('/users');
});


// 6
// Redirect
app.use('/user', (req, res, next) => {
    console.log(req.body);
    res.redirect('/users');
});

// 5
// Keep it before / route
app.use('/users', (req, res, next) => {
    console.log('In / route.');
    res.send('<h1>The "Users" Page</h1>');
}); 



// Endpoint
app.use('/', (req, res, next) => {
    console.log('In / route.');
    res.send('<h1>Hello from Express!</h1>');
}); // A simple middleware


// 5. Pass the callback function
const server = http.createServer(app);


server.listen(3000);