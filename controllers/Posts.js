const express = require("express");
const router = express.Router();
const Hashtag = require("../models/hashtag");

// *************************
// ********* tags ***********
// **************************

exports.GetTag = async (req, res) => {
  Hashtag.find({}, (err, tags) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving tags");
    } else {
      res.json(tags);
    }
  });
};

exports.AddTags = async (req, res) => {
     const {tagname} = req.body;
     try {
       if (!tagname) {
         return res.status(400).json({
           errorMessage: "Tag name is required",
         });
       }
       
       const tag = await Hashtag.findOne({tag_name: tagname});
       if (tag) {
         return res.status(200).json({
           SuccessMessage: "Tag already exists",
         });
       } else {
         const NewTag = new Hashtag();
   
         NewTag.tag_name = tagname;
   
         await NewTag.save();
         return res.status(200).json({
           SuccessMessage: "New tag added",
         });
       }
     } catch (err) {
       return res.status(500).json({
         errorMessage: "Please try again later" + err,
       });
     }
   };
   







   

const mongodb = require("mongodb");
const multer = require("multer");
// ****************************************************
// ********* uplode image / file to mongoDB ***********
// ****************************************************
const GridFSBucket = mongodb.GridFSBucket;
const fs = require("fs");
// Create storage engine
const storage = multer.memoryStorage();
const connectDB = require("../DataBase/BD");
const mongoose = require("mongoose");

const connection = mongoose.connection;
// Init upload
const upload = multer({
  storage: storage,
}).single("image");

// Initialize gfs when the connection to the database is open
exports.UplodeFile = async (req, res) => {
  const gfs = new GridFSBucket(connection.db, {
    bucketName: "images",
  });

  if (!req.file) {
    res.status(400).json({error: "File upload unsuccessfuls"});
    return;
  }

  const writestream = gfs.openUploadStreamWithId(
    req.file.originalname,
    req.file.id,
    {
      contentType: req.file.mimetype,
    }
  );

  writestream.on("error", (err) => {
    console.error(err);
    res.status(400).json({error: "File upload unsuccessfuli" + err});
  });

  writestream.on("finish", () => {
    console.log("Image uploaded successfully");
    res.json({id: req.file.id});
  });

  writestream.write(req.file.buffer);
  writestream.end();
};

// ****************************************************
// ********* get image / file to mongoDB  *************
// ****************************************************

exports.GetFile = async (req, res) => {
  const filename = req.params.filename;
  gfs.find({filename: filename}).toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        error: "No file found",
      });
    }
    const readstream = gfs.openDownloadStreamByName(filename);
    readstream.pipe(res);
  });
};
