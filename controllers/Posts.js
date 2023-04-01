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
  const options = { month: "2-digit", day: "2-digit", year: "numeric" };
  //  const currentDate = new Date().toLocaleString(options);
  let currentDate = Date.now();
  
  var hashtagList = [];
  if(req.body.hashtags){
   // Convert hashtags to an array if it's not already an array
   const hashtags = Array.isArray(req.body.hashtags) ? req.body.hashtags : [req.body.hashtags];
  
   for (const tag of hashtags) {
    const existingTag = await Hashtag.findOne({ tag_name: tag });
    let tagId;
  
    if (!existingTag) {
      // If tag doesn't exist, create a new tag and save it to the database
      const newTag = new Hashtag();
      newTag.tag_name = tag;
      newTag.copyrightChecked = req.body.copyrightChecked;
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
  
  console.log(hashtagList);
  console.log("1");

  var ImgList = [];
 if( req.files.images){
  for (var element of req.files.images) {
    let img = new imgModel({
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
    console.log("2");

    await img.save().then((res) => {
      console.log(res._id);
      ImgList.push(res._id);
      console.log(ImgList);
    });
  }}
  console.log("3");
  console.log(ImgList);
  var post = new publicationModel({
    Id_user: req.body.Id_user,
    text: req.body.text,
    date: currentDate,

    img: ImgList,
    hashtag: hashtagList ,
  });

  
  post.save().then((result) => {
  res.status(200).json({ message: "post added" });
});

};
exports.getAllImages = async (req, res) => {
  const page = req.query.page || 1;

  try {
    const images = await imgModel.find().skip(page - 1);
    for (const image of images) {
      res.send(image.img.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.getAllImages_v2 = async (req, res) => {
  try {
    const images = await imgModel.find();

    res.send(images);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

/* exports.getAllImages = async (req, res) => {
  
  try {
    const images = await imgModel.find();
    res.setHeader("Content-Type", "image/jpeg");
    for (const image of images) {
      const img = `<img src="data:${image.contentType};base64,${image.data}" />`;

      res.write(img);
    }
   
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
}; */

/* exports.getAllImages = async (req, res) => {
  try {
    const images = await imgModel.find();
   
      const imageList = images.map(image => ({
      id: image._id,
      name: image.name,
      contentType: image.img.contentType,
      data: image.img.data ,
    }));
    res.send(imageList);

  
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};
 */

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
  const { tagname } = req.body;
  console.log(req.body);
  const { tagn } = req.params;
  // Add this line to log the request body
  try {
    if (!tagn) {
      return res.status(400).json({
        errorMessage: "Tag name is required",
      });
    }

    // Check if tag already exists
    const existingTag = await Hashtag.findOne({ tag_name: tagn });
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
