//supporting module reqs 
var request = require('request');
var fs = require('fs');

//callback function
 function downloadImageByURL(url, filePath) {
    request.get(url)
        .on('error', function (err) {                                   
            throw err; 
        })
        .on('response', function (response) {                          
            console.log('Downloading image...');
            console.log('Response Status Code: ', response.statusCode);
            console.log('Response Status Message: ', response.statusMessage);
            console.log('Response Headers: ', response.headers['content-type']);
        })
        .on('end', function() {
            console.log('Download complete.')})
        .pipe(fs.createWriteStream(filePath));               
  }

  module.exports = downloadImageByURL;