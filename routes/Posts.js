const express = require("express");
const router = express.Router();
const cors = require("cors");
const PostControllers = require("../controllers/Posts");

//router.post("/UplodeFile", PostControllers.UplodeFile);

const upload = require("../Midellware/multer");

//router.get("/GetFile", PostControllers.GetFile);
router.get("/getPublication", PostControllers.getPublication);

router.post("/PostPublication",   upload.fields([{name: "image"}]),PostControllers.PostPublication);



router.get("/GetTag", PostControllers.GetTag);
router.post("/AddTag/:tagn", PostControllers.AddTags);

module.exports = router;
