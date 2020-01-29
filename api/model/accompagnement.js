const mongoose=require('mongoose');

const AccompagnementSchema=mongoose.Schema({
    
    _id:mongoose.Schema.Types.ObjectId,
    nom:String, 
    qty: Number, 
    prixUnitaire: Number, 
    totalprix: Number
});

module.exports=mongoose.model('Accompagnement', AccompagnementSchema);
