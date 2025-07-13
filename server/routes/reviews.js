const router = require('express').Router();
let Review = require('../models/review.model');

router.route('/:productId').get((req, res) => {
  Review.find({ product: req.params.productId })
    .populate('user')
    .then(reviews => res.json(reviews))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const { product, user, rating, comment } = req.body;

  const newReview = new Review({
    product,
    user,
    rating,
    comment
  });

  newReview.save()
    .then(() => res.json('Review added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
