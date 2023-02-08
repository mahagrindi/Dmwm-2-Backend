 
let mongoose = require ('mongoose');
const PublicationSchema = new mongoose.Schema ({
 
    id_user :{
        type : String ,
        required : true 
    },
    text  : {
        type:String,
        required:true
    },
    date  : {
        type:Date,
        required:true
    },
  
    images : {
        type : [String],
        required:true
    },
    reaction : {
        type : [Object],
        required:true
    }, 
    commentaires : {
        type : [Object],
        required:true
    },
    republier : {
        type : [Object],
        required:true
    },
    hashtag : {
        type : [Object],
        required:true
    },
    
  
})


const Publication = mongoose.model('Publication',PublicationSchema);
module.exports = Publication;
