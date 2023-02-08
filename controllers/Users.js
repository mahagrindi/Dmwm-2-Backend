const User = require("../models/user");

exports.UserList = async (req, res) => {
  try {
    const users = await User.find({}).populate();
    res.json({users}); 
  } catch (err) {
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};
