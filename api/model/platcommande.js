const mongoose=require('mongoose');

const PlatcommandeSchema=mongoose.Schema({
    
    _id:mongoose.Schema.Types.ObjectId,
    nom:String, 
    qty: Number, 
    prixUnitaire: Number, 
    totalprix: Number
});

module.exports=mongoose.model('Platcommande', PlatcommandeSchema);
