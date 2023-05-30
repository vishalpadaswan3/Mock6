
const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'flight'
    }
});

const bookModel = mongoose.model('booking', bookSchema);
module.exports = { bookModel }



