const mongoose = require('mongoose')

const itemsSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true },
    founderName: String,
    OwnerName: String,
    location: { type: String, required: true, index: true },
    description: String,
    phoneNumber: { 
        type: String, 
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'], 
        required: true 
    },
    image: { type: String, required: true },
    type: { type: String, enum: ['lost', 'found'], required: true, index: true },
    message: String,
    userTrack: { type: String, required: true }
}, {
    timestamps: true
})

// Compound index for better query performance
itemsSchema.index({ type: 1, createdAt: -1 });
itemsSchema.index({ name: 'text', description: 'text' });

const itemmodels = mongoose.model("recentsposts", itemsSchema);
module.exports = itemmodels
