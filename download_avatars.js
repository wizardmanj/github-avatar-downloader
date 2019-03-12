//supporting module reqs 
var token = require('./secrets');
var request = require('request');
var fs = require('fs');
var downloadImageByURL = require('./imgDownloader')

//command line inputs
var repoOwner = process.argv[2]; 
var repoName = process.argv[3];

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

 getRepoContributors(repoOwner, repoName, downloadImageByURL);