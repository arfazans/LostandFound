const Itemmodel = require('../models/Itemsmodel')
const cloudinary = require('../config/cloudinary')
const streamifier = require('streamifier');




// bussinesss logic

const getAllProducts = async (req, res) => {
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
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'image' },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const result = await streamUpload(file.buffer);

    const item = new Itemmodel({
      ...req.body,
      image: result.secure_url,
    });

    await item.save();

    res.status(201).json({ success: true, item });
  } catch (err) {
    console.error('Error saving item:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


module.exports = { getAllProducts, reportProduct }