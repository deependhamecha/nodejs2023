const db = require('../util/database');
const Cart = require('./cart');


const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // PDO
    return db.execute('INSERT INTO products(title, price, imageUrl, description) VALUES(?, ?, ?, ?)', 
    [this.title, this.price, this.imageUrl, this.description]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM PRODUCTS;');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }

  static deleteById(id) {

  }

  static deleteProduct(id, productPrice) {

  }
};
