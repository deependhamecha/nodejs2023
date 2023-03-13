/**
 * There are 3 types of famous templating engines:
 * 1. Ejs = <%= %>
 * 2. Pug(Jade) = p #{name}
 * 3. Handlebars = <p>{{ name }}</p>
 * 
 * To Learn more about pugjs
 * https://pugjs.org/api/getting-started.html
 */
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/**
 * Setting Templating Engine
 */
app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

app.listen(3000, () => {
    console.log("Started Local server on Port 3000.");
});
