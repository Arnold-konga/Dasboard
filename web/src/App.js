import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Checkout from './components/Checkout';
import OrderHistory from './components/OrderHistory';
import AdminDashboard from './components/Admin/AdminDashboard';
import ProductManagement from './components/Admin/ProductManagement';
import OrderManagement from './components/Admin/OrderManagement';
import UserManagement from './components/Admin/UserManagement';
import './App.css';

function App() {
  // You would typically get the userId from your auth context
  const userId = "some_user_id";

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/cart" render={(props) => <Cart {...props} userId={userId} />} />
          <Route exact path="/wishlist" render={(props) => <Wishlist {...props} userId={userId} />} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/orders" render={(props) => <OrderHistory {...props} userId={userId} />} />
          <Route exact path="/admin" component={AdminDashboard} />
          <Route exact path="/admin/products" component={ProductManagement} />
          <Route exact path="/admin/orders" component={OrderManagement} />
          <Route exact path="/admin/users" component={UserManagement} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
