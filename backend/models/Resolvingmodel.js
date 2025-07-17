
const mongoose = require('mongoose')



const resolvingSchema = new mongoose.Schema({
    message: String,
    resolverEmail: String,
    itemId: String,
    resolvingUsername: String,
    myphoto: String,
    resolvingEmail: String,
    // message: {type:String, required:true},
    // userEmail: { type:String, required:true},
    // itemId:{type: String, required:true},
    read: { type: Boolean, default: false },
    createAt: { type: Date, default: Date.now }
})


const resolvingDiscardSchema = new mongoose.Schema({
    resolverUsername:String,
    resolvingUsername:String,
    itemName:String,
    resolverEmail:String,
    resolvingEmail:String,
    type:String,
     read: { type: Boolean, default: false },
    createAt: { type: Date, default: Date.now }
})



const resolvedItemsSchema = new mongoose.Schema({
    name: String,
    images: String,
    type: String,
    resolvingUsername: String,
    resolverUsername: String,
    resolvingEmail: String,
    resolverEmail: String,
    phoneNumber: String,
    resolvingDate: Date
})


const resolvingmodels = mongoose.model("resolvings", resolvingSchema);
const resolvedItemsmodels = mongoose.model("resolveditems", resolvedItemsSchema);
const resolvingDiscardmodels = mongoose.model("discardresolving" , resolvingDiscardSchema);


module.exports = {resolvingmodels,resolvedItemsmodels,resolvingDiscardmodels}
