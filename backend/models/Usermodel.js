const mongoose = require('mongoose')



const credentialSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: String,
    email: { type: String, required: true },
    password: { type: String, required: true },

})


const credentialmodels = mongoose.model("credentials", credentialSchema);


module.exports = credentialmodels