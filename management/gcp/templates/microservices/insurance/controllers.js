const Insurance = require('./models/insurance.js');
const mongoose = require('mongoose');

function isMongoConnected() {
    const state = mongoose.connection.readyState;
    return state === 1;
}

exports.getAllInsurance = async (req, res) => {
    
    if (!isMongoConnected()) {
        console.error('MongoDB connection is not alive');
        return null;
    }
    
    try {
        const insurances = await Insurance.find();
        console.log("Insurances: ", insurances);
        
        res.json(insurances);
    } catch (error) {
        console.error('Error fetching insurance records:', error);
        res.status(500).json({ message: 'Failed to retrieve insurance records' });
    }
};

exports.getInsuranceById = async (req, res) => {
    if (!isMongoConnected()) {
        console.error('MongoDB connection is not alive');
        return res.status(500).json({ message: 'MongoDB connection is down' });
    }

    try {
        const ownerId = req.params.ownerId; 
        const insurance = await Insurance.findOne({ owner_id: ownerId });

        if (!insurance) {
            return res.status(404).json({ message: 'Insurance not found' });
        }

        console.log("Insurance:", insurance);
        res.json(insurance);
    } catch (error) {
        console.error('Error fetching insurance by ID:', error);
        res.status(500).json({ message: 'Failed to retrieve insurance' });
    }
};

exports.createInsurance = async (req, res) => {
    if (!isMongoConnected()) {
        console.error('MongoDB connection is not alive');
        return res.status(500).json({ message: 'MongoDB connection is down' });
    }

    const { owner_id, title, monthly_payment, currency } = req.body;

    // Validate incoming data
    if (!owner_id || !title || !monthly_payment || !currency) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newInsurance = new Insurance({
            owner_id,
            title,
            monthly_payment,
            currency,
        });

        await newInsurance.save();
        console.log("New insurance created:", newInsurance);
        res.status(201).json(newInsurance);
    } catch (error) {
        console.error('Error creating insurance record:', error);
        res.status(500).json({ message: 'Failed to create insurance record' });
    }
};
