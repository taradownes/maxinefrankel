const express = require("express"),
      exphbs = require('express-handlebars'),
      fs = require('fs'),
	  bodyParser = require("body-parser"),
      nodemailer = require("nodemailer"),
      mongoose = require('mongoose'),
      flash = require('connect-flash'),
      session = require('express-session'),
      passport = require('passport'),
      multer = require('multer'),
      upload = multer({ dest: 'uploads/' }),
      app = express();
     

//Load routes
const gallery = require('./routes/gallery');
const users = require('./routes/users');

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

app.use(multer({ dest: './uploads/'}).single('image'));

app.use(express.static(__dirname));

//Routes

app.get("/", function(req, res){
    res.render('index');
});


//Contact routes

app.get("/contact", function(req, res){
	res.render('contact');
});

app.post("/contact", function(req, res){
	
	const output = `
	<h1>You have a Message from Maxine Frankel Art</h1>
	<h3>Contact Details:</h3>
	<ul>
		<li>Name: ${req.body.name}</li>
		<li>Email: ${req.body.email}</li>
	</ul>
	<h3>Message from Sender:</h3>
	<p>${req.body.message}</p>

	`
	 // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'downeswebdesigns@gmail.com', // generated ethereal user
            pass: 'Superman_1' // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Website" <downeswebdesigns@gmail.com>', // sender address
        to: 'maxinefrankelart@gmail.com', // list of receivers
        subject: 'Message from Maxine Frankel Art', // Subject line
        text: '', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...  
   	res.render('contact')
    });
});



//Use routes

app.use('/gallery', gallery);
app.use('/users', users);


// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("server started");
// });

app.listen(2000, function(){
    console.log("server started");
});