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
          state : true ,
        });
        await single.save().then(() => {
          res.status(200).json({message: "single added"});
        });
     
       
   };

   exports.UpdateSingle = async (req , res )=> {
    const sing = await SingleModels.findById(req.body.id);
    sing.state = false ;
    await sing.save().then(()=>{
      res.status(200).json({message: "single updated"});
    })
   }

   exports.SinglePublication = async (req , res )=> {
    var single = new SingleModels({
      Id_user: req.body.iduser,
      text: req.body.text, 
      publiction_id : req.body.id ,
      state : true ,
    });
    await single.save().then(() => {
      res.status(200).json({message: "single added"});
    });
   }