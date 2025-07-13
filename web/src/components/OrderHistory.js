import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/orders/${userId}`)
      .then(response => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [userId]);

  return (
    <div>
      <h3>Order History</h3>
      {orders.map(order => (
        <div key={order._id}>
          <h4>Order ID: {order._id}</h4>
          <p>Status: {order.status}</p>
          <p>Total: ${order.total}</p>
          <ul>
            {order.products.map(item => (
              <li key={item.product._id}>
                {item.product.name} - ${item.product.price} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
