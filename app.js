const express = require("express"),
      exphbs = require('express-handlebars'),
    //   fs = require('fs'),
      path = require('path'),
	  bodyParser = require("body-parser"),
      nodemailer = require("nodemailer"),
      mongoose = require('mongoose'),
      flash = require('connect-flash'),
      session = require('express-session'),
      passport = require('passport'),
      methodOverride = require('method-override'),
    //   multer = require('multer'),
    //   upload = multer({ dest: 'uploads/' }),
      app = express();
     

//Load routes
const gallery = require('./routes/gallery');
const users = require('./routes/users');
const contact = require('./routes/contact');

//Passport Config
require('./config/passport')(passport);


//Connect to mongoose
mongoose.connect('mongodb://localhost:27017/maxineart', {
    useNewUrlParser: true
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));


// Handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set("view engine", "handlebars");


//Express session middleware
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized: true
}));


//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash middleware
app.use(flash());

//Global variables
app.use(function(req, res, next){
    res.locals.user = req.user || null;
    next();
})


//Bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Method override middleware
app.use(methodOverride('_method'));

// app.use(multer({ dest: './uploads/'}).single('image'));

app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, 'public')));



//Routes

app.get("/", function(req, res){
    res.render('index');
});

//Use routes

app.use('/gallery', gallery);
app.use('/users', users);
app.use('/contact', contact);


// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("server started");
// });

app.listen(2000, function(){
    console.log("server started");
});