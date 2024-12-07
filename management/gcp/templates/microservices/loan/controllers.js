const Loan = require('./models/loan.js');
const mongoose = require('mongoose');

function isMongoConnected() {
    const state = mongoose.connection.readyState;
    return state === 1;
}

exports.getAllLoans = async (req, res) => {
    if (!isMongoConnected()) {
        console.error('MongoDB connection is not alive');
        return res.status(500).json({ message: 'MongoDB connection is down' });
    }

    try {
        const loans = await Loan.find();
        console.log("Loans: ", loans);
        res.json(loans);
    } catch (error) {
        console.error('Error fetching loan records:', error);
        res.status(500).json({ message: 'Failed to retrieve loan records' });
    }
};

exports.getLoanById = async (req, res) => {
    if (!isMongoConnected()) {
        console.error('MongoDB connection is not alive');
        return res.status(500).json({ message: 'MongoDB connection is down' });
    }

    try {
        const borrowerId = req.params.borrowerId; 
        const loan = await Loan.findOne({ borrower_id: borrowerId });

        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        console.log("Loan:", loan);
        res.json(loan);
    } catch (error) {
        console.error('Error fetching loan by ID:', error);
        res.status(500).json({ message: 'Failed to retrieve loan' });
    }
};

exports.createLoan = async (req, res) => {
    const { owner_id, amount, interestRate } = req.body;

    if (!isMongoConnected()) {
        console.error('MongoDB connection is not alive');
        return res.status(500).json({ message: 'Database connection error' });
    }

    try {
        const newLoan = new Loan({ owner_id, amount, interestRate });
        await newLoan.save();
        res.status(201).json(newLoan);
    } catch (error) {
        console.error('Error creating loan:', error);
        res.status(500).json({ message: 'Failed to create loan' });
    }
};
