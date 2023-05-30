const mongoose = require('mongoose');

const flighSchema = mongoose.Schema({
    airline: {
        type: String,
        required: true,
    },
    flightNo: {
        type: String,
        required: true,
    },
    departure: {
        type: String,
        required: true,
    },
    arrival: {
        type: String,
        required: true,
    },
    departureTime: {
        type: Date,
        required: true,
    },
    arrivalTime: {
        type: Date,
        required: true,
    },
    seats: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

const flightModel = mongoose.model('flight', flighSchema);

module.exports = {flightModel}
