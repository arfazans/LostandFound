const Itemmodel = require('../models/Itemsmodel')

// bussinesss logic

const getAllProducts =  async (req, res) => {
    try {

        const product = await Itemmodel.find();
        res.json(product);
        // console.log(product);

    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data from database");
    }
}


const reportProduct = async (req, res) => {
    try {


        const imagePath = req.file ? `uploads/${req.file.filename}` : ''; // store relative path


        const item = new Itemmodel({
            ...req.body,
            images: imagePath, // store image path in DB
            // emailVerificationToken: Math.random().toString(36).substr(2, 10), // generate verification token


        });

        await item.save();

        res.status(201).send({ success: true, item }); // send success response
    } catch (err) {
        console.error('Error saving item:', err);
        res.status(500).send({ success: false, message: 'Server error' });
    }
}


module.exports = {getAllProducts,reportProduct}