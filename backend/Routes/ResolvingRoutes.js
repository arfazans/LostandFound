const express = require('express')
const router = express.Router();
const upload = require('../config/multer')


const {getAllResolvingItems,getAllResolvedItems,createResolvingItem,resolutionMessageMarkRead,generalMessageMarkRead,discardResolvingItem,creatediscardedResolution,getAlldiscardedResolution,deletediscardResolutionMessage,checkalreadyresolutionsend} = require('../controller/ResolvingController');


router.
get('/getAllResolvingItems', getAllResolvingItems)
.get('/getAllResolvedItems', getAllResolvedItems)
.post('/createResolvingItem', upload.single('myphoto'),createResolvingItem)
.post('/discardResolvingItem',discardResolvingItem)
.patch('/resolutionMessageMarkRead',resolutionMessageMarkRead)
.patch('/generalMessageMarkRead',generalMessageMarkRead)
.post('/creatediscardedResolution', creatediscardedResolution)
.get('/getAlldiscardedResolution', getAlldiscardedResolution)
.post('/deletediscardResolutionMessage',deletediscardResolutionMessage)
.get('/checkalreadyresolutionsend',checkalreadyresolutionsend)


module.exports = router;