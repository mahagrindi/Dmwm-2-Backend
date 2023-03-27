const express = require("express");
const app = express();
const mongoose = require("mongoose");

const morgan = require("morgan");

const connectDB = require("./DataBase/BD");

const UserRoutes = require("./routes/users");

const PostRoutes = require("./routes/Posts");

const cors = require("cors");

require("dotenv").config();

var bodyParser = require("body-parser");

var fs = require("fs");
var path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set EJS as templating engine
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.json());

app.use("/User", cors(), UserRoutes);

app.use("/Posts", cors(), PostRoutes);

mongoose.set("strictQuery", false);
connectDB();

app.get("/", (rep, res) => {
  res.send("insaid server");
});
const port = process.env.PORT || 5000;

app.listen(port, () => console.log("server is up and running  "));
