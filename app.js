//requires
const express = require('express');
const morgan = require('morgan');
const ejs = require('ejs');
const mongoose = require('mongoose');
const Work = require('./models/works');
const { result } = require('lodash');
const nodemailer = require('nodemailer');

const app = express();

//nodemailer setup
let transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: 'jnragbama@gmail.com',
      pass: 'Kate1973'
   }
});




//mongoose connection
const dbURI = 'mongodb+srv://agbamajnr:brainbox@learn-node.tv0ge.mongodb.net/portfolio?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
   .then((result) => app.listen(process.env.PORT || 5000))
   .catch((err) => console.log(err));
const cn = mongoose.connection;
cn.once('open', () => console.log('database connected'));


console.log('Portfolio server running, Listening for request');

//middlewares
app.set( 'view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded( { extended:true} ));



//routing and req(get, post, delete)


app.get('/' , (req , res)=>{

      res.redirect('/Agbama-Jnr');

});


app.get('/Agbama-Jnr' , (req , res)=>{

   Work.find()
      .then(result => {
         res.render('index', { works: result});
      }).catch(err => console.log(err));

});

app.post('/Agbama-Jnr' , (req , res)=>{

   const work = new Work(req.body);

   work.save()
    .then(result => {
       res.redirect('/admin');
    })
    .catch(err => console.log(err));


})
//contact form req

app.get('/Agbama-Jnr/contact' , (req , res)=>{

   res.render('contact');

})

app.post('/Agbama-Jnr/contact' , (req , res)=>{

   //fetch data
   const data = req.body;
   const name = data.name;
   const email= data.email;
   const sub = data.subject;
   const mes = data.message;

   //setup mail

   let mailOptions = {
      from: email,
      to: 'jnragbama@gmail.com',
      subject: 'Name:' + name + '/' + 'Email:'  +'' + email + '/' + 'Subject:' + sub,
      text: mes
   }

   //send mail
   const sendMail = transporter.sendMail(mailOptions, (err, data) => {
      if(err) {
         res.redirect('/Agbama-Jnr/contact')
      } else {
         res.redirect('/Agbama-Jnr');
      }
   })

})


//admin req
app.get('/admin' , (req , res)=>{

   Work.find()
      .then(result => {
         res.render('admin', { works: result});
      }).catch(err => console.log(err));

})
app.get('/admin/add-work', (req, res) => {
   res.render('addworks');
});



app.get('/admin/:id' , (req , res)=>{

   res.redirect('/admin');

})
app.delete('/admin/:id', (req, res) => {
   Work.findByIdAndDelete(req.params.id)
      .then(result => {
         res.json({ "redirect": "/admin"});
      })
});

app.get('/Agbama-Jnr/contact-me' , (req , res)=>{

   res.render('contact');

});

//fetch works

app.get('/works' , (req , res)=>{

   Work.find()
   .then(result => {
      res.render('works', { works: result});
   }).catch(err => console.log(err));
});


app.use((req, res) => {
    res.status(404).send('<h1>Page does not exist</h1>');
});