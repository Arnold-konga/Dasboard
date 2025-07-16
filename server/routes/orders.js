const router = require('express').Router();
let Order = require('../models/order.model');

router.route('/:userId').get((req, res) => {
  Order.find({ user: req.params.userId })
    .populate('products.product')
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/details/:orderId').get((req, res) => {
  Order.findById(req.params.orderId)
    .populate('products.product')
    .then(order => res.json(order))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const { userId, cart, total, paymentIntentId } = req.body;

  const newOrder = new Order({
    user: userId,
    products: cart.products,
    total,
    paymentIntentId
  });

  newOrder.save()
    .then(() => res.json('Order added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
