const express = require('express')
const router = express.Router();
const upload = require('../config/multer')
const { validateItemReport } = require('../middleware/validation')
const {getAllProducts, reportProduct} = require('../controller/ItemsController')

router
.get('/', getAllProducts)
.post('/report', upload.single('image'), validateItemReport, reportProduct)

module.exports = router;