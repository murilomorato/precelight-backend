const mongoose = require('mongoose');

const CandleSchema = new mongoose.Schema({
    uid: {
        type: Number,
        required: true,
        unique: true
    },
    candleType: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Candle', CandleSchema);