const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
  constructor(username, email, id) {
    this.username = username;
    this.email = email;
    this._id = id ? new mongodb.ObjectId(id): null;
  }

  save() {
    return getDb().collection('users').insertOne(this);
  }

  static findById(userId) {

    // You can also use findOne which does not return cursor but data.
    return getDb().collection('users').find({ _id: new mongodb.ObjectId(userId)}).next();

  }
}

module.exports = User;