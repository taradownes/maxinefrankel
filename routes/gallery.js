const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//ADD Gallery model
require("../models/Image");
const Image = mongoose.model('images');

router.get("/", function(req, res){
    Image.find({})
        .then(images => {
            res.render('gallery', {
                images:images
            });
        });    
     });



//form to add new images

router.get('/add', function(req, res){
    res.render("add")
});

router.post('/', function(req, res){
    const newImage = {
        image: req.body.image,
        title: req.body.title,
        style: req.body.style,
        date: req.body.date,
    }
    new Image(newImage).save()
      .then(image => {
          console.log(newImage);
        res.redirect('/gallery');
    });
 });

 //EDIT
router.get('/edit/:id', function (req, res){
    Image.findOne({
        _id: req.params.id
    })
    .then(image => {
        res.render('edit', {
            image:image
    })
  });
});

router.put('/:id', function (req, res){
    Image.findOne({
        _id: req.params.id
    })
    .then(image => {
            image.image = req.body.image;
            image.title = req.body.title;
            image.style = req.body.style;
            image.date = req.body.date;

            image.save()
                .then(image => {
                    res.redirect('/gallery');
        })
    });
});

//DELETE
router.delete('/:id', function(req, res) {
    Image.deleteOne({_id: req.params.id})
    .then(() => {
        res.redirect('/gallery');
    });
});
   

      module.exports = router;