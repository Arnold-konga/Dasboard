const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 }
  }],
  total: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  mpesaReceiptNumber: { type: String }
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
