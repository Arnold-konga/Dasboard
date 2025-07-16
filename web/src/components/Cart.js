import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = ({ userId }) => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/cart/${userId}`)
      .then(response => {
        setCart(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [userId]);

  return (
    <div>
      <h3>Shopping Cart</h3>
      {cart && cart.products.length > 0 ? (
        <div>
          <ul>
            {cart.products.map(item => (
              <li key={item.product._id}>
                {item.product.name} - ${item.product.price} x {item.quantity}
              </li>
            ))}
          </ul>
          <Checkout cart={cart} />
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
