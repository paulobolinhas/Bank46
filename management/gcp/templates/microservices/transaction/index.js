const express = require('express');
const mongoose = require('mongoose');
const transactionController = require('./controllers.js'); 

const app = express();
const port = 2600;

const mongoURI = 'mongodb://34.118.71.118:27017/Bank46'; 

async function connectToMongo() {
    try {
        mongoose.set('debug', true);
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');

        const db = mongoose.connection;

        db.once('open', async () => {
            console.log('Connection to DB is open');

            const collections = await db.db.listCollections().toArray();
            console.log('Collections in the database:', collections);
        });

    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}

connectToMongo().then(() => {
    app.listen(port, '0.0.0.0', () => {
        console.log(`Server is running on http://0.0.0.0:${port}`);
    });
});

app.get('/transaction', transactionController.getAllTransactions);
app.get('/transaction/:account_id', transactionController.getTransactionById);
app.post('/transaction/createtransaction', transactionController.createTransaction);
