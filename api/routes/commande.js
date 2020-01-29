const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Commande=require('../model/commande')

router.get('/',(req,res,next)=>{
    Commande.find()
    .exec()
    .then(doc=>{
        console.log(doc)
         const reponse={
             count:doc.length,
             commande:doc.map(doc=>{
                return {
                    name:doc.name,
                    address:doc.address,
                    borough:doc.borough,
                    request:{
                        type:'GET',
                        url:'http://localhost:3000/commande/'+doc._id
                    }

                }
             })
             
         };
       // if(doc.length>=0){
            res.status(200).json(reponse);
       // }else {
         //   res.status(404).json({
           //     message:'Not entries found'
            //});
       // }
       
    })
    .catch( err=>{
        console.log(err)
        res.status(500).json({error:err})

    });
});


router.post('/',(req,res,next)=>{

   
    const commande=new Commande({
    
    _id:new mongoose.Types.ObjectId(),
       
    plat:req.body.platId,
    accompagnement:req.body.accompagnementId, 
	Total: req.body.Total, 
	client: req.body.clientId,
	restaurant: req.body.restaurantId
        
    });
    commande.save().then(result=>{
        console.log(result);
    })
    .catch(err=>console.log(err));
    res.status(201).json({
        message:'commande created',
        createdcommande:commande
    });
});

router.get('/:commandeId',(req,res,next)=>{
    const id=req.params.commandeId;
    Commande.findById(id)
    .exec()
    .then(doc=>{
        console.log(doc)
        if(doc){
            res.status(200).json({
                request:{
                    type:'GET',
                    description:'Get all commande',
                    url:'http://localhost:3000/commande'
                },
                commande:doc
                
            })
            
        }else{
            res.status(404).json({message:"No valid id entry"});
        }
        })
    .catch( err=>{
        console.log(err)
        res.status(500).json({error:err})

    });
    
});

router.patch('/:commandeId',(req,res,next)=>{
    const id=req.params.commandeId;
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;
    }
    Commande.update({_id:id},
        {$set:updateOps})
    .exec()
    .then(result=>{
        res.status(200).json({
            request:{
                type:'GET',
                message:'commande updated',
                url:'http://localhost:3000/commande'+id
            },
            
        });
        
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.delete('/:commande',(req,res,next)=>{
   const id=req.params.commandeId;
   Commande.remove({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'commande deleted',
            request:{
                type:'POST',
                url:'http://localhost:3000/commande'
            }
        });
        
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

module.exports=router;