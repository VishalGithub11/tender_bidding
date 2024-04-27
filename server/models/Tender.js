// models/Tender.js

const mongoose = require('mongoose');

const TenderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    bufferTimeInMinutes: {
        type: Number,
        required: true
    },
    isTimeExtended: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Tender', TenderSchema);
