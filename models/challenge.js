let mongoose = require("mongoose");
const ChallengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  partenaire: {
    type: Object,
    required: true,
  },
  participants: {
    type: [Object],
  },
  image: {
    type: [Object],
    required: false,
  },
  winner: {
    type: String,
    required: false,
  },
});

const Challenge = mongoose.model("Challenge", ChallengeSchema);
module.exports = Challenge;
