const mongoose = require('mongoose');

const CandleSchema = new mongoose.Schema({
    uid: {
        type: String,
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
    },
    addon: {
        type: [{ addonType: String, addonData: String }]
    },
    expireAt: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    shares: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Candle', CandleSchema);