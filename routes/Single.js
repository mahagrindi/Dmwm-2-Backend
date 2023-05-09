const express = require("express");
const router = express.Router();
const cors = require("cors");
const SingleControllers = require("../controllers/Single");
 

router.post("/addSingle", SingleControllers.addSingle);  

module.exports = router;
