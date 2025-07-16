import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const [product, setProduct] = useState({
    images: []
  });
  let { id } = useParams();

  useEffect(() => {
    axios.get('http://localhost:5000/products/'+id)
      .then(response => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [id]);

  const addToCart = () => {
    // You would typically get the userId from your auth context
    const userId = "some_user_id";
    axios.post('http://localhost:5000/cart/add', { userId, productId: id, quantity: 1 })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  const addToWishlist = () => {
    // You would typically get the userId from your auth context
    const userId = "some_user_id";
    axios.post('http://localhost:5000/wishlist/add', { userId, productId: id })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  const userId = "some_user_id"; // You would typically get this from your auth context

  return (
    <div>
      <h3>{product.name}</h3>
      <img src={product.images[0]} className="img-fluid" alt="..." />
      <p>{product.description}</p>
      <p>${product.price}</p>
      <p>Category: {product.category}</p>
      <p>Size: {product.size}</p>
      <button onClick={addToCart} className="btn btn-primary">Add to Cart</button>
      <button onClick={addToWishlist} className="btn btn-secondary">Add to Wishlist</button>
      <hr />
      <Reviews productId={id} userId={userId} />
    </div>
  );
};

export default ProductDetails;
