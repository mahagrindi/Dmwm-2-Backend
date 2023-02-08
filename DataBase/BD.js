const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ProjectAngular:ProjectAngular@projectangular.lm3q9yz.mongodb.net/?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
      }
    );

    console.log("Database connection success");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
