var express = require('express');
const {google} = require('googleapis');
const fs = require('fs');
const readline = require('readline');
const bodyParser = require("body-parser");
var cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const TOKEN_PATH = 'token.json';
var SCOPES = ['https://www.google.com/m8/feeds/'];
var oAuth2Client;


// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Tasks API.
  authorize(JSON.parse(content), callback);
});

callback = ()=>{
  console.log("Authorization Complete")
}

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.web;
  oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function getPeople(auth, id) {
  return new Promise((resolve, reject)=>{
    const service = google.people({version: 'v1', auth});
    service.people.get({
      resourceName: 'people/'+ id,
      personFields: 'names,birthdays,genders',
    }, (err, res) => {
      if (err) return console.error('The API returned an error: ' + err);
      const person = res.data;
      if (person) {
        resolve(person);
      } else {
        console.log('No connections found.');
      }
    });
  })
};

function listConnectionNames(auth) {
  return new Promise((resolve, reject)=>{
    const service = google.people({version: 'v1', auth});
    service.people.connections.list({
      resourceName: 'people/me',
      pageSize: 10,
      personFields: 'names,birthdays,genders',
    }, (err, res) => {
      if (err) return console.error('The API returned an error: ' + err);
      const connections = res.data.connections;
      if (connections) {
        resolve(connections);
      } else {
        console.log('No connections found.');
      }
    });
  })
};

function createPerson(auth, person) {
  var year = person.year;
  var month = person.month;
  var day = person.day;
  var gender = person.gender;
  var fname = person.fname;
  var lname = person.lname;

  return new Promise((resolve, reject)=>{
    const service = google.people({version: 'v1', auth});
    service.people.createContact({
        requestBody:{
          birthdays:[{date:{year: year, month: month, day:day}, text:month+'/'+day+'/'+year}],
          names:[{
            displayName: fname + ' ' + lname,
            familyName:lname,
            givenName:fname
          }],
          genders:[{value:gender}],
        }
    }, (err, res) => {
      if (err) return console.error('The API returned an error: ' + err);
      return "Contact Created";
    });
  })
};

function deletePerson(auth, id) {
  return new Promise((resolve, reject)=>{
    const service = google.people({version: 'v1', auth});
    service.people.deleteContact({
      resourceName: 'people/'+ id,
    }, (err, res) => {
      if (err) return console.error('The API returned an error: ' + err);
      return "Contact Deleted"
    });
  })
};

// ROUTES
app.get('/connections', (req, res) => {
  listConnectionNames(oAuth2Client,res).then(data => {
    res.status(201).json({
      message: "Handling GET requests to /connections",
      'connections': data,
    });
  })
});

app.get('/people/:id', (req, res) => {
  var id = req.params.id
  getPeople(oAuth2Client, id).then(data =>{
    res.status(201).json({
      message: "Handling GET requests to /people",
      'person': data,
    });
  })
});

app.post('/create', (req, res) => {
  console.log('REQUEST RECEIVED', req.body)
  createPerson(oAuth2Client, req.body).then( msg => {
    if(msg === "Contact Created" ){
      res.status(201).json({
        message: "Handling POST requests to /people",
        'msg': msg,
        'person': req.body
      });
    }
  });
});

app.delete('/delete/:id', (req, res) => {
  var id = req.params.id;
  console.log('REQUEST RECIEVED', id);
  deletePerson(oAuth2Client,id).then(msg =>{
    if(msg === "Contact Deleted" ){
      res.status(201).json({
        message: "Handling DELETE requests to /people",
        'msg': msg,
        'resourceName': id
      });
    }
  })
});

module.exports = app;
