const express = require("express");
const router = express.Router();


const PostControllers = require("../controllers/Posts");

router.post("/UplodeFile", PostControllers.UplodeFile);

router.get("/GetFile", PostControllers.GetFile);
router.get("/GetTag", PostControllers.GetTag);
router.post("/AddTag", PostControllers.AddTags);


module.exports = router;