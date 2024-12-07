const Transaction = require('./models/transaction.js');
const mongoose = require('mongoose');

function isMongoConnected() {
    const state = mongoose.connection.readyState;
    return state === 1;
}

exports.getAllTransactions = async (req, res) => {
    if (!isMongoConnected()) {
        console.error('MongoDB connection is not alive');
        return res.status(500).json({ message: 'MongoDB connection is down' });
    }

    try {
        const transactions = await Transaction.find();
        console.log("Transactions: ", transactions);
        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transaction records:', error);
        res.status(500).json({ message: 'Failed to retrieve transaction records' });
    }
};

exports.getTransactionById = async (req, res) => {
    if (!isMongoConnected()) {
        console.error('MongoDB connection is not alive');
        return res.status(500).json({ message: 'MongoDB connection is down' });
    }

    try {
        const accountId = req.params.accountId; 
        const transaction = await Transaction.findOne({ account_id: accountId });

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        console.log("Transaction:", transaction);
        res.json(transaction);
    } catch (error) {
        console.error('Error fetching transaction by ID:', error);
        res.status(500).json({ message: 'Failed to retrieve transaction' });
    }
};

exports.createTransaction = async (req, res) => {
    const { owner_id, amount, type } = req.body;

    if (!isMongoConnected()) {
        console.error('MongoDB connection is not alive');
        return res.status(500).json({ message: 'Database connection error' });
    }

    try {
        const newTransaction = new Transaction({ owner_id, amount, type });
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ message: 'Failed to create transaction' });
    }
};