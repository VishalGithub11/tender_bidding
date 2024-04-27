// controllers/bidController.js

const Bid = require('../models/Bid');
const Tender = require('../models/Tender');

// Create a new bid
exports.createBid = async (req, res) => {
    try {
        const { price, tender } = req.body;

        const time = new Date();

        if (time < tenderDetails.startTime || time > tenderDetails.endTime) {
            return res.status(400).json({ message: 'Bid time must be within tender start and end time' });
        }
        
          // Check if all required fields are provided
          if ( !price || !tender) {
            return res.status(400).json({ message: 'Please provide all required details' });
        }

        const tenderDetails = await Tender.findById(tender);
        if (!tenderDetails) {
            return res.status(404).json({ message: 'Tender not found' });
        }
       
        const endTime = new Date(tenderDetails.endTime);
        
        // Check if bid time is within 5 minutes of tender end time
        if (currentTime >= endTime - 5 * 60 * 1000 && currentTime <= endTime) {
            // If bid is placed within the last 5 minutes, extend tender end time
            tenderDetails.endTime = new Date(endTime.getTime() + tenderDetails.bufferTime * 60 * 1000);
            tenderDetails.isTimeExtended = true;
            await tenderDetails.save();
        }
       
        const bid = new Bid({user:req.userId,  price, tender });
        await bid.save();
        res.json(bid);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all bids for a specific tender
exports.getAllBidsForTender = async (req, res) => {
    try {
        const bids = await Bid.find({ tender: req.params.tenderId }).populate('user', 'name').populate('tender', ['name', 'startTime']).exec();
        res.json(bids);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
