const express = require("express");
const router = express.Router();

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
router.post("/supprimerAbonnes", UserControllers.supprimerAbonnes);
module.exports = router;
