const express = require("express");
const app = express();
const mongoose = require("mongoose");

const morgan = require("morgan");

const connectDB = require("./DataBase/BD");

const UserRoutes = require("./routes/users");

const cors = require("cors");

require("dotenv").config();

app.use(morgan("dev"));
app.use(express.json());

app.use("/User", cors(), UserRoutes);

mongoose.set("strictQuery", false);
connectDB();

app.get("/", (rep, res) => {
  res.send("insaid server");
});
const port = process.env.PORT || 5000;

app.listen(port, () => console.log("server is up and running  "));
