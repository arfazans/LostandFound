const express = require('express')
const router = express.Router();
const upload = require('../config/multer')

const {getAllProducts, reportProduct} = require('../controller/ItemsController')



router
.get('/', getAllProducts  )
.post('/report', upload.single('image'), reportProduct)

module.exports = router;