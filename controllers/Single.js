const SingleModels = require("../models/Signle"); 

exports.SingleList = async (req, res) => {
  try {
    const Singles = await SingleModels.find({}).populate();
    res.send(Singles);
  } catch (err) {
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

 
exports.addSingle = async (req, res) => {

     var single = new SingleModels({
          Id_user: req.body.Id_user,
          text: req.body.text, 
        });
        await single.save().then(() => {
          res.status(200).json({message: "single added"});
        });
     
       
   };