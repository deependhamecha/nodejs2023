// With Sequelize v5, findById() (which we'll use in this course) was replaced by findByPk().
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {

  req.user.createProduct();

  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  
  Product.create({
    title,
    imageUrl,
    price,
    description,
    userId: req.user.id
  }).then(result => {
    console.log(result);
    res.redirect('/admin/products');
  }).catch(err => {
    console.log(err);
  });
};

exports.getEditProduct = (req, res, next) => {
  console.log('Coming here');
  const editMode = req.query.edit;
  console.log("editMode: ", editMode);
  if(!editMode) {
    return res.redirect('/');
  }

  const prodId = req.params.productId;

  Product.findByPk(prodId).then((product) => {
    if(!product) {
      return res.redirect('/');
    } else {
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
        editing: editMode,
        product: product
      });
      
    }
  }).catch(err => {console.log(err)});

};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;

  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  console.log('COMING HERE', prodId);

  Product.findByPk(prodId).then(product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDesc;
    product.imageUrl = updatedImageUrl;
    console.log("--------------------------------------------------------");
    return product.save();
  })
  // Returned Promise of save
  .then(result => {
    console.log("SAVED PRODUCT: ", result);
    res.redirect('/admin/products');
  })
  .catch(err => {
    console.log(err);
  })
};

exports.getProducts = (req, res, next) => {

  // Product.findAll()
  req.user.getProducts().then(products => { // Use Model Data just like eloquent
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err => {
    console.log(err);
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  
  Product.findByPk(prodId).then(
    product => {
      return product.destroy();
    }
  )
  .then(result => {
    console.log('Product Destroyed');
    res.redirect('/admin/products');
  })
  .catch(err => {
    console.log(err);
  });
}
