const User = require('../models/user');

exports.postUser = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;

    const user = new User(username, email);

    user.save().then(result => {
        console.log(result);
        return res.json(result);
    }).catch(err => {console.log(err)});
}

exports.getUserById = (req, res, next) => {
    const userId = req.params.userId;
    console.log("userId: ", userId);

    User
        .findById(userId)
        .then(result => {
            console.log(result);
            return res.json(result);
        })
        .catch(err => {console.log(err)});

}
