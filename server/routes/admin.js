const router = require('express').Router();
const { auth, admin } = require('../middleware/auth');

router.get('/products', [auth, admin], (req, res) => {
  res.send('Admin: Manage products');
});

router.get('/orders', [auth, admin], (req, res) => {
  res.send('Admin: Manage orders');
});

router.get('/users', [auth, admin], (req, res) => {
  res.send('Admin: Manage users');
});

module.exports = router;
