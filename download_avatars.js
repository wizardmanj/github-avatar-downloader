var token = require('./secrets');
var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization': token.GITHUB_TOKEN
      }
    };
  
    request(options, function(err, res, body) {
        var users = JSON.parse(body);
        for (var obj of users) {
            cb(obj["avatar_url"], `avatars/${obj.login}.jpg`);
        }
    });
  }

 getRepoContributors("jquery", "jquery", downloadImageByURL);

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

