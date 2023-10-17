const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  amount: Number,
  upiId: String,
  mobileNumber: String,
  transactionId: String,
  status: String,
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
