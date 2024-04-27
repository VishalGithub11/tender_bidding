const Tender = require('../models/Tender');

// Create a new tender
exports.createTender = async (req, res) => {
    try {
        const { name, description, startTime, endTime, bufferTimeInMinutes } = req.body;

        // Check if all required fields are provided
        if (!name || !description || !startTime || !endTime || !bufferTimeInMinutes) {
            return res.status(400).json({ message: 'Please provide all required details' });
        }
        
        const tender = new Tender({ name, description, startTime, endTime, bufferTimeInMinutes });
        await tender.save();
        res.status(200).json(tender);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all tenders
exports.getAllTenders = async (req, res) => {
    try {
        const tenders = await Tender.find();
        console.log("tenders", tenders);
        res.status(200).json(tenders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
