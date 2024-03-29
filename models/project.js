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
    type: [Object],
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
  hashtag: {
    type: [Object],
    required: false,
  },
  tools: {
    type: [Object],
    required: false,
  },
  catg: {
    type: [Object],
    required: false,
  },
  vueNumber: {
    type: Number,
    default: 0,
    required: false,
  },
  vueUsers: {
    type: [Object],
    required: false,
  },
});
ProjectSchema.pre("save", function (next) {
  next();
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
