const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    borrower_id: String,
    loan_amount: Number,
    interest_rate: Number,
    loan_term: String,
    currency: String
}, { collection: 'loan' });

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
