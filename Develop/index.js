const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const questions = [

];

init();

inquirer
    .prompt([

        {
            message: "Enter your GitHub username:",
            name: "username"
        },

        {
            message: "What is your favorite color?",
            name: "background-color"
        }
    ])
    .then(function (resp) {
        const queryUrl = `https://api.github.com/users/${resp.username}`;

        axios.get(queryUrl).then(function (res) {
            console.log(res.data.public_repos);
            console.log(res.data.followers);
            console.log(res.data.following);
            //   const repoNames = res.data.map(function(repo) {
            //     return repo.name;
        });

        //   const repoNamesStr = repoNames.join("\n");

        //   fs.writeFile("repos.txt", repoNamesStr, function(err) {
        //     if (err) {
        //       throw err;
        //     }

        //     console.log(`Saved ${repoNames.length} repos`);
        //   });
    });


function writeToFile(fileName, data) {
}

function init() {
}


//to get number of public repos use resp.data.public_repos
//to get number of followers use resp.data.followers
//to get number of users following resp.data.following
//to get number of github stars resp.data
