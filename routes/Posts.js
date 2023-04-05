const express = require("express");
const router = express.Router();
const cors = require("cors");
const PostControllers = require("../controllers/Posts");
 

const upload = require("../Midellware/multer");
 
router.get("/getImages", PostControllers.getAllImages);
router.get("/getOneImage", PostControllers.getImage);


router.get("/getPublications", PostControllers.getPublication);

router.post(
  "/PostPublication",
  upload.fields([{name: "images"}]),
  PostControllers.PostPublication
);

router.get("/GetTag", PostControllers.GetTag);
router.post("/AddTag/:tagn", PostControllers.AddTags);

module.exports = router;
