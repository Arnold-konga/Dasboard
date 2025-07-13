import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  return (
    <div>
      <h3>Products</h3>
      <div className="row">
        {products.map(currentproduct => (
          <div className="col-md-4" key={currentproduct._id}>
            <div className="card mb-4 shadow-sm">
              <img src={currentproduct.images[0]} className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text">{currentproduct.name}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <a href={`/product/${currentproduct._id}`} className="btn btn-sm btn-outline-secondary">View</a>
                  </div>
                  <small className="text-muted">${currentproduct.price}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
