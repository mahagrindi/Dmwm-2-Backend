const express = require("express");
const router = express.Router();
const cors = require("cors");
const User = require("../models/user");
const crypto = require("crypto");

const UserControllers = require("../controllers/Users");
router.delete("/deleteUser", UserControllers.userDelete);
router.get("/UserList", UserControllers.UserList);
router.get("/getUserById/:id", UserControllers.findUserById);
router.get("/getUserByUsername/:username", UserControllers.findUserByUsername);
router.post("/inscription", UserControllers.userInscription);
router.post("/login", UserControllers.userLogin);
router.post("/forgotPassword", UserControllers.forgotPassword);
router.patch("/resetPassword/:token", UserControllers.resetPassword);
router.post("/ajouterAbonnes", UserControllers.ajouterAbonnes);

// router.param("token", async (req, res, next, token) => {
//   console.log(token);
//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(req.params.token)
//     .digest("hex");
//   const user = await User.findOne({
//     passwordResetToken: hashedToken,
//     passwordResetExpires: { $gt: Date.now() }, //verif if token didn't expired
//   });

//   //if token has not expired, and there is  user, set the new user
//   if (!user) {
//     return res.status(400).send("Token invalid or expired");
//   } else {
//     next();
//   }
// });
module.exports = router;
