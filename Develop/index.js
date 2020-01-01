const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const questions = [
];

const colors = {
    green: {
        wrapperBackground: "#E6E1C3",
        headerBackground: "#C1C72C",
        headerColor: "black",
        photoBorderColor: "#black"
    },
    blue: {
        wrapperBackground: "#5F64D3",
        headerBackground: "#26175A",
        headerColor: "white",
        photoBorderColor: "#73448C"
    },
    pink: {
        wrapperBackground: "#879CDF",
        headerBackground: "#FF8374",
        headerColor: "white",
        photoBorderColor: "#FEE24C"
    },
    red: {
        wrapperBackground: "#DE9967",
        headerBackground: "#870603",
        headerColor: "white",
        photoBorderColor: "white"
    }
};

init();

inquirer
    .prompt([
        {
            message: "What is your favorite color?",
            name: "color"
        },

        {
            message: "What is you github username?",
            name: "username"
        }

    ]).then(function (resp) {

        let color = resp.color;
        let username = resp.username;
        const queryUrl = `https://api.github.com/users/${username}`;

        axios.get(queryUrl).then(function (resp) {
            console.log(resp.data.public_repos);
            console.log(resp.data.followers);
            console.log(resp.data.following);

            fs.appendFile("index.html", generateHTML(resp, color),
            function(err) {
                if (err) {
                    return console.log(err)
                } 
                console.log("success!")
            });
        });
    });


function writeToFile(fileName, data) {

}

function init() {
    

};

//to get number of public repos use resp.data.public_repos
//to get number of followers use resp.data.followers
//to get number of users following resp.data.following
//to get number of github stars resp.data
//to get image of resp.data.avatar_url

function generateHTML(object, color) {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" />
      <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
      <title>Profile Generator</title>
      <style>
        @page {
          margin: 0;
        }
    
        *,
        *::after,
        *::before {
          box-sizing: border-box;
        }
    
        html,
        body {
          padding: 0;
          margin: 0;
        }
    
        html,
        body,
        .wrapper {
          height: 100%;
        }
    
        .wrapper {
          background-color: #879CDF;
          /* ${colors[color].wrapperBackground}; */
          padding-top: 100px;
        }
    
        body {
          background-color: white;
          -webkit-print-color-adjust: exact !important;
          font-family: 'Cabin', sans-serif;
        }
    
        main {
          background-color: #E9EDEE;
          height: auto;
          padding-top: 30px;
        }
    
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: 'BioRhyme', serif;
          margin: 10px;
          text-align: center;
        }
    
        h1 {
          font-size: 3em;
        }
    
        h2 {
          font-size: 2.5em;
        }
    
        h3 {
          font-size: 2em;
        }
    
        h4 {
          font-size: 1.5em;
        }
    
        h5 {
          font-size: 1.3em;
        }
    
        h6 {
          font-size: 1.2em;
        }
    
        .photo-header {
          position: relative;
          margin: 0 auto;
          margin-bottom: -50px;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          background-color: #FF8374;
          /* ${colors[color].headerBackground}; */
          color: white;
          /* ${colors[color].headerColor}; */
          padding: 10px;
          width: 95%;
          border-radius: 6px;
        }
    
        .photo-header img {
          width: 250px;
          height: 250px;
          border-radius: 50%;
          object-fit: cover;
          margin-top: -75px;
          border: 6px solid #FEE24C;
          /* ${colors[color].photoBorderColor}; */
          box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
        }
    
        .photo-header h1,
        .photo-header h2 {
          width: 100%;
          text-align: center;
        }
    
        .photo-header h1 {
          margin-top: 10px;
        }
    
        .links-nav {
          width: 100%;
          text-align: center;
          padding: 20px 0;
          font-size: 1.1em;
        }
    
        .nav-link {
          display: inline-block;
          margin: 5px 10px;
        }
    
        .workExp-date {
          font-style: italic;
          font-size: .7em;
          text-align: right;
          margin-top: 10px;
        }
    
        .container {
          /* padding: 50px; */
          /* padding-left: 50px; */
          /* padding-right: 50px; */
          width: 100%;
        }
    
        .row {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-top: 20px;
          margin-bottom: 20px;
        }
    
        .card {
          padding: 20px;
          border-radius: 6px;
          background-color: ${colors[color].headerBackground};
          color: ${colors[color].headerColor};
          margin: 20px;
        }
    
        .col {
          flex: 1;
          text-align: center;
        }
    
        a,
        a:hover {
          text-decoration: none;
          color: inherit;
          font-weight: bold;
        }
    
        @media print {
          body {
            zoom: .75;
          }
        }
      </style>
    </head>
    
    <body>
      <div class="wrapper">
        <!-- <main> -->
        <!-- <div class="card"> -->
        <!-- <div class="card-body"> -->
        <div class="photo-header">
          <img src=${object.data.avatar_url} alt="my picture"></img>
          <!-- <div class=""> -->
          <h2> Hello, world!</h2>
          <h2> My name is ${object.data.name}</h2>
          <!-- </div> -->
          <h6 class="">Currently at ${object.data.company}</h6>
          <p class="links-nav lead">
            <a href="#" role="button"><i class="nav-link fas fa-location-arrow"></i>Location</a>
            <a href=${object.data.url} role="button"><i class="nav-link fab fa-github"></i>Github</a>
            <a href="#" role="button"><i class="nav-link fab fa-linkedin"></i>Linkedin</a>
          </p>
        </div>
        <!-- </div> -->
        <!-- </div> -->
        <!-- </main> -->
        <main>
          <div class="container">
            <div class="row">
              <div class="col-lg-12 col-md-12 col-sm-12">
                <h4>I build things and teach people to code</h2>
              </div>
              <div class="col col-lg-5 col-md-5 col-sm-6 col-xs-6">
                <div class="card" style="width: 18rem;">
                  <!-- <div class="card-body"> -->
                    <h5 class="card-title">Public Repositories</h5>
                    <p class="card-text">${object.data.public_repos}</p>
                  <!-- </div> -->
                </div>
              </div>
              <div class="col col-lg-5 col-md-5 col-sm-6 col-xs-6">
                <div class="card" style="width: 18rem;">
                  <!-- <div class="card-body"> -->
                    <h5 class="card-title">Followers</h5>
                    <p class="card-text">${object.data.followers}</p>
                  <!-- </div> -->
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col col-lg-5 col-md-5 col-sm-6 col-xs-6">
                <div class="card" style="width: 18rem;">
                  <div class="card-body">
                    <h5 class="card-title">GitHub Stars</h5>
                    <p class="card-text">???????????</p>
                  </div>
                </div>
              </div>
              <div class="col col-lg-5 col-md-5 col-sm-6 col-xs-6">
                <div class="card" style="width: 18rem;">
                  <div class="card-body">
                    <h5 class="card-title">Following</h5>
                    <p class="card-text">${object.data.following}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </body>
    
    </html>`

}
