const express = require('express');
const router = express.Router(); 

const UserControllers =  require('../controllers/Users');

   
router.get('/UserList', UserControllers.UserList );  

module.exports = router;
