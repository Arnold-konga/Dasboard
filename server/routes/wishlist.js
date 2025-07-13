const router = require('express').Router();
let Wishlist = require('../models/wishlist.model');

router.route('/:userId').get((req, res) => {
  Wishlist.findOne({ user: req.params.userId })
    .populate('products')
    .then(wishlist => res.json(wishlist))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const { userId, productId } = req.body;

  Wishlist.findOne({ user: userId })
    .then(wishlist => {
      if (wishlist) {
        // Wishlist exists for user
        let itemIndex = wishlist.products.findIndex(p => p == productId);

        if (itemIndex > -1) {
          // Product exists in the wishlist, do nothing
          res.json('Item already in wishlist');
        } else {
          // Product does not exists in wishlist, add new item
          wishlist.products.push(productId);
          wishlist.save()
            .then(() => res.json('Wishlist updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        }
      } else {
        // No wishlist for user, create new wishlist
        const newWishlist = new Wishlist({
          user: userId,
          products: [productId]
        });
        newWishlist.save()
          .then(() => res.json('Wishlist created!'))
          .catch(err => res.status(400).json('Error: ' + err));
      }
    });
});

module.exports = router;
