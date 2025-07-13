import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reviews = ({ productId, userId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/reviews/${productId}`)
      .then(response => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [productId]);

  const submitReview = () => {
    axios.post('http://localhost:5000/reviews/add', { product: productId, user: userId, rating, comment })
      .then(res => {
        console.log(res.data);
        // Refresh reviews
        axios.get(`http://localhost:5000/reviews/${productId}`)
          .then(response => {
            setReviews(response.data);
          })
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h4>Reviews</h4>
      {reviews.map(review => (
        <div key={review._id}>
          <p><strong>{review.user.username}</strong> - {review.rating}/5</p>
          <p>{review.comment}</p>
        </div>
      ))}
      <hr />
      <h5>Leave a Review</h5>
      <select value={rating} onChange={e => setRating(e.target.value)}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <textarea value={comment} onChange={e => setComment(e.target.value)}></textarea>
      <button onClick={submitReview}>Submit</button>
    </div>
  );
};

export default Reviews;
