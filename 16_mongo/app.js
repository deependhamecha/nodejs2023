const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;

const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {

  User.findById('641f0c38f0b2e4e713377903')
  .then(user => {
    req.user = user;
    console.log('Getting the user: ', user);
    next();
  }).catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use('/users', userRoutes);

app.use(errorController.get404);

// Start after mongodb successful connect
mongoConnect(() => {
  console.log('Started server at port 3000.');
  app.listen(3000);
});