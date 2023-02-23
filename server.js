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

//app.use(cors());

// app.options("*", cors());

/*app.use((req, res, next) => {
    // Allow cross-origin resource sharing (CORS)
    //res.setHeader("Access-Control-Allow-Origin", "*");
    //res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    //res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );

    // Handle preflight requests
    if (req.method === "OPTIONS") {
        res.sendStatus(201);
    } else {
        next();
    }
});*/

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("server is up and running  "));