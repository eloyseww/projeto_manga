const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    responsible: { type: String, enum: ['Shounen', 'Shoujo', 'Gekigá', 'Josei'], required: true }
});

module.exports = mongoose.model('Collection', collectionSchema);