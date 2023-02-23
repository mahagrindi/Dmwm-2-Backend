let jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (req, res, next) => {
  let { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "failed access" });
  }
  let token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.ACCES_TOKEN_KEY, async (err, payload) => {
    if (err) {
      res.status(401).send({ error: "erreur" });
    } else {
      let { userId } = payload;
      let user = await User.findById(userId);
      req.user = user;
      next();
    }
  });
};
