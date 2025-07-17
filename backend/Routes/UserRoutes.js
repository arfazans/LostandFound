const express = require('express')
const router = express.Router();


const {getUsername,signUp,login} = require('../controller/UserController');

router.
get('/getUsername',getUsername)
.post('/signUp', signUp)
.post('/login',login)


module.exports = router;