var express = require('express');
const {google} = require('googleapis');
var request = require('request');

const app = express();

// Authorization Credentials
var client_id = "904539414721-kgijsoarp3goc3vjr4vas79cs2n49i30.apps.googleusercontent.com";
var client_secret = "SFD4myo2N8D9qaNgGDbGaqNX";
var redirect_uris = "http://localhost:3000";
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris);

function getNewToken(oAuth2Client, callback) {
    var SCOPES = ['https://www.googleapis.com/auth/contacts.readonly'];
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
}
app.get('/', (req, res) => res.send('Hello World!'))