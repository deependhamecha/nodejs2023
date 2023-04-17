const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed.routes');

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded

app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Allowed Methods, rest not allowed.
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATH, DELETE');

    // Allowed Headers, rest not allowed.
    // If you comment this line and send Content-Type from Frontend manually then it will fail.
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})
app.use('/feed', feedRoutes);

mongoose.connect('mongodb+srv://codedeepen:abcd%40123@cluster0.lntneqs.mongodb.net/?retryWrites=true&w=majority')
.then(result => {
    app.listen(8080, () => {
        console.log("Started Local Server on port 8080.");
    });
}).catch(err => {console.log(err)});
