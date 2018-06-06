// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", function(req, res){
  var date;
  var result = {};
  
  if(req.params.date_string == undefined){//if Empty
    date = new Date();
  } else if(isNaN(req.params.date_string)){ //if String
    date = new Date(req.params.date_string);
  } else {                                  //If Number
    date = new Date(Number(req.params.date_string));
  }
  
  if(isNaN(date.getTime())){ //if invalid
    result = {"unix": null, "utc" : "Invalid Date" };
  } else {
    result = {"unix": date.getTime(), "utc" : date.toUTCString() };
  }
  
  res.json(result);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

/** 9)  Get input from client - Route parameters */
//app.get('/:word/echo', function(req, res){
//  res.json({echo: req.params.word});
//});