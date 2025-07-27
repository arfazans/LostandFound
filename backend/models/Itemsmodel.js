const mongoose = require('mongoose')




const itemsSchema = new mongoose.Schema({
    name: String,
    founderName: String,
    OwnerName: String,
    location: String,
    description: String,
    phoneNumber: { type: String, match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'], required: true },
    image: String,
    type: String,
    message: String,
    userTrack: String
})

const itemmodels = mongoose.model("recentsposts", itemsSchema);
module.exports = itemmodels
