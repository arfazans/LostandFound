const express = require('express')
const router = express.Router();

const {movingItem,updateusernamefrombackend} = require('../controller/MovingItemsController');

router.post('/',movingItem);
router.put('/updateusernamefrombackend',updateusernamefrombackend)

module.exports = router;