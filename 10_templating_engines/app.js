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

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));

    res.status(404).render('404', {pageTitle: 'Page Not Found', text: '404 Page Not Found!'});
});

app.listen(3000);
