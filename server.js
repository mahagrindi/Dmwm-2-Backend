require("dotenv").config();
require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan"); //morgan--dev return in cmd api source
var helmet = require("helmet"); //cashe source request
const { default: mongoose } = require("mongoose");
const connectDB = require("./DataBase/BD");

var app = express();

const UserRoutes = require("./routes/users");

const cors = require("cors");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/User", cors(), UserRoutes);

mongoose.set("strictQuery", false);
connectDB();

app.get("/", (rep, res) => {
  res.send("insaid server");
});
const port = process.env.PORT || 5000;

app.listen(port, () => console.log("server is up and running  "));
