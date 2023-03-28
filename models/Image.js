
// Step 3 - this is the code for ./models.js

var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
	name: String,
	//desc: String,
	img:
	{
		data: Buffer,
		contentType: String
	}
	
});

imageSchema.pre("save", function(next) {
	next();
 });
//Image is a model which has a schema imageSchema

const Image = mongoose.model('Image',imageSchema);
module.exports = Image;