const express = require("express");
const router = express.Router();
const cors = require("cors");
const PostControllers = require("../controllers/Posts");

const upload = require("../Midellware/multer");

router.get("/getImages", PostControllers.getAllImages);

router.get("/getImage", PostControllers.getImage);
router.get("/getPublications", PostControllers.getPublication);
router.put("/reaction", PostControllers.addreaction);
router.put("/addcomment", PostControllers.addcomment);
router.put("/commreaction", PostControllers.commreaction);
router.put("/addcommentReply", PostControllers.addcommentReply);
router.post(
  "/PostPublication",
  upload.fields([{ name: "images" }]),
  PostControllers.PostPublication
);

router.get("/GetTag", PostControllers.GetTag);
router.post("/AddTag/:tagn", PostControllers.AddTags);

module.exports = router;
