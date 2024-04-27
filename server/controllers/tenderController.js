const Bid = require('../models/Bid');
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
// exports.getAllTenders = async (req, res) => {
//     try {
//         const tenders = await Tender.find();
        
//         // Iterate through each tender and check if the user has placed a bid
//         for (let tender of tenders) {
//         const bid = await Bid.findOne({ user: req.userId, tender: tender._id });
//         if (bid) {
//           tender.userBidPrice = bid.price;
//     } else {
//         console.log("else....");
//         tender.userBidPrice = null;
//         console.log("tenders", tender);
//     }
// }

//         res.status(200).json(tenders);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

exports.getAllTenders = async (req, res) => {
    try {
        const tenders = await Tender.find();

        const modifiedTenders = [];

        // Iterate through each tender and check if the user has placed a bid
        for (let tender of tenders) {
            const bid = await Bid.findOne({ user: req.userId, tender: tender._id });
            let userBid = {
                hasBid: false,
                price: null
            };
            if (bid) {
                userBid = {
                    hasBid: true,
                    price: bid.price
                };
            }
            // Create a new object with the original tender data and the userBid property
            const modifiedTender = {
                ...tender.toObject(),
                userBid
            };
            // Push the modified tender to the new array
            modifiedTenders.push(modifiedTender);
        }

        res.status(200).json(modifiedTenders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
