const express = require("express");
const router = express.Router();

const UserControllers = require("../controllers/Users");

router.get("/UserList", UserControllers.UserList);
router.post("/inscription", UserControllers.userInscription);
router.post("/login", UserControllers.userLogin);

module.exports = router;
