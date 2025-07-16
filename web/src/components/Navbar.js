import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">E-commerce App</Link>
      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/cart" className="nav-link">Cart</Link>
          </li>
          <li className="navbar-item">
            <Link to="/wishlist" className="nav-link">Wishlist</Link>
          </li>
          <li className="navbar-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li className="navbar-item">
            <Link to="/register" className="nav-link">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
