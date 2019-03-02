const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


//ADD Gallery model
require("../models/Image");
const Image = mongoose.model('images');

router.get("/", function(req, res){
    Image.find({})
        .then(images => {
            res.render('gallery', {
                images: images
            });
        });    
});

//form to add new images

router.get('/add', function(req, res){
    res.render("add")
});

router.get('/edit/:id', function (req, res){
    Image.findOne({
        _id: req.params.id
    })
    .then(images => {
        res.render('edit', {
            images: images
    });
  });
});

router.post('/edit/:id', function (req, res){
    Image.findOne({
        _id: req.params.id
    })
    .then(idea => {
        res.render('gallery', {
            Image: Image
        });
    });
});
   
router.post('/', function(req, res){
   const newImage = {
       image: req.file,
       title: req.body.title,
       style: req.body.style,
       date: req.body.date,
       inputDate: req.body.inputDate
   }
   new Image(newImage).save()
     .then(image => {
         console.log(newImage);
       res.redirect('/gallery');
   });
});
      module.exports = router;