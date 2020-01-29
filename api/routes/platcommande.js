const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Platcommande=require('../model/platcommande');

router.get('/',(req,res,next)=>{
    Platcommande.find()
    .exec()
    .then(doc=>{
        console.log(doc)
         const reponse={
             count:doc.length,
             Platcommande:doc.map(doc=>{
                return {
                    nom:doc.nom, 
                    totalprix: doc.totalprix,
            
                    request:{
                        type:'GET',
                        url:'http://localhost:3000/platcommande/'+doc._id
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

    const platcommande=new Platcommande({
        
        _id:new mongoose.Types.ObjectId(),
        nom:req.body.nom, 
        qty: req.body.qty, 
        prixUnitaire:req.body.prixUnitaire, 
        totalprix: req.body.totalprix

        
    });
    platcommande.save().then(result=>{
        console.log(result);
    })
    .catch(err=>console.log(err));
    res.status(201).json({
        message:'platcommande created',
        createdplatcommande:platcommande
    });
});

router.get('/:platcommandeId',(req,res,next)=>{
    const id=req.params.platcommandeId;
    Platcommande.findById(id)
    .exec()
    .then(doc=>{
        console.log(doc)
        if(doc){
            res.status(200).json({
                request:{
                    type:'GET',
                    description:'Get all platcommande',
                    url:'http://localhost:3000/platcommande'
                },
                Platcommande:doc
                
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

router.patch('/:platcommandeId',(req,res,next)=>{
    const id=req.params.platcommandeId;
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;
    }
    Platcommande.update({_id:id},
        {$set:updateOps})
    .exec()
    .then(result=>{
        res.status(200).json({
            request:{
                type:'GET',
                message:'platcommande updated',
                url:'http://localhost:3000/platcommande'+id
            },
            
        });
        
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.delete('/:platcommande',(req,res,next)=>{
   const id=req.params.platcommandeId;
   Platcommande.remove({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'platcommande deleted',
            request:{
                type:'POST',
                url:'http://localhost:3000/platcommande'
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