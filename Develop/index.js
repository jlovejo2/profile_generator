const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const questions = [
  
];

init();

inquirer
  .prompt({
    message: "Enter your GitHub username:",
    name: "username"
  })
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function(res) {
        console.log(res);
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


//to get number of public repos use resp.data.length
//to get number of followers use 
