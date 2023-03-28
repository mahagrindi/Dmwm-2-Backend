let mongoose = require("mongoose");
const PublicationSchema = new mongoose.Schema({
  Id_user: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },

  img: {
    type: [String],
    required: false,
  },
  reaction: {
    type: [Object],
    required: false,
  },
  commentaires: {
    type: [Object],
    required: false,
  },
  republier: {
    type: [Object],
    required: false,
  },
  hashtag: {
    type: [Object],
    required: false,
  },
});
PublicationSchema.pre("save", function (next) {
  next();
});

const Publication = mongoose.model("Publication", PublicationSchema);
module.exports = Publication;
