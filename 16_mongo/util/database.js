const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://codedeepen:abcd%40123@cluster0.lntneqs.mongodb.net/?retryWrites=true&w=majority'
    ).then(
    client => {
      console.log('Connected!');
      _db = client.db();
      callback();
    }
  ).catch(err => {
    console.log(err);
    throw err;
  });
}

const getDb = () => {
  if(_db) {
    return _db;
  }
  throw 'No database found!';
}

module.exports = {
  mongoConnect,
  getDb
};

