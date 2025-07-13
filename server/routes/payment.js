const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const auth = require('../middleware/auth');
const Cart = require('../models/cart.model');

router.route('/create-checkout-session').post(auth, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate('products.product');

  if (!cart) {
    return res.status(400).json({ error: 'Cart not found' });
  }

  const line_items = cart.products.map(item => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product.name,
        },
        unit_amount: item.product.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
  });

  res.json({ id: session.id });
});

module.exports = router;
