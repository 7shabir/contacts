const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    name: String,
    phone: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Contact', ContactSchema);