const express = require("express");
const router = express.Router();
const cors = require("cors");
const ProjectControllers = require("../controllers/Projects");
const upload = require("../Midellware/multer");

router.post(
  "/PostPrpject",
  upload.fields([{name: "images"}]),
  ProjectControllers.PostProject
);
module.exports = router;
