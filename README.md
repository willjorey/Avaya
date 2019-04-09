## Installation

Change directory to website and install the packages
`cd webstite`
`npm install`

Change directory to backend and install tha packages
`cd backend`
`npm install`

Run the server
`nodemon server`

## Authorization

User is prompted to visit a link to authorize the use of the app

`Authorize this app by visiting this url: https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.google.com%2Fm8%2Ffeeds%2F&response_type=code&client_id=904539414721-kgijsoarp3goc3vjr4vas79cs2n49i30.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauthcallback`

Visit the site choose a google account and allow permissions. User is then redirected to another page, look at the url and copy the code embedded in it

`http://localhost:3000/oauthcallback?code=4/JwFyca5o4BfVUvGwcFzvHhyjtsUn1BbuP-VHOsTVaIgBG9ya1sMh6VxNqEOoP8Z_aysrGXIuNeKaHagHgZkdrr8&scope=https://www.googleapis.com/auth/contacts`

copy this part of the url after `code=` ....  upto here `&scope=https://www.googleapis.com/auth/contacts` so your code should be 
`4/JwFyca5o4BfVUvGwcFzvHhyjtsUn1BbuP-VHOsTVaIgBG9ya1sMh6VxNqEOoP8Z_aysrGXIuNeKaHagHgZkdrr8`

You will be prompted to paste this code into the terminal to get a token.

In a new terminal change directory to `website` and run it

`npm start`

## Website

With the server and the web application running now, the user can see their contacts by clicking on "Get Connections". A table will appear and show all of the users contacts, which can be sorted by clicking on the headers. Users can then click on a person in the table to view the information and or delete the person from their contacts. In the navigation bar users can visit the "Create Contact" tab to create a new contact.