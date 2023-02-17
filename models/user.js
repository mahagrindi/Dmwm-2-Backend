let mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  bio: {
    type: String,
    required: true,
  },

  watermark: {
    type: String,
    // required: true,
  },
  followers: {
    type: [String],
    // required: true,
  },
  galerie: {
    type: [String],
    // required: true,
  },
  liens: {
    type: [String],
    required: false,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
