const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const sequelize = require('./util/database');

const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');


// db.execute('SELECT * FROM PRODUCTS').then(result => {
//     console.log('Result: ', result);
// }).catch(err => {
//     console.log(err);
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// A middleware we pick User and assign to a user variable
app.use((req, res, next) => {
    User.findByPk(1).then(
        user => {
            req.user = user;
            next();
        }
    ).catch(err => {
        console.log(err);
    });
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

/**
 * Associations
 *  */ 
Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsTo(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});

// Dont use sync({force: true}) on production
// Replaces table
sequelize
// .sync({force: true})
.sync()
.then(result => {

    // console.log(result);

    return User.findByPk(1);

    
})
.then(user => {
    // Dummy Data
    if(!user) {
        return User.create({name: 'Max', email: 'test@test.com'});
    }

    return user;
    
})
.then(user => {
    console.log(user);
    
    return user.createCart();

})
.then(cart => {
    app.listen(3000, () => {
        console.log('Server started at port 3000');
    });
})
.catch(err => {
    console.log(err);
});


