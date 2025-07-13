import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Wishlist = ({ userId }) => {
  const [wishlist, setWishlist] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/wishlist/${userId}`)
      .then(response => {
        setWishlist(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [userId]);

  return (
    <div>
      <h3>Wishlist</h3>
      {wishlist ? (
        <ul>
          {wishlist.products.map(product => (
            <li key={product._id}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your wishlist is empty</p>
      )}
    </div>
  );
};

export default Wishlist;
