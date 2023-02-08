 
let mongoose = require ('mongoose');
const HashtagSchema = new mongoose.Schema ({
 
    
    tag_name  : {
        type:String,
        required:true
    } ,
    followers : {
        type : [String],
        required:true
    } 
  
})


const Hashtag = mongoose.model('Hashtag',HashtagSchema);
module.exports = Hashtag;
