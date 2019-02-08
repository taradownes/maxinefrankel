const express = require("express"),
	  bodyParser = require("body-parser"),
      nodemailer = require("nodemailer"),
      mongoose = require('mongoose'),
      exphbs = require('express-handlebars')
	  app = express();



//mongoose
mongoose.connect('mongodb://localhost:27017/maxineart', {
    useNewUrlParser: true
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

//ADD Gallery model


app.set("view engine", "handlebars");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname));

//Routes

app.get("/", function(req, res){
    res.render('index');
});

app.get("/main", function(req, res){
    res.render('main');
})

app.get("/gallery", function(req, res){
	res.render('gallery');
});

app.get('/gallery/add', function(req, res){
    res.render("add")
});

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




// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("server started");
// });

app.listen(2000, function(){
    console.log("server started");
});