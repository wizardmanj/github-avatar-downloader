var token = require('./secrets');
var request = require('request');

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
      cb(err, body) 
        var parsedBody = JSON.parse(body);
        for (var url of parsedBody) {
            console.log(url['avatar_url']);
        }
    });
  }

 getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
  });