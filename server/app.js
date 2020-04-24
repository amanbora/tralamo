var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const EMAIL = require('email-templates');

var app = express();
var placesList = require('./storage/places.json');
var emailList = require('./storage/email.json');
const FROM = 'bora.amanalambora@gmail.com'

var sendEmail = function(templateNo, to){
  const email = new EMAIL({
    message: {
      from: FROM
    },
    // uncomment below to send emails in development/test env:
    send: true,
    transport: {
      jsonTransport: true
    }
  });

  email
    .send({
      template: 'template'+templateNo,
      message: {
        to: to
      },
      locals: {
        name: 'All'
      }
    })
    .then(console.log)
    .catch(console.error);
}

app.use(cors());
app.use(bodyParser.json());

app.get('/getPlacesList',(req,res)=>{
  res.send(placesList);
  console.log(placesList);
})

app.get('/getEmailList',(req,res)=>{
  res.send(emailList);
  console.log(emailList);
})

app.post('/sendEmail',(req,res)=>{
  console.log(req.body);
  sendEmail(req.body.template, req.body.to);
})

app.listen(8080);
console.log('Listening at PORT:8080');
