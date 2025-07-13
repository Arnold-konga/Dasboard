import React, { useState } from 'react';
import axios from 'axios';

const Checkout = ({ cart }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleCheckout = () => {
    const total = cart.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    axios.post('http://localhost:5000/mpesa/stkpush', { phoneNumber, amount: total })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h4>Checkout</h4>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleCheckout} className="btn btn-success">Pay with M-Pesa</button>
    </div>
  );
};

export default Checkout;
