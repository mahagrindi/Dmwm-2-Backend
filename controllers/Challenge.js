const ChallengeModels = require("../models/challenge");
const imgModel = require("../models/Image");
const fs = require("fs");
const path = require("path");

exports.ChallengeList = async (req, res) => {
  try {
    const challenge = await ChallengeModels.find({}).populate();
    res.send(challenge);
  } catch (err) {
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.getChallengeById = async (req, res) => {
  try {
    const challenge = await ChallengeModels.findById(req.body.id);
    console.log(req.body);

    res.send(challenge);
  } catch (err) {
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};


exports.winner = async (req, res) => {
  try {
    const challenge = await ChallengeModels.findById(req.body.id);
  challenge.winner = req.body.id_user ;
  console.log('====================================');
  console.log(challenge);
  console.log('====================================');
  challenge.save();
  res.status(200).json({message: "okkkk "});;
  } catch (err) {
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};
exports.CreatChallenge = async (req, res) => {
  var ImgList = [];
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
      ImgList1.push({idimg: res._id, imgName: element.filename});
    });
  }
  var challenge = new ChallengeModels({
    title: req.body.title,
    Category: req.body.Category,
    deadline: req.body.deadline,
    description: req.body.description,
    partenaire: req.body.partenaire,
    participants: [],
    winner: null,
    image: ImgList1,
  });
  await challenge.save().then(() => {
    res.status(200).json({message: "challenge added"});
  });
};

exports.SendChallenge = async (req, res) => {
  console.log(req.body);
  var ImgList = [];
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
      ImgList1.push({idimg: res._id, imgName: element.filename});
    });
  }
  console.log("====================================");
  console.log(req.body.Id_publiction);
  console.log("====================================");

  const chl = await ChallengeModels.findById(req.body.Id_publiction);
  console.log(chl);

  chl.participants.push({id_user: req.body.Id_user, img: ImgList1});
  await chl.save().then(() => {
    res.status(200).json({message: "okkkk "});
  });
};
