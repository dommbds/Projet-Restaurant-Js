const mongoose=require('mongoose');
 
const ClientSchema=mongoose.Schema({

    _id:mongoose.Schema.Types.ObjectId,
	name: String, 
	borough: String, 
	address: 
		{
			building:String, 
		    street: String, 
			zipcode: String
        },
     commande:[{type:mongoose.Schema.Types.ObjectId,ref:'commande'}]
});
 
module.exports=mongoose.model('Client', ClientSchema);
