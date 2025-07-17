const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const wishlistRouter = require('./routes/wishlist');
const mpesaRouter = require('./routes/mpesa');
const ordersRouter = require('./routes/orders');
const notificationsRouter = require('./routes/notifications');
const reviewsRouter = require('./routes/reviews');
const adminRouter = require('./routes/admin');

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/wishlist', wishlistRouter);
app.use('/mpesa', mpesaRouter);
app.use('/orders', ordersRouter);
app.use('/notifications', notificationsRouter);
app.use('/reviews', reviewsRouter);
app.use('/admin', adminRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
