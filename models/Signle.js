let mongoose = require("mongoose");
const SingleSchema = new mongoose.Schema({
  Id_user: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: false,
  },
  publiction_id: {
    type: String,
    required: false,
  },
  state: {
    type: Boolean,
    default: true,
  },
});

const Single = mongoose.model("Single", SingleSchema);
module.exports = Single;
