var Contact=require('../models/contact');
var express=require('express');

//configure routes

var router=express.Router();

router.route('/contacts')
    .get(function(req,res){
       Contact.find(function(err,contacts){
           if(err)
                res.send(err);
           res.json(contacts);
       });
    })

    .post(function(req,res){
        var contact=new Contact(req.body);
        console.log(contact)
        contact.save(function(err){
            if(err)
                res.send(err);
            res.send({message:'Contact Request submitted'});
        });
    });

router.route('/contact/:id')
    .put(function(req,res){
        Contact.findOne({_id:req.params.id},function(err,contact){

            if(err)
                res.send(err);

           for(prop in req.body){
                contact[prop]=req.body[prop];
           }

            // save the contact request
            contact.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Request updated!' });
            });

        });
    })

    .get(function(req,res){
        Contact.findOne({_id:req.params.id},function(err, contact) {
            if(err)
                res.send(err);

            res.json(contact);
        });
    })

    .delete(function(req,res){
        Contact.remove({
            _id: req.params.id
        }, function(err, contact) {
            if (err)
                res.send(err);

            res.json({ message: 'Request Successfully deleted' });
        });
    });

module.exports=router;

