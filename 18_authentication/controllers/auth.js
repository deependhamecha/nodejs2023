const bcrypt = require('bcrptjs');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false,
    errorMessage: req.flash('error')
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email})
    .then(user => {
      if(!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');
      }

      bcrypt.compare(password, user.password).then(
        doMatch => {
          if(doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;

            return req.session.save(err => {
              res.redirect('/');
            });
          }
          // Does not match
          else {
            res.redirect('/login');
          }
        }
      ).catch(err => {

        // This block is error and when password does not match.
        console.log(err);
        res.redirect('/login');
      });

      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        console.log(err);
        res.redirect('/');
      });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({email: email}).then(
    userDoc => {
      if(userDoc) {
        return res.redirect('/signup');
      } else {
        return bcrypt.hash(password, 12).then(hashedPassword => {
          const user = new User({
            name: '',
            email: email,
            password: hashedPassword,
          });
      
          return user.save();
        });
      }
    }
  )

  .then(result => {
    return res.redirect('/login');
  })
  .catch(
    err => {console.log(err)}
  );
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
