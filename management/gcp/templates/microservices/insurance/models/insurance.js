const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema({
    owner_id: String,
    title: String,
    monthly_payment: Number,
    currency: String
}, { collection: 'insurance' }); 

const Insurance = mongoose.model('Insurance', insuranceSchema);

module.exports = Insurance;
