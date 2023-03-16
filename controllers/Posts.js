const express = require("express");
const router = express.Router();
const Hashtag = require("../models/hashtag");
const path = require("path");
const fs = require("fs");
var imgModel = require("../models/Image");
var publicationModel = require("../models/publication");

// Step 7 - the GET request handler that provides the HTML UI

exports.getPublication = async (req, res) => {
  try {
    const items = await publicationModel.find({});
    res.status(200).send(items);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred", err);
  }
};

exports.PostPublication = async (req, res) => {
  console.log(req.files.image[0]);
  const options = {month: "2-digit", day: "2-digit", year: "numeric"};
  const currentDate = new Date().toLocaleString(options);
  for (const tag of req.body.tag) {
    const existingTag = await Hashtag.findOne({tag_name: tag});
    if (!existingTag) {
      // If tag doesn't exist, create a new tag and save it to the database
      const newTag = new Hashtag();
      newTag.tag_name = tag;
      await newTag.save();
    }
  }
  
  var obj = {
    Id_user: req.body.Id_user,
    text: req.body.text,
    date: currentDate,

    img: {
      data: fs.readFileSync(
        path.join(
          path.dirname(require.main.filename),
          "uploads",
          req.files.image[0].filename
        )
      ),
      contentType: "image/png",
    },
    hashtag :  req.body.tag   ,
  };
  publicationModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
      res.status(500).send("not ok " + err);
    } else {
      // item.save();
      res.status(200).send("ok");
    }
  });
};

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
  // Extract the tag name from the request b
  const {tagname} = req.body;
  console.log(req.body);
  const {tagn} = req.params;
  // Add this line to log the request body
  try {
    if (!tagn) {
      return res.status(400).json({
        errorMessage: "Tag name is required",
      });
    }

    // Check if tag already exists
    const existingTag = await Hashtag.findOne({tag_name: tagn});
    if (existingTag) {
      // If tag already exists, return a success response
      return res.status(200).json({
        SuccessMessage: "Tag already exists",
      });
    } else {
      // If tag doesn't exist, create a new tag and save it to the database
      const newTag = new Hashtag();
      newTag.tag_name = tagn;
      await newTag.save();
      // Return a success response
      return res.status(200).json({
        SuccessMessage: "New tag added",
      });
    }
  } catch (err) {
    // If there was an error, return an error response
    return res.status(500).json({
      errorMessage: "Please try again later" + err,
    });
  }
};