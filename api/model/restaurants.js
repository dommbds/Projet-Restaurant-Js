const mongoose=require('mongoose');

var childGradeSchema=mongoose.Schema({
			
	date :Date,
	grade: String, 
	score: Number

});
 
const RestaurantsSchema=mongoose.Schema({
	 
    _id:mongoose.Schema.Types.ObjectId,
    address: 
		{
			building:String, 
			coord: [Number], 
			street: String, 
			zipcode: String
		},

	borough: String, 
	cuisine: String,
	grades: [childGradeSchema], 
	name: String, 
	restaurant_id: String, 
    plat:mongoose.Schema.Types.Mixed
});
 
module.exports=mongoose.model('Restaurants', RestaurantsSchema);
