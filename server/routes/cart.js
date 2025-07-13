const router = require('express').Router();
let Cart = require('../models/cart.model');

router.route('/:userId').get((req, res) => {
  Cart.findOne({ user: req.params.userId })
    .populate('products.product')
    .then(cart => res.json(cart))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const { userId, productId, quantity } = req.body;

  Cart.findOne({ user: userId })
    .then(cart => {
      if (cart) {
        // Cart exists for user
        let itemIndex = cart.products.findIndex(p => p.product == productId);

        if (itemIndex > -1) {
          // Product exists in the cart, update the quantity
          let productItem = cart.products[itemIndex];
          productItem.quantity = quantity;
          cart.products[itemIndex] = productItem;
        } else {
          // Product does not exists in cart, add new item
          cart.products.push({ product: productId, quantity });
        }
        cart.save()
          .then(() => res.json('Cart updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      } else {
        // No cart for user, create new cart
        const newCart = new Cart({
          user: userId,
          products: [{ product: productId, quantity }]
        });
        newCart.save()
          .then(() => res.json('Cart created!'))
          .catch(err => res.status(400).json('Error: ' + err));
      }
    });
});

module.exports = router;
