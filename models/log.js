const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    type: { // Change here
        type: String,
        enum: ['info', 'warning', 'error'], // Change here
        default: 'info'
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
