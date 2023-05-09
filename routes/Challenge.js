const express = require("express");
const router = express.Router();
const cors = require("cors");
const ChallengeControllers = require("../controllers/Challenge");
const upload = require("../Midellware/multer");

router.post(
  "/CreatChallenge",
  upload.fields([{name: "images"}]),
  ChallengeControllers.CreatChallenge
);
router.get("/getChallenge", ChallengeControllers.ChallengeList);
router.post("/getChallengeById", ChallengeControllers.getChallengeById);
router.post(
  "/sendChallenge",
  upload.fields([{name: "images"}]),
  ChallengeControllers.SendChallenge
);
router.post("/deleteChallenge", ChallengeControllers.deleteChallenge);

router.post("/winner", ChallengeControllers.winner);

module.exports = router;
