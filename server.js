require("dotenv").config();
require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan"); //morgan--dev return in cmd api source
var helmet = require("helmet"); //cashe source request
var cors = require("cors");
const { default: mongoose } = require("mongoose");
const connectDB = require("./DataBase/BD");

var app = express();

const UserRoutes = require("./routes/users");

app.use(cors());
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use("/User", UserRoutes);

mongoose.set("strictQuery", false);
connectDB();

app.get("/", (rep, res) => {
  res.send("insaid server");
});
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
app.listen(process.env.PORT, () => {
  console.log("server run:3001");
});
