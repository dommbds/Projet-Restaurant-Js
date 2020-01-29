const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Accompagnement=require('../model/accompagnement')

router.get('/',(req,res,next)=>{
    Accompagnement.find()
    .exec()
    .then(doc=>{
        console.log(doc)
         const reponse={
             count:doc.length,
             accompagnement:doc.map(doc=>{
                return {
                    
                    nom:doc.nom, 
                    totalprix: doc.totalprix,
            
                    request:{
                        type:'GET',
                        url:'http://localhost:3000/accompagnement/'+doc._id
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

    const accompagnement=new Accompagnement({
        
        _id:new mongoose.Types.ObjectId(),
        nom:req.body.nom, 
        qty: req.body.qty, 
        prixUnitaire:req.body.prixUnitaire, 
        totalprix: req.body.totalprix

        
    });
    accompagnement.save().then(result=>{
        console.log(result);
    })
    .catch(err=>console.log(err));
    res.status(201).json({
        message:'accompagnement created',
        createdaccompagnement:accompagnement
    });
});

router.get('/:accompagnementId',(req,res,next)=>{
    const id=req.params.accompagnementId;
    Accompagnement.findById(id)
    .exec()
    .then(doc=>{
        console.log(doc)
        if(doc){
            res.status(200).json({
                request:{
                    type:'GET',
                    description:'Get all accompagnement',
                    url:'http://localhost:3000/accompagnement'
                },
                accompagnement:doc
                
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

router.patch('/:accompagnementId',(req,res,next)=>{
    const id=req.params.accompagnementId;
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;
    }
    Accompagnement.update({_id:id},
        {$set:updateOps})
    .exec()
    .then(result=>{
        res.status(200).json({
            request:{
                type:'GET',
                message:'accompagnement updated',
                url:'http://localhost:3000/accompagnement'+id
            },
            
        });
        
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.delete('/:accompagnement',(req,res,next)=>{
   const id=req.params.accompagnementId;
   Accompagnement.remove({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'accompagnement deleted',
            request:{
                type:'POST',
                url:'http://localhost:3000/accompagnement'
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