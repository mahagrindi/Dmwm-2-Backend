let mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema({
  Id_user: {
    type: String,
    required: false,
  },
  title: {
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
ProjectSchema.pre("save", function (next) {
  next();
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
