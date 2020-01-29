const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Client=require('../model/client')

router.get('/',(req,res,next)=>{
    Client.find()
    .exec()
    .then(doc=>{
        console.log(doc)
         const reponse={
             count:doc.length,
             client:doc.map(doc=>{
                return {
                    name:doc.name,
                    address:doc.address,
                    borough:doc.borough,
                    request:{
                        type:'GET',
                        url:'http://localhost:3000/client/'+doc._id
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

    const client=new Client({
     
        _id:new mongoose.Types.ObjectId(),
        name: req.body.name, 
        borough:req.body.borough, 
        address:{
           
            building :req.body.address['building'],
            street:req.body.address['street'],
            zipcode:req.body.address['zipcode'],
        },
        commande:[req.body.commandeId]
        
    });
    client.save().then(result=>{
        console.log(result);
    })
    .catch(err=>console.log(err));
    res.status(201).json({
        message:'client created',
        createdClient:client
    });
});

router.get('/:clientId',(req,res,next)=>{
    const id=req.params.clientId;
    Client.findById(id)
    .exec()
    .then(doc=>{
        console.log(doc)
        if(doc){
            res.status(200).json({
                request:{
                    type:'GET',
                    description:'Get all client',
                    url:'http://localhost:3000/client'
                },
                client:doc
                
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

router.patch('/:clientId',(req,res,next)=>{
    const id=req.params.clientId;
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;
    }
    Client.update({_id:id},
        {$set:updateOps})
    .exec()
    .then(result=>{
        res.status(200).json({
            request:{
                type:'GET',
                message:'client updated',
                url:'http://localhost:3000/client'+id
            },
            
        });
        
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.delete('/:client',(req,res,next)=>{
   const id=req.params.clientId;
   Client.remove({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'client deleted',
            request:{
                type:'POST',
                url:'http://localhost:3000/client'
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