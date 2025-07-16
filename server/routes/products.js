const router = require('express').Router();
let Product = require('../models/product.model');

router.route('/').get((req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const { name, description, price, category, size, images, seller } = req.body;

  const newProduct = new Product({
    name,
    description,
    price,
    category,
    size,
    images,
    seller
  });

  newProduct.save()
    .then(() => res.json('Product added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
