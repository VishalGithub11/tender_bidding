

const Bid = require('../models/Bid');
const Tender = require('../models/Tender');

exports.createBid = async (req, res) => {
    try {
        const { price, tender } = req.body;

        const time = new Date();

        // Check if all required fields are provided
        if (!price || !tender) {
            return res.status(400).json({ message: 'Please provide all required details' });
        }

        const tenderDetails = await Tender.findById(tender);
        if (!tenderDetails) {
            return res.status(404).json({ message: 'Tender not found' });
        }
         // Check if tenderDetails.endTime is a valid date
        if (!(tenderDetails.endTime instanceof Date && !isNaN(tenderDetails.endTime))) {
            return res.status(400).json({ message: 'Invalid end time for the tender' });
        }
        if (time < tenderDetails.startTime || time > tenderDetails.endTime) {
            return res.status(400).json({ message: 'Bid time must be within tender start and end time' });
        }
        const endTime = new Date(tenderDetails.endTime);
        console.log("endTime", endTime);
        // Check if bid time is within 5 minutes of tender end time
        if (time >= endTime - 5 * 60 * 1000 && time <= endTime) {
            // If bid is placed within the last 5 minutes, extend tender end time
            tenderDetails.endTime = new Date(endTime.getTime() + tenderDetails.bufferTime * 60 * 1000);
            console.log("updayed time",tenderDetails.endTime);
            tenderDetails.isTimeExtended = true;
            await tenderDetails.save();
            addBid({isBidPlacedInLast5Min:true})
        }else{
            addBid({isBidPlacedInLast5Min:false})
        }

        const addBid = async ({isBidPlacedInLast5Min})=>{
            const bid = new Bid({ user: req.userId, price, tender, isBidPlacedInLast5Min });
            await bid.save();
           return res.json(bid);
        }
       
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Get all bids for a specific tender
exports.getAllBids = async (req, res) => {
    try {
        const bids = await Bid.find({}).populate('user', 'name').populate('tender', ['name', 'endTime']).exec();
        res.json(bids);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
