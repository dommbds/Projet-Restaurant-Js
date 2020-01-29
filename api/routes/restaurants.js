const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const restaurants=require('../model/restaurants');

router.get('/',(req,res,next)=>{
    restaurants.find()
    .limit(5)
    .select('address borough name')
    .exec()
    .then(doc=>{
        console.log(doc)
         const reponse={
             count:doc.length,
             restaurants:doc.map(doc=>{
                return {
                    name:doc.name,
                    address:doc.address,
                    borough:doc.borough,
                    request:{
                        type:'GET',
                        url:'http://localhost:3000/restaurants/'+doc._id
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

        
});

router.get('/:restaurantsId',(req,res,next)=>{
    const id=req.params.restaurantsId;
    restaurants.findById(id)
    .exec()
    .then(doc=>{
        console.log(doc)
        if(doc){
            res.status(200).json({
                request:{
                    type:'GET',
                    description:'Get all restaurants',
                    url:'http://localhost:3000/restaurants'
                },
                restaurants:doc
                
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

router.patch('/:restaurantsId',(req,res,next)=>{
    const id=req.params.restaurantsId;
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;
    }
    restaurants.update({_id:id},
        {$set:updateOps})
    .exec()
    .then(result=>{
        res.status(200).json({
            request:{
                type:'GET',
                message:'restaurant updated',
                url:'http://localhost:3000/restaurants'+id
            },
            
        });
        
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.delete('/:restaurantsId',(req,res,next)=>{
   const id=req.params.restaurantsId;
    restaurants.remove({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'Product deleted',
            request:{
                type:'POST',
                url:'http://localhost:3000/restaurants'
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