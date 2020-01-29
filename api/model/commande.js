const mongoose=require('mongoose');

var childplatSchema=mongoose.Schema({
			
	        nom:String, 
			qty: Number, 
			prixUnitaire: Number, 
			totalprix: Number
});

 
const CommandeSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
	Total: Number,
	plat: [{type: mongoose.Schema.Types.ObjectId,ref:'Platcommande'}], 
	accompagnement:[{ type: mongoose.Schema.Types.ObjectId,ref:'Accompagnenement'}], 
	 
	client: { type: mongoose.Schema.Types.ObjectId,ref:'Client'},
	restaurant: { type: mongoose.Schema.Types.ObjectId,ref:'Restaurants'}
	 
});
 
module.exports=mongoose.model('Commande', CommandeSchema);
