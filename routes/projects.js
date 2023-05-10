const express = require("express");
const router = express.Router();
const cors = require("cors");
const ProjectControllers = require("../controllers/Projects");
const upload = require("../Midellware/multer");

router.post(
  "/PostPrpject",
  upload.fields([{ name: "images" }]),
  ProjectControllers.PostProject
);

router.get("/GetProjects", ProjectControllers.GetProject);
router.get("/getProjects/:id", ProjectControllers.getProjectsByUserId);
router.delete("/deleteProject", ProjectControllers.deletProject);
router.patch("/updateProject", ProjectControllers.updateProject);

module.exports = router;
