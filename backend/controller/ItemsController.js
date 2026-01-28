const Itemmodel = require('../models/Itemsmodel')
const cloudinary = require('../config/cloudinary')
const streamifier = require('streamifier');

const getAllProducts = async (req, res, next) => {
    try {
        const products = await Itemmodel.find().sort({ _id: -1 });
        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (err) {
        next(err);
    }
}

const reportProduct = async (req, res, next) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No image file provided' 
      });
    }

    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { 
            resource_type: 'image',
            folder: 'lost-and-found',
            transformation: [
              { width: 800, height: 600, crop: 'limit' },
              { quality: 'auto' }
            ]
          },
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

    const savedItem = await item.save();

    res.status(201).json({ 
      success: true, 
      message: 'Item reported successfully',
      data: savedItem 
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllProducts, reportProduct }