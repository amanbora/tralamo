var express = require('express');
var cors = require('cors');


var app = express();
var placesList = require('./storage/places.json');

app.use(cors());

app.get('/getPlacesList',(req,res)=>{
  res.send(placesList);
  console.log(placesList);
})


app.listen(8080);
console.log('Listening at PORT:8080');
