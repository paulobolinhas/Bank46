const express = require('express');
const mongoose = require('mongoose');
const client = require('prom-client');
const insuranceController = require('./controllers.js'); 

const app = express();
const port = 2400;
const mongoURI = 'mongodb:/34.118.48.252:27017/Bank46'; 
const register = new client.Registry();

const httpRequestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Count of total HTTP requests',
    labelNames: ['method', 'route', 'status_code'], 
});

register.registerMetric(httpRequestCounter);

client.collectDefaultMetrics({ register });

app.use((req, res, next) => {
    httpRequestCounter.inc({ method: req.method, route: req.route?.path || req.path, status_code: res.statusCode });
    next();
});

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

app.get('/insurance', insuranceController.getAllInsurance);
app.get('/insurance/:owner_id', insuranceController.getInsuranceById);
app.post('/insurance/createinsurance', insuranceController.createInsurance);

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});
