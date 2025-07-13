const router = require('express').Router();
let Order = require('../models/order.model');

router.route('/:userId').get((req, res) => {
  Order.find({ user: req.params.userId })
    .populate('products.product')
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const { userId, cart, total, mpesaReceiptNumber } = req.body;

  const newOrder = new Order({
    user: userId,
    products: cart.products,
    total,
    mpesaReceiptNumber
  });

  newOrder.save()
    .then(() => res.json('Order added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
