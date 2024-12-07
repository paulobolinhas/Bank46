const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    account_id: String,
    transaction_type: String,
    amount: Number,
    currency: String,
    date: Date
}, { collection: 'transaction' });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
