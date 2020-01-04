//These are the variables that were created inorder to run the proper npm packagages used in the below code
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const convertToPdf = require("electron-html-to");

//This is a variable created in regards to the electron-html-to npm package.
const conversion = convertToPdf({
  converterPath: convertToPdf.converters.PDF,
  allowLocalFilesAccess: true
});

//This is the colors object that provides the possible color choices for the user and based on that choice
//delivers different colors to the proper CSS location in generateHTML
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

//This line calls the inquire npm
inquirer
  //This line of finds the prompt method in the inquirer npm and then establishes the questions to be prompted.
  //The users answers to the prompts are stored in the name key under the specified value.
  .prompt([
    {
      message: "What color would you like? (Options: " + Object.keys(colors) + ")",
      name: "color"
    },

    {
      message: "What is you github username?",
      name: "username"
    },

    {
      message: "What is you linkedIn public URL? (Optional)",
      name: "public_url"
    }

  ]).then(function (resp) {

    //This code taking the user responses to the first two prompts and setting them to let variables
    let color = resp.color;
    let username = resp.username;
  
    let linkedIn = " ";

    //This if statement is checking for if they do not enter a url.  If so the linkedIn url is set to "#".
    if (resp.public_url == "" ) {

      linkedIn = "#";
    //This line of code is checking the users link for a http:// or https://
    //If so the linkedIn variable is set equal to it.
    } else if (resp.public_url.includes("http://") || resp.public_url.includes("https://")) {
      linkedIn = resp.public_url;

    }
    //This code is assuming if http:// or https:// is not found then the user submitted a valid link just doesn't have the http:// in front.
    //So it adds it for the user.
    else {
      linkedIn = "https://" + resp.public_url;
    }

    //This uses the users enter github username to create a queryURL for axios
    const queryUrl = `https://api.github.com/users/${username}`;

    //This line of code performs the axios query to github and delivers the resp object
    axios.get(queryUrl).then(function (resp) {
      
      //This line of code
      conversion({ html: generateHTML(resp, color, linkedIn) }, function (err, result) {

        //this variable is to be passed into createWriteStream method to change it from default of write to append
        let optionsOne = { flags: 'a' };

        if (err) {
          return console.error(err);
        }

        //line of code is set-up to navigate through npm electron-html-to properly and deliver proper parameters to pipe() method
        result.stream.pipe(fs.createWriteStream('profile_' + resp.data.login + '.pdf'), optionsOne);
        //this code is necessary to ensure that an endless loop is not formed
        conversion.kill();
        console.log("Success! PDF created.")
      })

    });
  });

//This function was set-up as an initliazation function however it was not used in the creation of this product.
function init() {
};

//This function takes three input parameters.  
function generateHTML(object, userColor, linkedIn_url) {
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
          background-color: ${colors[userColor].wrapperBackground};
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
          background-color: ${colors[userColor].headerBackground};
          color: ${colors[userColor].headerColor};
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
          border: 6px solid ${colors[userColor].photoBorderColor};
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
          background-color: ${colors[userColor].headerBackground};
          color: ${colors[userColor].headerColor};
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
            <a href="https:maps.google.com/?q=${object.data.location}" role="button"><i class="nav-link fas fa-location-arrow"></i>Location</a>
            <a href=${object.data.html_url} role="button"><i class="nav-link fab fa-github"></i>Github</a>
            <a href="${linkedIn_url}" role="button"><i class="nav-link fab fa-linkedin"></i>Linkedin</a>
          </p>
        </div>
        <!-- </div> -->
        <!-- </div> -->
        <!-- </main> -->
        <main>
          <div class="container">
            <div class="row">
              <div class="col-lg-12 col-md-12 col-sm-12">
                <h4>${object.data.bio}</h4>
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
                    <h5 class="card-title">Public Gists</h5>
                    <p class="card-text">${object.data.public_gists}</p>
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


