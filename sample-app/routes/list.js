var List=require('../models/list');
var express=require('express');

//configure routes

var router=express.Router();

router.route('/lists')
    .get(function(req,res){
       List.find(function(err,lists){
           if(err)
                res.send(err);
           res.json(lists);
       });
    })

    .post(function(req,res){
        var list=new List(req.body);
        list.save(function(err){
            if(err)
                res.send(err);
            res.send({message:'Item submitted'});
        });
    });

router.route('/list/:id')
    .put(function(req,res){
        List.findOne({_id:req.params.id},function(err,list){

            if(err)
                res.send(err);

           for(prop in req.body){
                list[prop]=req.body[prop];
           }

            // save the request
            list.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Item updated!' });
            });

        });
    })

    .get(function(req,res){
        List.findOne({_id:req.params.id},function(err, list) {
            if(err)
                res.send(err);

            res.json(list);
        });
    })

    .delete(function(req,res){
        List.remove({
            _id: req.params.id
        }, function(err, list) {
            if (err)
                res.send(err);

            res.json({ message: 'Request Successfully deleted' });
        });
    });

module.exports=router;

