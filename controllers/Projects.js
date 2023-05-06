const projectModels = require("../models/project");
const Cookies = require("js-cookie");
const express = require("express");
const Hashtag = require("../models/hashtag");
const path = require("path");
const fs = require("fs");
var imgModel = require("../models/Image");
var publicationModel = require("../models/publication");
const axios = require("axios");
const csrftoken = Cookies.get("csrftoken");
axios.defaults.headers.common["X-CSRFToken"] = csrftoken;
const { ObjectId } = require("mongodb");


exports.PostProject = async (req, res) => {
  verification = true;

  let currentDate = Date.now();
  var hashtagList = [];
  if (req.body.hashtags) {
    // Convert hashtags to an array if it's not already an array
    const hashtags = Array.isArray(req.body.hashtags)
      ? req.body.hashtags
      : [req.body.hashtags];
    for (const tag of hashtags) {
      const existingTag = await Hashtag.findOne({ tag_name: tag });
      let tagId;
      if (!existingTag) {
        // If tag doesn't exist, create a new tag and save it to the database
        const newTag = new Hashtag();
        newTag.tag_name = tag;

        await newTag.save();
        tagId = newTag._id;
      } else {
        // If tag exists, get its ID
        tagId = existingTag._id;
      }
      // Add the ID to the list of hashtags for the post
      hashtagList.push(tagId);
    }
  }
  var ImgList = [];
  console.log(req.files.images);

  if (req.files.images) {
    for (var element of req.files.images) {
      var img = new imgModel({
        name: element.filename,
        img: {
          data: fs.readFileSync(
            path.join(
              path.dirname(require.main.filename),
              "uploads",
              element.filename
            )
          ),
          contentType: "image/png",
        },
      });
       
           
              ImgList.push(img);
           
    }
  }
  var ImgList1 = [];
   
    for (item of ImgList) {
      await item.save().then((res) => {
        ImgList1.push({ idimg: res._id, imgName: element.filename });
      });
    }
    var project = new projectModels({
      Id_user: req.body.Id_user,
      title: req.body.titre,
      date: currentDate,
      img: ImgList1,
      hashtag: hashtagList,
      catg: req.body.catg,
      tools: req.body.tools,
    });
    await project.save().then(() => {
      res.status(200).json({ message: "post added" });
    });
 
};



exports.deletProject = async (req, res) => {
  try {
    console.log("====================================");
    console.log(req.body.id);
    console.log("====================================");
    const deletedProject = await projectModels
      .findByIdAndRemove(req.body.id)
      .exec();
    if (deletedProject) {
      res
        .status(200)
        .json({
          message: "Project deleted successfully",
          project: deletedProject,
        });
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.GetProject = async (req , res ) => {
  try {
    const ProjectList = await projectModels.find({}).populate();
    res.send(ProjectList);
  } catch (err) {
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
}