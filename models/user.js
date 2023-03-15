let mongoose = require("mongoose");
const crypto = require("crypto");

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
  passwordResetToken: String,
  passwordResetExpires: Date,
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
});

UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // token expires in 10 minutes
  return resetToken;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
