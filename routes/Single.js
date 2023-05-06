const express = require("express");
const router = express.Router();
const cors = require("cors");
const SingleControllers = require("../controllers/Single");
 

router.post("/addSingle", SingleControllers.addSingle);  
router.post("/SinglePublication", SingleControllers.SinglePublication);  
router.get("/GetSingle", SingleControllers.SingleList);  
router.put("/UpdateSingle", SingleControllers.UpdateSingle);  

module.exports = router;
