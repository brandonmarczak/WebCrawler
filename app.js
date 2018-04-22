var express = require('express');
var request = require('request');
var cheerio = require('cheerio');

var fs      = require('fs');
var app     = express();

app.get('/', function(req, res){
  
  var  url = 'https://caseblocks.com';
  console.log("URL: " + url);

  request(url, function(error, response, body){
    if(!error && response.statusCode == 200){
      
      console.log("Status code: " + response.statusCode);
      
      var $ = cheerio.load(body);
      var url, title, statusCode;
      var json = { url : "", title : "", statusCode : ""};
      
      // Scraping the title
      $('title').filter(function(){
        title = $('title').text();
        
        console.log("Page title:  " + title);

        json.title = title;
        
      });
      
    }
    
    // Save search results as an json
    fs.writeFile('result.json', JSON.stringify(json, null, 4), function(err){
      console.log();
      console.log('File successfully stored! - Check your project directory for the result.json file');
      console.log();
      
    });

    res.send('Look at the console!');
    
  });
});

var server = app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started at port: " + server.address().port);
    console.log();
});

exports = module.exports = app;
