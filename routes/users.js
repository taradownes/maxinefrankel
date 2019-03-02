const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

//Models
require('../models/Users');
const User = mongoose.model('users');

//USER login Routes
router.get('/login', function(req, res){
    res.render('users/login');
});

//User Register routes

router.get('/register', function(req, res){
    res.render('users/register');
});

//Login from post
router.post('/login', function(req, res, next){
    passport.authenticate('local', {
        successRedirect: '/gallery',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//Register from Post

router.post('/register', function(req, res){
   let errors = [];

   if(req.body.password != req.body.password2){
       errors.push({text: 'Passwords do not match'});
   }
   if(req.body.password <= 5){
       errors.push({text: "Password must be longer than 5 characters"});
   }
   if(errors.length > 0){
       res.render('users/register', {
           errors: errors,
           name: req.body.name,
           email: req.body.email,
           password: req.body.password,
           password2: req.body.password2
       });
   } else{
       User.findOne({email: req.body.email})
        .then(user => {
            if(user){
                res.redirect('/users/register')
            } else{
                const newUser = new User ({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt) => {
                 bcrypt.hash(newUser.password, salt, (err, hash) => {
                     if(err) throw err;
                     newUser.password = hash;
                     newUser.save()
                         .then(user => {
                             res.redirect('/users/login');
                         })
                         .catch(err => {
                             console.log(err);
                             return;
                         });
                 });            
               });
            }
        });           
    }
  
});
      
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/login');
});


module.exports = router;