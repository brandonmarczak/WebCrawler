var express = require('express');
var request = require('request');
var cheerio = require('cheerio');

var fs      = require('fs');
var app     = express();

app.get('/', function(req, res){
  
  //The page that we will scrape
  var  url = 'https://caseblocks.com';
  console.log('URL: ' + url);
  
   // The request call structure with a call back function
  request(url, function(error, response, body){
    if(!error && response.statusCode == 200){
      console.log('Status code: ' + response.statusCode);
      // Applying the cheerio library for jQuery functionality. With this library we will start and pick our specific elements
      var $ = cheerio.load(body);
       // Defining the specific words that we want to capture
      var url, title, statusCode;
      // Once captured, we will store them in the json file
      var json = { url : "", title : "", statusCode : ""};
      // First, scraping the title
      $('title').filter(function(){
        title = $('title').text();
        console.log('Page title:  ' + title);
        console.log();
        //Storing our Title in the json object.
        json.title = title;
        
        // Struggled to find an approach to fetch and store the URL and status code in the json and csv files.
        
      });
    }
    
    // Save search results as an json
    fs.writeFile('result.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully stored! - Check your directory for result.json');
      console.log();
    });
    
    //Save file as a CSV 
    fs.writeFile('result.csv', title, 'utf8', function (err) {
      if(err) {
        console.log('Error occured');
      } else {
        console.log('File successfully stored! - Check your directory for result.csv');
      }
    });

    res.send('Look at the console!');
    
  });
});

//Listens for the server
var server = app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server has started at port: ' + server.address().port);
    console.log();
});

// ** Apply the code below for local server **

// app.listen(3000, function () {
//   console.log('Listening on port 3000!');
// });

exports = module.exports = app;
